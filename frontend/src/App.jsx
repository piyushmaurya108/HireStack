import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
function App() {
   
  const [count, setCount] = useState(0)

  return (
    <>
    <h1> Welcome to App.js </h1>
        <SignedOut>
        <SignInButton mode="modal" />
        </SignedOut>
   <SignedIn>
      <SignedOut mode="modal"/> 
       <UserButton/>
   </SignedIn>
   
  

    </>
  )
}

export default App
