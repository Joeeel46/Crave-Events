import * as React from "react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Eye, EyeOff, Calendar } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useClientLoginMutation } from "@/hooks/clientCustomHooks";
import type { ILoginData, LoginFormData, FormErrors } from "@/types/User";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { setClient } from "@/store/slice/client.slice";
import type { CredentialResponse } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { useClientGoogleLoginMutation } from "@/hooks/clientCustomHooks";
import { motion } from "framer-motion";
import { z } from "zod";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Login = () => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const verifyLogin = useClientLoginMutation();
  const navigate = useNavigate();
  const googleLoginMutation = useClientGoogleLoginMutation()
  const { toast } = useToast();

  const formSchema = z.object({
    email: z
      .string()
      .nonempty("Email is required")
      .email("Invalid email format"),
    password: z
      .string()
      .nonempty("Password is required")
      .min(8, "Password must be at least 8 characters long"),
  });

  type FormData = z.infer<typeof formSchema>;

  const validateForm = (formData: FormData): boolean => {
    const result = formSchema.safeParse(formData);

    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path.length > 0) {
          newErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleInputChange = (field: keyof LoginFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateForm(formData);
    if (!isValid) return;

    setIsLoading(true);

    try {
      const payload: ILoginData = {
        email: formData.email,
        password: formData.password,
        role: "client",
      };

      const response = await verifyLogin.mutateAsync(payload);
      console.log(response);

      if (response?.status === 200) {

        if (response.data?.user) {
          dispatch(setClient(response.data.user));
          console.log('User data saved to Redux');
        }

        navigate("/");
      }
    } catch (err) {
      console.error("Login failed:", err);
    } finally {
      setIsLoading(false);
    }

    console.log("Login submitted:", formData);
  };

  const handleGoogleLogin = (credentialResponse: CredentialResponse) => {
    console.log("hello", credentialResponse);

    if (!credentialResponse.credential) {
      toast({ title: "Google login failed", description: "No credential received." });
      return;
    }


    googleLoginMutation.mutate(
      
      {
        credential: credentialResponse.credential,
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        role: "client"
      }, {
      onSuccess: (data) => {
        toast({
          title: "Success!",
          description: "Login successful!",
          duration: 3000,
        });
        dispatch(setClient(data.user));
        navigate("/");
      },
      onError: (error) => {
        console.log('failed')
        toast({
          title: "error!",
          description: error.message || "Error in Login",
          duration: 3000,
        });
      }
    }
    )
  };

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, rgba(59, 130, 246, 0.05), rgba(251, 146, 60, 0.05), rgba(168, 85, 247, 0.1))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative background elements */}
      <div style={{
        position: 'absolute',
        top: '5rem',
        left: '5rem',
        width: '8rem',
        height: '8rem',
        background: 'linear-gradient(to bottom right, rgba(59, 130, 246, 0.2), rgba(251, 146, 60, 0.2))',
        borderRadius: '9999px',
        filter: 'blur(40px)'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '5rem',
        right: '5rem',
        width: '10rem',
        height: '10rem',
        background: 'linear-gradient(to bottom right, rgba(251, 146, 60, 0.2), rgba(59, 130, 246, 0.2))',
        borderRadius: '9999px',
        filter: 'blur(40px)'
      }} />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '25%',
        width: '6rem',
        height: '6rem',
        background: 'linear-gradient(to bottom right, rgba(59, 130, 246, 0.1), rgba(251, 146, 60, 0.1))',
        borderRadius: '9999px',
        filter: 'blur(24px)'
      }} />

      {/* Login Card */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        maxWidth: '28rem',
        backgroundColor: 'white',
        borderRadius: '1rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        padding: '2rem'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            margin: '0 auto',
            width: '3rem',
            height: '3rem',
            background: 'linear-gradient(to bottom right, #3b82f6, #fb923c)',
            borderRadius: '9999px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          }}>
            <Calendar style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
          </div>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#1f2937'
          }}>
            Welcome Back
          </h1>
          <p style={{
            fontSize: '0.875rem',
            color: '#6b7280'
          }}>
            Sign in to your account to continue planning amazing events
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '0.25rem',
              color: '#1f2937'
            }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleInputChange("email")}
              style={{
                width: '100%',
                border: '1px solid #d1d5db',
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                padding: '0.5rem 0.75rem',
                color: '#1f2937',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            />
            {errors.email && (
              <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem' }}>
                {errors.email}
              </p>
            )}
          </div>

          <div style={{ position: 'relative' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '0.25rem',
              color: '#1f2937'
            }}>
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange("password")}
              style={{
                width: '100%',
                border: '1px solid #d1d5db',
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                padding: '0.5rem 0.75rem',
                paddingRight: '2.5rem',
                color: '#1f2937',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '0.75rem',
                top: '2.25rem',
                color: '#6b7280',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#1f2937'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
            >
              {showPassword ? (
                <EyeOff style={{ width: '1rem', height: '1rem' }} />
              ) : (
                <Eye style={{ width: '1rem', height: '1rem' }} />
              )}
            </button>
            {errors.password && (
              <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem' }}>
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              backgroundColor: isLoading ? 'rgba(59, 130, 246, 0.5)' : '#3b82f6',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#2563eb')}
            onMouseLeave={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#3b82f6')}
          >
            {isLoading ? (
              <>
                <div style={{
                  width: '1rem',
                  height: '1rem',
                  border: '2px solid white',
                  borderTopColor: 'transparent',
                  borderRadius: '9999px',
                  animation: 'spin 1s linear infinite'
                }} />
                Signing In...
              </>
            ) : (
              <>
                <Calendar style={{ width: '1rem', height: '1rem' }} />
                Sign In
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            flex: 1,
            height: '1px',
            backgroundColor: '#e5e7eb'
          }} />
          <span style={{
            padding: '0 0.75rem',
            fontSize: '0.875rem',
            color: '#6b7280'
          }}>
            OR
          </span>
          <div style={{
            flex: 1,
            height: '1px',
            backgroundColor: '#e5e7eb'
          }} />
        </div>

        {/* Google Login Button */}
        <motion.div variants={itemVariants}>
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => console.log("Login failed")}
          />
        </motion.div>

        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <button
            style={{
              fontSize: '0.875rem',
              color: '#3b82f6',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#2563eb'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#3b82f6'}
          >
            Forgot your password?
          </button>
        </div>

        {/* Vendor Login Link */}
        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          backgroundColor: '#f9fafb',
          borderRadius: '0.5rem',
          textAlign: 'center'
        }}>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
            Are you a Vendor?{" "}
            <NavLink
              to="/vendorLogin"
              style={{
                color: '#fb923c',
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#f97316'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#fb923c'}
            >
              Login as Vendor
            </NavLink>
          </p>
        </div>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <p style={{ color: '#6b7280' }}>
            New to craveEvents?{" "}
            <NavLink
              to="/userSignup"
              style={{
                color: '#3b82f6',
                fontWeight: '500',
                textDecoration: 'none',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#2563eb'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#3b82f6'}
            >
              Signup here
            </NavLink>
          </p>
        </div>
      </div>

      <style>
        {`
                    @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                `}
      </style>
    </main>
  );
};

export default Login;