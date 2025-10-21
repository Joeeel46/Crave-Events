import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, CheckCircle, Loader2, Calendar } from "lucide-react";
import * as z from "zod";
import { useNavigate } from "react-router-dom"
import { useClientForgotPasswordMutation } from "@/hooks/clientCustomHooks";

interface ForgotPasswordProps {
  userType?: "client" | "vendor"
}

// ✅ Step 1: Define Zod Schema
const forgotEmailValidationSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  role: z.enum(['client', 'vendor'])
})

type ForgotPasswordFormData = z.infer<typeof forgotEmailValidationSchema>

export const ForgotPasswordEmail = ({ userType = "client" }: ForgotPasswordProps) => {
  const navigate = useNavigate()
  const forgotPasswordMutation = useClientForgotPasswordMutation()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const loginPath = userType === "vendor" ? "/vendorLogin" : "/userLogin"

  // ✅ Step 2: Initialize form with react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    watch
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotEmailValidationSchema),
    defaultValues: { 
      email: "", 
      role: userType 
    },
  })

  const emailValue = watch("email")

  // ✅ Step 3: Handle submit with double-click prevention
  const onSubmit = (values: ForgotPasswordFormData) => {
    // Prevent multiple submissions
    if (isProcessing) return;
    
    setIsProcessing(true);
    
    forgotPasswordMutation.mutate(
      { email: values.email, role: values.role },
      {
        onSuccess: () => {
          setSubmittedEmail(values.email)
          setIsSubmitted(true)
          setIsProcessing(false)
        },
        onError: (error: any) => {
          setError("email", { 
            message: error?.response?.data?.message || error?.message || "Something went wrong. Please try again." 
          })
          setIsProcessing(false)
        },
      }
    )
  }

  // Determine if button should be disabled
  const isButtonDisabled = isSubmitting || isProcessing || forgotPasswordMutation.isPending

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-auto bg-white rounded-xl shadow-xl overflow-hidden"
      >
        <div className="relative h-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
          <motion.div
            className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-4 shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div className="rounded-full p-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              <Calendar className="h-8 w-8 text-white" />
            </div>
          </motion.div>
        </div>

        <div className="px-8 pt-16 pb-8">
          {!isSubmitted ? (
            <>
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h1 className="text-3xl font-bold text-indigo-600 mb-2 tracking-wide">CRAVE EVENTS</h1>
                <p className="text-gray-600 text-sm">
                  {userType === "vendor" ? "Vendor Portal" : "Client Portal"} - Password Reset
                </p>
              </motion.div>

              <motion.h2
                className="text-2xl font-bold text-center text-gray-900 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Forgot Your Password?
              </motion.h2>
              <motion.p
                className="text-gray-600 text-center mb-8 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Enter your email address and we'll send you a link to reset your password.
              </motion.p>

              <motion.form
                onSubmit={handleSubmit(onSubmit)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      {...register("email")}
                      className={`w-full px-4 py-3 border ${
                        errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-indigo-500"
                      } rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all bg-white text-gray-900 placeholder:text-gray-400`}
                      placeholder={userType === "vendor" ? "vendor@example.com" : "client@example.com"}
                      disabled={isButtonDisabled}
                    />
                    <Mail className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-500"
                    >
                      {errors.email.message}
                    </motion.p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  className={`w-full text-white py-3 rounded-lg font-semibold flex items-center justify-center transition-all shadow-md ${
                    isButtonDisabled 
                      ? "bg-gray-400 cursor-not-allowed opacity-60" 
                      : "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-90"
                  }`}
                  whileHover={!isButtonDisabled ? { scale: 1.02 } : {}}
                  whileTap={!isButtonDisabled ? { scale: 0.98 } : {}}
                  disabled={isButtonDisabled}
                >
                  {isButtonDisabled ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Reset Password
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </motion.button>
              </motion.form>

              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <button 
                  onClick={() => navigate(loginPath)} 
                  className="text-sm text-indigo-600 hover:text-indigo-700 transition-colors font-medium"
                  type="button"
                >
                  Back to Login
                </button>
              </motion.div>
            </>
          ) : (
            <motion.div
              className="text-center py-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4"
              >
                <CheckCircle className="h-10 w-10 text-green-600" />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Check Your Email</h3>
              <p className="text-gray-600 mb-6 text-sm">
                We've sent a password reset link to:
                <br />
                <span className="font-semibold text-gray-900">{submittedEmail}</span>
              </p>
              <p className="text-sm text-gray-600 mb-6">
                If you don't see the email, check other places it might be, like your junk, spam, social, or other
                folders.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setSubmittedEmail("");
                  setIsProcessing(false);
                }}
                className="text-indigo-600 hover:text-indigo-700 text-sm font-medium transition-colors"
                type="button"
              >
                Didn't receive the email? Try again
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordEmail;