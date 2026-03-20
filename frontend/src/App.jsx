import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Toaster } from 'react-hot-toast'

import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react'
import { Navigate, Route, Router , Routes } from 'react-router'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProblemsPage from './pages/ProblemsPage'
import DashboardPage from './pages/DashboardPage'

function App() {
  // <Route path="/"  element= { <HomePage/>} />
  const {isSignedIn , isLoaded} = useUser() 
   // this wil remove the flikering effect of the page when the user is
   // loading and it will check if the user is signed in or not
  if(!isLoaded) return null ;

  return (
    <>
    <Routes>
    <Route path="/"  element= { !isSignedIn?<HomePage/> : <Navigate to={"/dashboard"} /> } />
    <Route path="/dashboard"  element= { isSignedIn?<DashboardPage/> : <Navigate to={"/"} /> } /> 
    <Route path="/problems"  element= { isSignedIn?<ProblemsPage/> : <Navigate to={"/"} /> } /> 
  
    </Routes>
    <Toaster  toastOptions={{duration:3000}}/>
    </>
  );
}

export default App
// toast  , daisy ui , react router dom , react query - aka tanstack query , axiox 
