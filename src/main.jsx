import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router-dom"; // ✅ yahi sahi import hai
import App from './App.jsx'
import Home from './Components/Basics/Home/Home.jsx';
import Countries from './Components/Basics/Countries/Countries.jsx';
import Service from './Components/Basics/Services/Service.jsx';
import About from './Components/Basics/About/About.jsx';
import Contact from './Components/Basics/Contact/Contact.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import { ToastProvider } from './Components/Toast.jsx';
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/countries',
        element: < Countries/>
      },
       {
        path: '/services',
        element: < Service/>
      },
       {
        path: 'about',
        element: < About/>
      },
      {
        path: 'contact',
        element: < Contact/>
      }
    ]
  },
  {
    path: '/admin/panel/login',
    element: <AdminLogin />
  },
  {
    path: '/admin/panel',
    element: <AdminDashboard />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <RouterProvider router={router} /> 
    </ToastProvider>
  </StrictMode>,
)
