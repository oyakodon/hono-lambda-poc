import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <nav className='mb-6 pb-4 border-b border-border'>
        <Link to='/' className='mr-6 text-primary hover:underline'>
          Home
        </Link>
        <Link to='/about' className='mr-6 text-primary hover:underline'>
          About
        </Link>
        <Link to='/api-demo' className='text-primary hover:underline'>
          API Demo
        </Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  )
}
