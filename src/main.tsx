import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './assets/Pages/Login'
import Register from './assets/Pages/Register'
import Read from './components/Read/Read'
import Dashboard from './assets/Pages/Dashboard/Dashboard'
import Show from './components/Show/Show'
import Favorites from './components/Favorites/Favorites'
import Order from './components/Order/Order'
import Add from './components/Add/Add'
import Edit from './components/Edit/Edit'

const router = createBrowserRouter([
  {
    path: "/api+crud",
    children: [
      {
        path: "",
        element: <Login />
      },
      {
        path: "sign-up",
        element: <Register />
      },
      {
        path: "dasboard",
        element: <Dashboard />,
        children: [
          {
            path: "",
            element: <Read />
          },
          {
            path: "favorites",
            element: <Favorites />
          },
          {
            path: "order",
            element: <Order />
          },
          {
            path: "add",
            element: <Add />
          },
          {
            path: "show/:id",
            element: <Show />
          },
          {
            path: "edit/:id",
            element: <Edit />
          },
        ]
      }
    ],
  }])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
