import { useState } from 'react'
import './App.css'
import { Children } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Auth from './pages/auth'
import LandingPage from './pages/landing'
import Link from './pages/link'
import RedirectLink from './pages/redirect-link'
import AppLayout from './layouts/app-layout'

const router =  createBrowserRouter([
  {
    element:<AppLayout/>,
    children:[
      {
        path:"/",
        element:<LandingPage/>
      },
      {
        path:"/dashboard",
        element:<Dashboard/>
      },
      {
        path:"/auth",
        element:<Auth/>
      },
      {
        path:"/link/:",
        element:<Link/>
      },
      {
        path:"/:id",
        element:<RedirectLink/>
      }
    ]
  }
])

function App() {

  return (
    <>
     <RouterProvider router={router}/>
    </>
  )
}

export default App
