import { useState } from "react"
import {toast} from "react-hot-toast"
import { BsPersonCircle } from "react-icons/bs"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { createAccount } from "../Redux/Slices/AuthSlice"
import HomeLayout from "./HomeLayout"

function SignUp() {
   const navigate=useNavigate()
  const dispatch=useDispatch()
    const [previewImage,setPreviewImage]=useState("")
    const [signUpData,setSignUpData]=useState({
        userName:"",
        fullName:"",
        email:"",
        password:"",
        avatar:""
    })
    function handleUserInput(e) {
        const {name,value}=e.target
        setSignUpData({
            ...signUpData,
            [name]:value
        })
        
    }
    function getImage(e) {
        e.preventDefault();
        const image=e.target.files[0]
      if(image) {
        setSignUpData({
            ...signUpData,
            avatar:image 
        })
      }
      const fileReader= new FileReader()
      fileReader.readAsDataURL(image)
      fileReader.addEventListener("load",function(){
        console.log(this.result);
        setPreviewImage(this.result)
      })
    }
   async function createNewAccount(event) {
        event.preventDefault();
        if (!signUpData.email ||  !signUpData.avatar || !signUpData.password|| !signUpData.fullName ||!signUpData.userName) {
            toast.error("All Fields are required.") 
            return;     
        }

        if(signUpData.userName.length<5){
            toast.error("userName must be of at least 5 characters.")
            return;
        }

        if(signUpData.fullName.length<5){
            toast.error("fullName must be of at least 5 characters.")
            return;
        }

        if (!signUpData.email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g)) {
            toast.error("Email is Invalid.")            
            return;
        }

        if (!signUpData.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)) {
            toast.error('Password should contain minimum eight characters,atleast one uppercase letter,one lowercase letter and a number.')
            return;
        }

        if (!signUpData.confirmPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)) {
            toast.error('Password should contain minimum eight characters,atleast one uppercase letter,one lowercase letter and a number.')
            return;
        }

        if(signUpData.password!=signUpData.confirmPassword){
            toast.error("Password and Confirm password are not same.")
            return;
        }

        const formData=new FormData()
        formData.append("userName",signUpData.userName)
        formData.append("fullName",signUpData.fullName)
        formData.append("email",signUpData.email)
        formData.append("password",signUpData.password)
        formData.append("avatar",signUpData.avatar)
        console.log(formData);
        

        //dispatch create account action
        const response= await dispatch(createAccount(formData))
        console.log(response);
        if (response?.payload?.success){
            navigate("/")
            setSignUpData({
            name:"",
            email:"",
            password:"",
            confirmPassword:"",
            avatar:""
                })
        setPreviewImage("")
            }

        
    }
  return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[85vh]" >
                <form noValidate onSubmit={createNewAccount} className="flex flex-col w-96 text-white p-4 justify-center gap-3 rounded-lg shadow-[0_0_10px_black]">
                <h1 className="text-3xl text-center font-bold ">Registration Page</h1>
                <label htmlFor="image_uploads" className="cursor-pointer">
                    {
                        previewImage?
                        (<img src={previewImage} className="w-24 h-24 rounded-full m-auto" />):
                        (<BsPersonCircle className="w-24 h-24 rounded-full m-auto"/>)
                    }

                </label>
                <input 
                id="image_uploads"
                className="hidden"
                type="file"
                name="image_uploads"
                accept=".jpg,.jpeg,.png,.svg"
                onChange={getImage}
                
                
                />
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="font-semibold">Email</label>
                    <input
                     type="email"
                     name="email"
                     id="email"
                     placeholder="Enter your Email"
                     required
                     onChange={handleUserInput}
                     value={signUpData.email}
                     className="border bg-transparent px-2 py-1 "
                    />
                       <label htmlFor="userName" className="font-semibold">userName</label>
                    <input
                     type="text"
                     name="userName"
                     id="userName"
                     placeholder="Enter your userName"
                     required
                     onChange={handleUserInput}
                     value={signUpData.userName}
                     className="border bg-transparent px-2 py-1 "
                    />
                            <label htmlFor="fullName" className="font-semibold">fullName</label>
                    <input
                     type="text"
                     name="fullName"
                     id="fullName"
                     placeholder="Enter your fullName"
                     required
                     onChange={handleUserInput}
                     value={signUpData.fullName}
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
                     value={signUpData.password}
                     className="border bg-transparent px-2 py-1 "
                    />
                    
                    <label htmlFor="confirmPassword" className="font-semibold">Confirm Password</label>

                    <input
                     type="password"
                     name="confimPassword"
                     id="confirmPassword"
                     placeholder="Enter your Confirm Password"
                     required
                     onChange={handleUserInput}
                     value={signUpData.confirmPassword}
                     className="border bg-transparent px-2 py-1 "
                    />


                </div>
                    <button type="submit" className="bg-yellow-600 mt-3 py-3 font-semibold cursor-pointer text-lg hover:bg-yellow-500 w-full rounded-md transition-all ease-in-out duration-300">
                        Create account
                    </button>
                    <p className="text-center">
                        Already have an account <Link to="/login" className="link text-accent ">Login</Link>
                    </p>
                </form>
                

            </div>
        </HomeLayout>
  )
}

export default SignUp