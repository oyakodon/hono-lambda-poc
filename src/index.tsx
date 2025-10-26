import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'
import { handle } from 'hono/aws-lambda'
import { requestId } from 'hono/request-id'
import { renderToString } from 'react-dom/server'
import { log } from './lib/logger'

const app = new Hono()

// Request ID middleware - generates or reads X-Request-Id header
app.use('*', requestId())

// AWS環境ではSTAGE環境変数からベースパスを設定、ローカル開発では設定しない
const stage = process.env.STAGE

// Request logging middleware
app.use('*', async (c, next) => {
  const start = Date.now()
  const { method, path } = c.req
  const requestId = c.get('requestId')

  await next()

  const duration = Date.now() - start
  const status = c.res.status

  // 本番環境(AWS)のみ Client IP を含める
  const logData: Record<string, unknown> = {
    requestId,
    method,
    path,
    status,
    duration
  }

  if (import.meta.env.PROD) {
    // API Gatewayの場合は X-Forwarded-For から取得
    logData.clientIp =
      c.req.header('x-forwarded-for')?.split(',')[0].trim() ||
      c.req.header('x-real-ip') ||
      'unknown'
  }

  log.info('Request completed', logData)
})

// Serve static files from dist directory (production only)
if (import.meta.env.PROD) {
  app.use('/static/*', serveStatic({ root: './dist' }))
}

// API endpoints
app.get('/api/hello', (c) => {
  return c.json({
    message: 'Hello from Lambda!',
    timestamp: new Date().toISOString(),
    environment: 'AWS Lambda'
  })
})

app.post('/api/post', async (c) => {
  try {
    const body = await c.req.json()

    // 追加のログ情報（リクエストボディやヘッダー）
    log.info('POST request body', {
      body,
      headers: {
        contentType: c.req.header('content-type'),
        userAgent: c.req.header('user-agent')
      }
    })

    return c.json({
      message: 'POST request received',
      receivedData: body,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    log.error('Failed to parse JSON body', error as Error, {
      path: c.req.path
    })

    return c.json(
      {
        error: 'Invalid JSON body',
        timestamp: new Date().toISOString()
      },
      400
    )
  }
})

// SSR for all other routes
app.get('*', (c) => {
  // AWS環境ではステージ名をパスのプレフィックスに含める
  const pathPrefix = stage ? `/${stage}` : ''

  const html = renderToString(
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        {pathPrefix && <base href={`${pathPrefix}/`} />}
        <title>Hono + React on AWS Lambda</title>
        {import.meta.env.PROD && (
          <link rel='stylesheet' href={`${pathPrefix}/static/main.css`} />
        )}
        <script
          type='module'
          src={
            import.meta.env.PROD
              ? `${pathPrefix}/static/client.js` // Production: bundled client
              : '/src/client/main.tsx' // Development: source file with HMR
          }
        ></script>
      </head>
      <body>
        <div id='root'></div>
      </body>
    </html>
  )

  return c.html(html)
})

// Export Lambda handler for production (with base path if STAGE is set)
// Handler is defined after all routes and middleware to ensure complete app state
const handler = stage ? handle(app.basePath(`/${stage}`)) : handle(app)
export { handler }

// Export app for development server
export default app
