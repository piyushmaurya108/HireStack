import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Toaster } from 'react-hot-toast'

import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react'
import { Navigate, Route, Router , Routes } from 'react-router'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProblemsPage from './pages/ProblemsPage'
function App() {
   
  

    const {isSignedIn} = useUser() 

  return (
    <>
   
    <Routes>
 
    <Route path="/"  element= {<HomePage/>} />
    <Route path="/about"  element= {<AboutPage/>} /> 
    <Route path="/problems"  element= { isSignedIn?<ProblemsPage/> : <Navigate to={"/"} /> } /> 
 
  
     
    </Routes>
    <Toaster  toastOptions={{duration:3000}}/>
    </>
  );
}

export default App
// toast  , daisy ui , react router dom , react query - aka tanstack query , axiox 
