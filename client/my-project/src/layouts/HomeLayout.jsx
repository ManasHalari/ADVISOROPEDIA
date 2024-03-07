/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {AiFillCloseCircle} from "react-icons/ai"
import {FiMenu} from "react-icons/fi"
import {useDispatch, useSelector} from "react-redux"
import {Link, useNavigate} from "react-router-dom"

import Footer from "../components/Footer.jsx";
import { logOut } from "../Redux/Slices/AuthSlice.js"

function HomeLayout({children}) {
    const dispatch=useDispatch()
    const navigate=useNavigate()

    //for checking user ids logged in or not
    const isLoggedIn=useSelector((state)=>state?.auth?.isLoggedIn)

    //for taking role as a input
    const role=useSelector((state)=>state?.auth?.role)

    function changeWidth() {
        const drawerSide=document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width="auto";

    }
    function hideDrawer() {
        const element=document.getElementsByClassName("drawer-toggle")
        element[0].checked=false
        const drawerSide=document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width="0";
    }
  async  function handleLogout(e) {
        e.preventDefault();
        const res=await dispatch(logOut())
        if(res?.payload?.success)
        navigate("/")
    }
  return (
    <div className="min-h-[85vh] bg-slate-900">
        <div className="drawer absolute z-50 w-fit left-0">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
            <label htmlFor="my-drawer" className="cursor-pointer relative">
            <FiMenu 
                onClick={changeWidth}
                size={30} 
                className="font-bold text-white m-4"
            />
            </label>
            </div>
            <div className="drawer-side w-0 ">
            <label htmlFor="my-drawer" className="drawer-overlay "></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-lg">
                <li className="absolute right-2 w-fit z-50">
                        <button className="hideDrawer" onClick={hideDrawer}>
                            <AiFillCloseCircle size={30}/>
                        </button>
                </li>
                <li>
                    <Link to="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/signup">
                        SignUp
                    </Link>
                </li>
                <li>
                    <Link to="/login">
                       login
                    </Link>
                </li>

                < div className="flex w-full ">  
                
                        {isLoggedIn && (
                      
                       <li>
                        <div  className="flex w-full">  
                         <button className="btn-primary px-6 py-2 font-semibold rounded-md w-full bg-slate-500">
                                <Link to="/user/profile"> Profile</Link>
                        </button>
                         <button className="btn-secondary px-4 py-2 font-semibold rounded-md w-full bg-slate-500">
                                <Link onClick={handleLogout}>Logout</Link>
                        </button>
                        </div>
                       </li>
                      
                    )}
                     </div>
                 
                
                </ul>
                </div>
        </div>

        {children}

        <Footer/>

    </div>
  )
}

export default HomeLayout