import React, { useState } from "react";
import { Eye, EyeOff, Calendar, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import OTPVerificationModal from "../OTPVerificationModal";
import { useVendorSignupMutation } from "@/hooks/vendorCustomHooks";
import { useVendorCreateAccountMutation } from "@/hooks/vendorCustomHooks";
import { useResendOtpVendorMutaion } from "@/hooks/vendorCustomHooks";
import { useVerifyOtpVendorMutation } from "@/hooks/vendorCustomHooks";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, AlertCircle } from "lucide-react";
import type { IVendorData } from "@/types/signup";

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}


type SignupFormData = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
  idProof: File | null;
};

interface FormErrors {
  [key: string]: string;
}

const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [formData, setFormData] = useState<SignupFormData>({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    idProof: null
  });
 
  const [errors, setErrors] = useState<FormErrors>({});

  const sendOtp = useVendorSignupMutation()
  const verifyOtp = useVerifyOtpVendorMutation();
  const resendOtp = useResendOtpVendorMutaion()
  const createAccount = useVendorCreateAccountMutation();
  const navigate = useNavigate()
  const { toast } = useToast();

  const handleInputChange = (field: keyof SignupFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, idProof: file }));
      toast({
        title: "File Selected",
        description: `File "${file.name}" selected successfully.`,
      });
    }
  };

  const signupSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().regex(/^[0-9]{10,15}$/, "Please enter a valid phone number"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
    idProof: z.any().refine((file) => file, "Please upload your ID proof"),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({})

    // Validate with Zod
    const result = signupSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0];
        if (typeof fieldName === "string") {
          fieldErrors[fieldName] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return; // Stop execution if validation fails
    }

    // If validation passes
    setIsLoading(true);
    setEmail(formData.email)
    try {
      // Replace this with your actual OTP / signup request
      const response = await sendOtp.mutateAsync(formData.email);
      console.log(response, 'sendotp')
      if (response?.message === "OTP sent") {
        setShowOTPModal(true);
      } else if (response?.message === "Email already registered") {
        setErrors({ email: "Email already exists" });
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error: any) {
      if (error.response?.data?.message === "Email already exists") {
        setErrors({ email: "Email already exists" });
      } else {
        console.error("Signup error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (otp: string) => {
    try {
      // 1️⃣ Verify OTP first
      const otpResponse = await verifyOtp.mutateAsync({
        email: formData.email,
        otp,
      } as VerifyOtpPayload);

      if (!otpResponse.success) {
        toast({
          title: "Invalid OTP",
          description: "Please try again with the correct code.",
          variant: "destructive",
          icon: <AlertCircle className="text-red-500" />,
          duration: 3000,
        });
        return false;
      }

      setShowOTPModal(false);
      const cloudName = import.meta.env.VITE_CLOUD_NAME;
      const uploadPreset = import.meta.env.VITE_CLOUD_PRESET;

      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;


      // 2️⃣ Upload ID proof directly to Cloudinary
      const fileToUpload = formData.idProof;
      if (!fileToUpload) {
        toast({
          title: "Error",
          description: "Please select an ID Proof",
          variant: "destructive",
        });
        throw new Error("No file selected");
      }

      const cloudFormData = new FormData();
      cloudFormData.append("file", fileToUpload);
      cloudFormData.append("upload_preset", uploadPreset);

      const cloudinaryResponse = await fetch(cloudinaryUrl, {
        method: "POST",
        body: cloudFormData,
      });


      if (!cloudinaryResponse.ok) {
        throw new Error("Failed to upload file to Cloudinary");
      }

      const uploadResult = await cloudinaryResponse.json();
      const documentUrl = new URL(uploadResult.secure_url).pathname.split("/image/upload/")[1];


      // 3️⃣ Prepare vendor signup payload
      const vendorPayload: IVendorData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        idProof: documentUrl,
        role: "vendor",
      };

      // 4️⃣ Call vendor signup API
      const accountResponse = await createAccount.mutateAsync(vendorPayload);

      console.log("Vendor account created:", accountResponse);

      // ✅ Show success toast
      toast({
        title: "Vendor account created successfully!",
        description: "You can now log in to your vendor dashboard.",
        icon: <CheckCircle2 className="text-green-500" />,
        duration: 3000,
      });

      navigate("/vendorLogin"); // redirect to vendor login page
      return true;

    } catch (error: any) {
      console.error(error);
      toast({
        title: "Something went wrong. Please try again.",
        description: error?.message || "Unknown error",
        variant: "destructive",
        duration: 3000,
      });
      return false;
    }
  };


  // ✅ Handle resend OTP for vendor
  const handleResendOTP = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Email is missing. Please try signing up again.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await resendOtp.mutateAsync(email);

      if (response?.message === "OTP sent") {
        setShowOTPModal(true);
        toast({
          title: "OTP Sent",
          description: "Check your email for the new OTP.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resend OTP.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };


  // Inline styles matching login design
  const mainStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, rgba(217, 117, 91, 0.05), rgba(235, 90, 130, 0.05), rgba(255, 148, 112, 0.1))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    paddingTop: '40px',
    paddingBottom: '40px',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  };

  const decorativeElements: { style: React.CSSProperties }[] = [
    {
      style: {
        position: 'absolute',
        top: '80px',
        left: '80px',
        width: '128px',
        height: '128px',
        background: 'linear-gradient(135deg, rgba(217, 117, 91, 0.3), rgba(235, 90, 130, 0.3))',
        borderRadius: '50%',
        filter: 'blur(32px)'
      }
    },
    {
      style: {
        position: 'absolute',
        bottom: '80px',
        right: '80px',
        width: '160px',
        height: '160px',
        background: 'linear-gradient(135deg, rgba(235, 90, 130, 0.3), rgba(217, 117, 91, 0.3))',
        borderRadius: '50%',
        filter: 'blur(32px)'
      }
    },
    {
      style: {
        position: 'absolute',
        top: '50%',
        left: '25%',
        width: '96px',
        height: '96px',
        background: 'linear-gradient(135deg, rgba(217, 117, 91, 0.2), rgba(235, 90, 130, 0.2))',
        borderRadius: '50%',
        filter: 'blur(24px)'
      }
    }
  ];

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 10,
    width: '100%',
    maxWidth: '600px',
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    padding: '32px'
  };

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '24px'
  };

  const iconContainerStyle: React.CSSProperties = {
    margin: '0 auto 16px',
    width: '48px',
    height: '48px',
    background: 'linear-gradient(135deg, #d9755b, #eb5a82)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 10px 15px -3px rgba(217, 117, 91, 0.3)'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #d9755b, #eb5a82)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '8px'
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#64748b'
  };

  const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px'
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '4px',
    color: '#0f172a'
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    border: '1px solid #e2e8f0',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '10px 12px',
    fontSize: '16px',
    color: '#0f172a',
    outline: 'none',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box'
  };

  const passwordContainerStyle: React.CSSProperties = {
    position: 'relative'
  };

  const passwordInputStyle: React.CSSProperties = {
    ...inputStyle,
    paddingRight: '40px'
  };

  const passwordToggleStyle: React.CSSProperties = {
    position: 'absolute',
    right: '12px',
    top: '36px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#64748b',
    padding: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'color 0.2s ease'
  };

  const fileInputContainerStyle: React.CSSProperties = {
    position: 'relative',
    border: '2px dashed #e2e8f0',
    borderRadius: '8px',
    padding: '16px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: '#f8fafc'
  };

  const submitButtonStyle: React.CSSProperties = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    background: isLoading ? 'rgba(217, 117, 91, 0.5)' : 'linear-gradient(135deg, #d9755b, #eb5a82)',
    color: 'white',
    padding: '10px 16px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '600',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(217, 117, 91, 0.3)',
    marginTop: '8px'
  };

  const errorStyle: React.CSSProperties = {
    color: '#ef4444',
    fontSize: '12px',
    marginTop: '4px'
  };

  const linkContainerStyle: React.CSSProperties = {
    marginTop: '24px',
    textAlign: 'center'
  };

  const linkTextStyle: React.CSSProperties = {
    color: '#64748b',
    fontSize: '14px'
  };

  const linkStyle: React.CSSProperties = {
    color: '#d9755b',
    fontWeight: '500',
    textDecoration: 'none',
    transition: 'color 0.2s ease'
  };

  const footerStyle: React.CSSProperties = {
    marginTop: '24px',
    textAlign: 'center'
  };

  const footerTextStyle: React.CSSProperties = {
    fontSize: '12px',
    color: '#64748b'
  };

  const getInputStyleWithError = (fieldName: string) => ({
    ...inputStyle,
    borderColor: errors[fieldName] ? '#ef4444' : '#e2e8f0'
  });

  const getPasswordInputStyleWithError = (fieldName: string) => ({
    ...passwordInputStyle,
    borderColor: errors[fieldName] ? '#ef4444' : '#e2e8f0'
  });

  return (
    <main style={mainStyle}>
      {/* Decorative background elements */}
      {decorativeElements.map((element, index) => (
        <div key={index} style={element.style} />
      ))}

      {/* Signup Card */}
      <div style={containerStyle}>
        <div style={headerStyle}>
          <div style={iconContainerStyle}>
            <Calendar size={24} color="white" />
          </div>
          <h1 style={titleStyle}>CRAVE EVENTS</h1>
          <p style={subtitleStyle}>Create your vendor account</p>
        </div>

        <form onSubmit={handleSubmit} style={formStyle}>
          {/* First & Last Name */}
          <div style={gridStyle}>
            <div>
              <label style={labelStyle}>First Name</label>
              <input
                type="text"
                placeholder="John"
                value={formData.firstName}
                onChange={handleInputChange("firstName")}
                style={getInputStyleWithError("firstName")}
              />
              {errors.firstName && <p style={errorStyle}>{errors.firstName}</p>}
            </div>
            <div>
              <label style={labelStyle}>Last Name</label>
              <input
                type="text"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleInputChange("lastName")}
                style={getInputStyleWithError("lastName")}
              />
              {errors.lastName && <p style={errorStyle}>{errors.lastName}</p>}
            </div>
          </div>

          {/* Email */}
          <div>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              placeholder="vendor@example.com"
              value={formData.email}
              onChange={handleInputChange("email")}
              style={getInputStyleWithError("email")}
            />
            {errors.email && <p style={errorStyle}>{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label style={labelStyle}>Phone Number</label>
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={handleInputChange("phone")}
              style={getInputStyleWithError("phone")}
            />
            {errors.phone && <p style={errorStyle}>{errors.phone}</p>}
          </div>

          {/* ID Proof Upload */}
          <div>
            <label style={labelStyle}>ID Proof Upload</label>
            <div
              style={fileInputContainerStyle}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = '#d9755b';
                (e.currentTarget as HTMLDivElement).style.backgroundColor = 'rgba(217, 117, 91, 0.05)';
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = '#e2e8f0';
                (e.currentTarget as HTMLDivElement).style.backgroundColor = '#f8fafc';
              }}
            >
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  top: '0',
                  left: '0',
                  opacity: '0',
                  cursor: 'pointer'
                }}
              />
              <Upload size={32} style={{ margin: '0 auto 8px', color: '#d9755b' }} />
              <p style={{ fontSize: '14px', color: '#0f172a', fontWeight: '500' }}>
                {formData.idProof ? formData.idProof.name : 'Click to upload ID proof'}
              </p>
              <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                Government-issued ID (max 5MB, PDF or image)
              </p>
            </div>
          </div>

          {/* Password */}
          <div style={passwordContainerStyle}>
            <label style={labelStyle}>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange("password")}
              style={getPasswordInputStyleWithError("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={passwordToggleStyle}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#0f172a";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#64748b";
              }}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
            {errors.password && <p style={errorStyle}>{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div style={passwordContainerStyle}>
            <label style={labelStyle}>Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleInputChange("confirmPassword")}
              style={getPasswordInputStyleWithError("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={passwordToggleStyle}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = '#0f172a';
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = '#64748b';
              }}
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
            {errors.confirmPassword && <p style={errorStyle}>{errors.confirmPassword}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            style={submitButtonStyle}
            disabled={isLoading}
            onMouseOver={(e) => {
              if (!isLoading) {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 20px rgba(217, 117, 91, 0.4)';
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
              }
            }}
            onMouseOut={(e) => {
              if (!isLoading) {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 12px rgba(217, 117, 91, 0.3)';
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
              }
            }}
          >
            {isLoading ? (
              <>
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid white',
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                Creating Account...
              </>
            ) : (
              <>
                <Calendar size={16} />
                Create Account
              </>
            )}
          </button>
        </form>

        <div style={linkContainerStyle}>
          <p style={linkTextStyle}>
            Already have an account?{" "}
            <a
              href="/login"
              style={linkStyle}
              onMouseOver={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.color = '#eb5a82';
              }}
              onMouseOut={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.color = '#d9755b';
              }}
            >
              Login here
            </a>
          </p>
        </div>

        <div style={footerStyle}>
          <p style={footerTextStyle}>
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>

      {/* OTP Modal */}
      <OTPVerificationModal
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        email={formData.email}
        onVerifyOTP={handleVerifyOTP}
        onResendOTP={handleResendOTP}
      />

      {/* CSS Animation for spinner */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </main>
  );
};

export default Signup;