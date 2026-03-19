import React from 'react'
import { toast } from 'react-hot-toast'
import  axios from "axios" 

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from '@clerk/clerk-react'

const HomePage = () => {

//await axiosInstance.get("/session/123") 
  //const [count, setCount] = useState(0) 
    /// with  tanstack 
   // problem with use satate , use effect and fecth()
   // when you focus on the window  - it fectch data immedatelty again 
   // so we use  tanstack query - it has a feature called refetch on window focus  - by default it is true  - so we can set it to false 
  //  const {data  , isLoading  , error} =   useQuery({
  //     queryFn:()=> fetch("/api/books").then(res=>res.json())
  //  })

  return (
    <div>
      <button className='btn  btn-secondary' onClick={()=>toast.success("this is a succes toast")} >
        Click me  
        </button>
        <SignedOut> 
        <SignInButton mode="modal">
          <button> Login  </button>
          </SignInButton>
        </SignedOut>
   <SignedIn>
      <SignOutButton/> 
     
   </SignedIn> 
     <UserButton />
    </div>
  )

}


export default HomePage
