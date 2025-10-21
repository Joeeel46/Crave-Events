import { BrowserRouter, Route, Routes } from "react-router-dom"

import Index from "./pages/home"
import UserLogin from "./pages/user/Login"
import UserSignup from "./pages/user/Signup"
import AdminLogin from "./pages/admin/AdminLogin"
import AdminDashboard from "./pages/admin/AdminDashboard"
import VendorSignup from "./pages/vendor/Signup"
import VendorLogin from "./pages/vendor/Login"
import ForgotPasswordEmail from "./pages/common/forgotPassword"
import { Toaster } from "sonner";
import VendorHome from "./pages/vendorHome"
import ResetPasswordPage from "./pages/common/resetPassword"

function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />}></Route>
          <Route path="/userLogin" element={<UserLogin />}></Route>
          <Route path="/userSignup" element={<UserSignup />}></Route>
          <Route path="/adminLogin" element={<AdminLogin />}></Route>
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/vendorSignup" element={<VendorSignup />} />
          <Route path="/vendorLogin" element={<VendorLogin />} />
          <Route path="/vendorHome" element={<VendorHome />} />
          <Route path="/forgot-password/client" element={<ForgotPasswordEmail userType="client" />} />
          <Route path="/forgot-password/vendor" element={<ForgotPasswordEmail userType="vendor" />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
