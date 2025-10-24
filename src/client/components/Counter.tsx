import { useState } from 'react'
import { Button } from './ui/button'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div className='space-y-4'>
      <h2 className='text-2xl font-bold'>Counter Example</h2>
      <p className='text-muted-foreground'>
        Click the button to increment the counter:
      </p>
      <Button onClick={() => setCount(count + 1)}>Count: {count}</Button>
    </div>
  )
}
