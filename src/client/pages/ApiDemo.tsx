import { useState } from 'react'
import { getApiUrl } from '../utils/api'
import { Button } from '../components/ui/button'

export default function ApiDemo() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResponse('')

    try {
      const res = await fetch(getApiUrl('/api/post'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, message })
      })

      const data = await res.json()
      setResponse(JSON.stringify(data, null, 2))
    } catch (error) {
      setResponse(
        `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='space-y-6'>
      <h1 className='text-4xl font-bold'>API Test</h1>
      <p className='text-lg text-muted-foreground'>
        Test POST request to /api/post with structured logging
      </p>

      <div className='space-y-4'>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label htmlFor='name' className='block text-sm font-medium mb-2'>
              Name
            </label>
            <input
              id='name'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full px-4 py-2 border border-input rounded-md bg-background'
              placeholder='Enter your name'
              required
            />
          </div>

          <div>
            <label htmlFor='message' className='block text-sm font-medium mb-2'>
              Message
            </label>
            <textarea
              id='message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className='w-full px-4 py-2 border border-input rounded-md bg-background'
              placeholder='Enter your message'
              rows={4}
              required
            />
          </div>

          <Button type='submit' disabled={loading}>
            {loading ? 'Sending...' : 'Send POST Request'}
          </Button>
        </form>

        {response && (
          <div className='mt-6'>
            <h2 className='text-2xl font-bold mb-2'>Response:</h2>
            <pre className='p-4 bg-muted rounded-md overflow-x-auto text-sm'>
              {response}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
