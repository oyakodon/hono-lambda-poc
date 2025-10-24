import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'

export default function NotFound() {
  return (
    <div className='space-y-6 text-center'>
      <h1 className='text-4xl font-bold'>404 - Page Not Found</h1>
      <p className='text-lg text-muted-foreground'>
        The page you are looking for does not exist.
      </p>
      <hr className='border-border' />
      <Button asChild>
        <Link to='/'>← Back to Home</Link>
      </Button>
    </div>
  )
}
