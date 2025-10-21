"use client"

import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, Lock, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { useClientResetPasswordMutation } from "@/hooks/clientCustomHooks"
import {jwtDecode} from "jwt-decode";

interface ResetTokenPayload {
  userId: string
  role: "client" | "vendor" | "admin"
}

export const ResetPassword = () => {
  const { token } = useParams<{ token: string }>()
  const navigate = useNavigate()

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string; general?: string }>({})
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [passwordFeedback, setPasswordFeedback] = useState("")
  const clientResetPasswordMutation = useClientResetPasswordMutation()

  // Decode token to get role
  let role: "client" | "vendor" | "admin" = "client"
  try {
    if (token) {
      const payload = jwtDecode<ResetTokenPayload>(token as string);
      role = payload.role
      console.log("role",role)
    }
  } catch (err) {
    console.error("Invalid token")
  }

  const loginPath = role === "vendor" ? "/vendorLogin" : "/userLogin"

  // Password strength calculation
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0)
      setPasswordFeedback("")
      return
    }

    let strength = 0
    let feedback = ""

    if (password.length >= 8) strength += 1
    else feedback = "Password should be at least 8 characters"

    if (/[A-Z]/.test(password)) strength += 1
    else if (!feedback) feedback = "Add an uppercase letter"

    if (/[a-z]/.test(password)) strength += 1
    else if (!feedback) feedback = "Add a lowercase letter"

    if (/[0-9]/.test(password)) strength += 1
    else if (!feedback) feedback = "Add a number"

    if (/[^A-Za-z0-9]/.test(password)) strength += 1
    else if (!feedback) feedback = "Add a special character"

    setPasswordStrength(strength)
    setPasswordFeedback(feedback)
  }, [password])

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return "bg-red-500"
    if (passwordStrength <= 3) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getStrengthText = () => {
    if (passwordStrength <= 1) return "Weak"
    if (passwordStrength <= 3) return "Medium"
    return "Strong"
  }

  const validateForm = () => {
    const newErrors: { password?: string; confirmPassword?: string; general?: string } = {}
    let isValid = true

    if (!password) {
      newErrors.password = "Password is required"
      isValid = false
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
      isValid = false
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
      isValid = false
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)

    clientResetPasswordMutation.mutate(
      { password, token: token as string },
      {
        onSuccess: () => setIsSuccess(true),
        onError: (error: any) => setErrors({ general: error?.message })
      }
    )

    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="relative h-24 bg-gradient-to-r from-purple-500 to-pink-500">
          <motion.div
            className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-4 shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-3">
              <Lock className="h-8 w-8 text-white" />
            </div>
          </motion.div>
        </div>

        <div className="px-6 pt-16 pb-8">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <motion.h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                  Create New Password
                </motion.h2>
                <motion.p className="text-gray-600 text-center mb-8">
                  Your new password must be different from previously used passwords.
                </motion.p>

                {errors.general && (
                  <motion.div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                    <span>{errors.general}</span>
                  </motion.div>
                )}

                <motion.form onSubmit={handleSubmit}>
                  {/* Password Field */}
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`w-full px-4 py-3 border ${errors.password ? "border-red-300" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isSubmitting}
                      />
                      <button type="button" className="absolute right-3 top-3 text-gray-400 hover:text-gray-600" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}

                    {password && (
                      <div className="mt-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-500">Password strength:</span>
                          <span className={`text-xs font-medium ${passwordStrength <= 1 ? "text-red-500" : passwordStrength <= 3 ? "text-yellow-500" : "text-green-500"}`}>
                            {getStrengthText()}
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                          <motion.div className={`h-full ${getStrengthColor()}`} initial={{ width: "0%" }} animate={{ width: `${(passwordStrength / 5) * 100}%` }} transition={{ duration: 0.3 }} />
                        </div>
                        {passwordFeedback && <p className="text-xs text-gray-500 mt-1">{passwordFeedback}</p>}
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        className={`w-full px-4 py-3 border ${errors.confirmPassword ? "border-red-300" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all`}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={isSubmitting}
                      />
                      <button type="button" className="absolute right-3 top-3 text-gray-400 hover:text-gray-600" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>}
                  </div>

                  <motion.button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium flex items-center justify-center hover:opacity-90 transition-all" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : "Reset Password"}
                  </motion.button>
                </motion.form>
              </motion.div>
            ) : (
              <motion.div className="text-center py-6">
                <motion.div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-10 w-10 text-green-500" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Password Reset Successfully</h3>
                <p className="text-gray-600 mb-6">Your password has been reset successfully. You can now log in with your new password.</p>
                <motion.a onClick={() => navigate(loginPath)} className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-all">
                  Go to Login
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

export default ResetPassword
