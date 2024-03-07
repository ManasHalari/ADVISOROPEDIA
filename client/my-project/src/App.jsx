import { Route, Routes } from "react-router-dom";
import SignUp from "./layouts/SignUp";
import Login from "./layouts/Login";
import HomePage from "./pages/HomePage";
import Profile from "./pages/User/Profile";


function App() {
  return (
    <>
    <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/signup" element={<SignUp />} /> 
    <Route path="/login" element={<Login />} />
    <Route path="/user/profile" element={<Profile />} />
    </Routes>
    </>
  )
}

export default App;
