import { describe, expect, it } from 'vitest'
import app from './index'

describe('API Endpoints', () => {
  describe('GET /api/hello', () => {
    it('should return 200 status', async () => {
      const res = await app.request('/api/hello')
      expect(res.status).toBe(200)
    })

    it('should return correct JSON structure', async () => {
      const res = await app.request('/api/hello')
      const json = await res.json()

      expect(json).toHaveProperty('message', 'Hello from Lambda!')
      expect(json).toHaveProperty('timestamp')
      expect(json).toHaveProperty('environment', 'AWS Lambda')
    })

    it('should return valid ISO timestamp', async () => {
      const res = await app.request('/api/hello')
      const json = await res.json()

      const timestamp = new Date(json.timestamp)
      expect(timestamp.toISOString()).toBe(json.timestamp)
    })

    it('should return X-Request-Id header in response', async () => {
      const res = await app.request('/api/hello')
      const requestId = res.headers.get('X-Request-Id')

      expect(requestId).toBeTruthy()
      expect(typeof requestId).toBe('string')
    })

    it('should use provided X-Request-Id from request header', async () => {
      const customRequestId = 'test-request-id-12345'
      const res = await app.request('/api/hello', {
        headers: {
          'X-Request-Id': customRequestId
        }
      })
      const responseRequestId = res.headers.get('X-Request-Id')

      expect(responseRequestId).toBe(customRequestId)
    })
  })

  describe('POST /api/post', () => {
    it('should return 200 for valid JSON', async () => {
      const res = await app.request('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'test', value: 123 })
      })

      expect(res.status).toBe(200)
    })

    it('should echo back the request body', async () => {
      const testData = { name: 'test', value: 123, nested: { key: 'value' } }

      const res = await app.request('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testData)
      })

      const json = await res.json()
      expect(json.message).toBe('POST request received')
      expect(json.receivedData).toEqual(testData)
      expect(json).toHaveProperty('timestamp')
    })

    it('should return 400 for invalid JSON', async () => {
      const res = await app.request('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: 'invalid json string'
      })

      expect(res.status).toBe(400)
    })

    it('should return error message for invalid JSON', async () => {
      const res = await app.request('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: 'invalid json'
      })

      const json = await res.json()
      expect(json.error).toBe('Invalid JSON body')
      expect(json).toHaveProperty('timestamp')
    })
  })
})
