import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './context/AppContext.jsx'
import AdminContextProvider from './context/AdminContext.jsx'
import DoctorContextProvider from './context/DoctorContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

  <BrowserRouter>
  <AppContextProvider>
    <AdminContextProvider>
      <DoctorContextProvider>
        <App />
      </DoctorContextProvider>
    </AdminContextProvider>
  </AppContextProvider>
  </BrowserRouter>,
)
