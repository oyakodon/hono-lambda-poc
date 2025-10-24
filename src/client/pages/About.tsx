import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'

export default function About() {
  return (
    <div className='space-y-6'>
      <h1 className='text-4xl font-bold'>About</h1>
      <p className='text-lg text-muted-foreground'>
        This is a demo application showcasing:
      </p>
      <ul className='list-disc list-inside space-y-2 text-foreground'>
        <li>Hono - Lightweight web framework</li>
        <li>React 18 - UI library with modern hooks</li>
        <li>React Router - Client-side routing</li>
        <li>Vite - Fast build tool with HMR</li>
        <li>AWS Lambda - Serverless compute (ARM64)</li>
        <li>Docker - Multi-stage build for production</li>
        <li>Tailwind CSS - Utility-first CSS framework</li>
        <li>shadcn/ui - Re-usable component library</li>
      </ul>
      <hr className='border-border' />
      <Button asChild variant='outline'>
        <Link to='/'>← Back to Home</Link>
      </Button>
    </div>
  )
}
