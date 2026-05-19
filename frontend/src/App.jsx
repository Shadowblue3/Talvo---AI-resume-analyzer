import { useState } from 'react'
import {Router, Route} from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import {router} from "./app.routes.jsx"
import {AuthProvider} from "./features/auth/Auth.context.jsx"
import { InterviewProvider } from './features/interview/interview.context.jsx'

function App() {
  

  return (
    <AuthProvider>
      <InterviewProvider>
        <RouterProvider router={router}/>
      </InterviewProvider>
    </AuthProvider>
  )
}

export default App
