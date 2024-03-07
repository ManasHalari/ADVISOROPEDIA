import { useState } from "react"
import {toast} from "react-hot-toast"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { onLogine } from "../Redux/Slices/AuthSlice"
import HomeLayout from "./HomeLayout"

function Login() {
   const navigate=useNavigate()
  const dispatch=useDispatch()
    
    const [loginData,setLoginData]=useState({
       
        email:"",
        password:""
    })
    function handleUserInput(e) {
        const {name,value}=e.target
        setLoginData({
            ...loginData,
            [name]:value
        })
        
    }

   async function onLogin(event) {
        event.preventDefault();
        if (!loginData.email  || !loginData.password) {
            toast.error("All Fields are required.") 
            return;     
        }
        //dispatch create account action
        const response= await dispatch(onLogine(loginData))
        console.log(response);
        if (response?.payload?.success){
            navigate("/")
            setLoginData({
           
            email:"",
            password:""
                })
        
            }

        
    }
  return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[85vh]" >
                <form noValidate onSubmit={onLogin} className="flex flex-col w-96 text-white p-4 justify-center gap-3 rounded-lg shadow-[0_0_10px_black]">
                <h1 className="text-3xl text-center font-bold ">Login Page</h1>
               
             
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="font-semibold">Email</label>
                    <input
                     type="email"
                     name="email"
                     id="email"
                     placeholder="Enter your Email"
                     required
                     onChange={handleUserInput}
                     value={loginData.email}
                     className="border bg-transparent px-2 py-1 "
                    />
                       
                       <label htmlFor="password" className="font-semibold">Password</label>
                    <input
                     type="password"
                     name="password"
                     id="password"
                     placeholder="Enter your Password"
                     required
                     onChange={handleUserInput}
                     value={loginData.password}
                     className="border bg-transparent px-2 py-1 "
                    />

                </div>
                    <button type="submit" className="bg-yellow-600 mt-3 py-3 font-semibold cursor-pointer text-lg hover:bg-yellow-500 w-full rounded-md transition-all ease-in-out duration-300">
                        Login
                    </button>
                    <p className="text-center">
                        Don&apos;t have an Account <Link to="/signup" className="link text-accent ">Signup</Link>
                    </p>
                </form>
                

            </div>
        </HomeLayout>
  )
}

export default Login