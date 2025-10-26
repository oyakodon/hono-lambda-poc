import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'

// Dynamically import all page components
const pages = import.meta.glob('./pages/*.tsx')

// Generate routes from file names
const routes = Object.keys(pages)
  .map((path) => {
    // Extract filename without extension: ./pages/About.tsx -> About
    const name = path.match(/\.\/pages\/(.*)\.tsx$/)?.[1]

    if (!name) return null

    // Special handling for specific pages
    if (name === 'NotFound') {
      return {
        path: '*',
        component: lazy(() => import('./pages/NotFound'))
      }
    }

    if (name === 'Home') {
      return {
        path: '/',
        component: lazy(() => import('./pages/Home'))
      }
    }

    // Convert PascalCase to kebab-case: About -> /about, ContactUs -> /contact-us
    const routePath =
      '/' +
      name.replace(/([A-Z])/g, (_match, p1, offset) =>
        offset > 0 ? `-${p1.toLowerCase()}` : p1.toLowerCase()
      )

    return {
      path: routePath,
      component: lazy(() => import(`./pages/${name}.tsx`))
    }
  })
  .filter(Boolean)

export default function App() {
  // <base> タグからベースURLを取得（ステージ名対応）
  const baseElement = document.querySelector('base')
  const basename = baseElement
    ? new URL(baseElement.href).pathname.replace(/\/$/, '')
    : undefined

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route element={<Layout />}>
          {routes.map(
            (route) =>
              route && (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <route.component />
                    </Suspense>
                  }
                />
              )
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
