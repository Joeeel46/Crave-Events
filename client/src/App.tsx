import { BrowserRouter, Route, Routes } from "react-router-dom"

import Index from "./pages/Login/Index"
import Login from "./pages/user/Login"
import Signup from "./pages/user/Signup"
import AdminLogin from "./pages/Login/AdminLogin"
import AdminDashboard from "./pages/AdminDashboard"
import VendorAuth from "./pages/Login/VendorAuth"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index/>}></Route>
        <Route path="/userLogin" element={<Login/>}></Route>
        <Route path="/userSignup" element={<Signup/>}></Route>
        <Route path="/adminLogin" element={<AdminLogin/>}></Route>
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/vendorAuth" element={<VendorAuth />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
