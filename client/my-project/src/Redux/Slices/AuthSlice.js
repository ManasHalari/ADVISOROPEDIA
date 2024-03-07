import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {toast} from "react-hot-toast"

import axiosInastace from "../../helpers/axiosInstance.js"

const initialState={
    isLoggedIn:localStorage.getItem("isLoggedIn") || false,
    data:(localStorage.getItem("data"))||{},
    role:"ADMIN"
}
export  const createAccount=createAsyncThunk("/auth/signup",
            async (data)=>{
    try{
        const res=axiosInastace.post("/createuser",data)
        toast.promise(res,{
            loading:"Wait,your account is creating.",
            success:(data)=>{
                return data?.data?.message;
            },
            error:"Account can't be created."
        })
        return (await res).data
    }catch(error){
        toast.error(error?.response?.data?.message)
    }
                   })
 export  const onLogine=createAsyncThunk("/auth/login",
                   async (data)=>{
           try{
               const res=axiosInastace.post("/signin",data)
               toast.promise(res,{
                   loading:"Wait,Authentication is running.",
                   success:(data)=>{
                       return data?.data?.message;
                   },
                   error:"User can't be login."
               })
               return (await res).data
           }catch(error){
               toast.error(error?.response?.data?.message)
           }
                          })
export  const logOut=createAsyncThunk("/auth/logout",
                          async ()=>{
                  try{
                      const res=axiosInastace.post("/logout",)
                      toast.promise(res,{
                          loading:"Wait,Logout is running.",
                          success:(data)=>{
                              return data?.data?.message;
                          },
                          error:"Logout Failed."
                      })
                      return (await res).data
                  }catch(error){
                      toast.error(error?.response?.data?.message)
                  }
                                 })                                  
 export  const editUserProfile=createAsyncThunk("/auth/edit",
                                 async (data)=>{
                         try{
                             const res=axiosInastace.put(`/editprofile/${data[0]}`,data[1])
                             toast.promise(res,{
                                 loading:"Wait,your Profile is Updating.",
                                 success:(data)=>{
                                     return data?.data?.message;
                                 },
                                 error:"Profile can't be updated."
                             })
                             return (await res).data
                         }catch(error){
                             toast.error(error?.response?.data?.message)
                         }
                                        })
 export  const getUserData=createAsyncThunk("/user/details",
                                        async ()=>{
                                try{
                                    const res=axiosInastace.get("/user/me")
                                    
                                    return (await res).data
                                }catch(error){
                                    toast.error(error?.response?.data?.message)
                                }
                                               })                                       
                                                                    
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(onLogine.fulfilled,(state,action)=> {
                localStorage.setItem("data",JSON.stringify(action?.payload?.user))
                localStorage.isLoggedIn=true
                localStorage.setItem("role",JSON.stringify(action?.payload?.user?.role))
                state.isLoggedIn=true
                state.data=action?.payload?.user
                state.role=action?.payload?.user?.role
        })
        .addCase(logOut.fulfilled,(state)=>{
            localStorage.clear()
            state.data={};
            state.isLoggedIn=false
            state.role=""
        })
        .addCase(getUserData.fulfilled,(state,action)=>{
            localStorage.setItem("data",JSON.stringify(action?.payload?.user))
                localStorage.isLoggedIn=true
                localStorage.setItem("role",JSON.stringify(action?.payload?.user?.role))
                state.isLoggedIn=true
                state.data=action?.payload?.user
                state.role=action?.payload?.user?.role
        })
    }

})

export default authSlice.reducer
// export const {}=authSlice.actions