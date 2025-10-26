import { useState } from 'react'
import { getApiUrl } from '../utils/api'
import { Button } from './ui/button'

export default function CallHello() {
  const [data, setData] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    try {
      const response = await fetch(getApiUrl('/api/hello'))
      const json = await response.json()
      setData(JSON.stringify(json, null, 2))
    } catch (error) {
      setData(`Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='space-y-4'>
      <h2 className='text-2xl font-bold'>API Test</h2>
      <p className='text-muted-foreground'>
        Click the button to fetch data from the API:
      </p>
      <Button onClick={handleClick} disabled={loading} variant='secondary'>
        {loading ? 'Loading...' : 'Call /api/hello'}
      </Button>
      {data && (
        <pre className='bg-muted p-4 rounded-md mt-4 overflow-x-auto'>
          {data}
        </pre>
      )}
    </div>
  )
}
