import pino from 'pino'

// Lambda環境では本番モード、それ以外は開発モード
const isDevelopment = !import.meta.env.PROD

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  // pid, hostname は本番・開発共に不要
  base: undefined,
  // 開発環境では読みやすく整形、本番環境ではJSON
  ...(isDevelopment
    ? {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'HH:MM:ss',
            ignore: 'pid,hostname'
          }
        }
      }
    : {
        formatters: {
          level: (label) => {
            return { level: label.toUpperCase() }
          }
        }
      })
})

// 型安全なログヘルパー
export const log = {
  info: (message: string, data?: Record<string, unknown>) => {
    logger.info(data, message)
  },
  error: (message: string, error?: Error, data?: Record<string, unknown>) => {
    logger.error(
      {
        ...data,
        error: error
          ? {
              name: error.name,
              message: error.message,
              stack: error.stack
            }
          : undefined
      },
      message
    )
  },
  warn: (message: string, data?: Record<string, unknown>) => {
    logger.warn(data, message)
  },
  debug: (message: string, data?: Record<string, unknown>) => {
    logger.debug(data, message)
  }
}
