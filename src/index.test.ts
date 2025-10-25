import { describe, it, expect } from 'vitest'
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
  })

  describe('POST /api/post', () => {
    it('should return 200 for valid JSON', async () => {
      const res = await app.request('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'test', value: 123 }),
      })

      expect(res.status).toBe(200)
    })

    it('should echo back the request body', async () => {
      const testData = { name: 'test', value: 123, nested: { key: 'value' } }

      const res = await app.request('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testData),
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
        body: 'invalid json string',
      })

      expect(res.status).toBe(400)
    })

    it('should return error message for invalid JSON', async () => {
      const res = await app.request('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: 'invalid json',
      })

      const json = await res.json()
      expect(json.error).toBe('Invalid JSON body')
      expect(json).toHaveProperty('timestamp')
    })
  })
})
