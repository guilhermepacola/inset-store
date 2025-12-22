import './index.css'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { useState } from 'react'
import App from './App.jsx'
import Layout from './components/Layout/Layout'


function RouterLayout() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <Layout onSearch={(value) => setSearchValue(value)}>
      <Outlet context={[searchValue]} />
    </Layout>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RouterLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
