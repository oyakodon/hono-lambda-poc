import CallHello from '../components/CallHello'
import Counter from '../components/Counter'

export default function Home() {
  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-4xl font-bold mb-2'>Hono + React on AWS Lambda</h1>
        <p className='text-lg text-muted-foreground'>
          This is a minimal SSR + SPA application running on AWS Lambda.
        </p>
      </div>
      <hr className='border-border' />
      <Counter />
      <hr className='border-border' />
      <CallHello />
    </div>
  )
}
