import React, { useState } from "react";
import { Eye, EyeOff, Calendar } from "lucide-react";
import { toast } from "sonner";
import type { ILoginData, LoginFormData } from "@/types/User";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useVendorLoginMutation } from "@/hooks/vendorCustomHooks";
import { useAppDispatch } from "@/store/hooks";
import { setVendor } from "@/store/slice/vendor.slice";

interface Vendor {
  vendorId: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface FormErrors {
  [key: string]: string;
}

const Login: React.FC = () => {
  const dispatch = useAppDispatch()
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const verifyLogin = useVendorLoginMutation();
  const navigate = useNavigate();

  const formSchema = z.object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email format"),
    password: z
      .string()
      .min(1, "Password is required")
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
        role: "vendor",
      };

      const response = await verifyLogin.mutateAsync(payload);
      console.log(response);

      if (response?.success && response.user) {

        if (response.user) {
          const vendorData: Vendor = {
            vendorId: response.user.userId,  // map userId -> vendorId
            name: response.user.name,
            email: response.user.email,
            role: response.user.role,
            status: response.user.status,
          };
          dispatch(setVendor(vendorData));
          console.log('User data saved to Redux');
        }

        navigate("/vendorHome");
      }
    } catch (err) {
      console.error("Login failed:", err);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  // Inline styles
  const mainStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, rgba(217, 117, 91, 0.05), rgba(235, 90, 130, 0.05), rgba(255, 148, 112, 0.1))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
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
    maxWidth: '448px',
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
    color: '#64748b',
    marginBottom: '8px'
  };

  const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
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

  const forgotPasswordStyle: React.CSSProperties = {
    textAlign: 'right',
    marginTop: '4px'
  };

  const forgotPasswordLinkStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#d9755b',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'color 0.2s ease'
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
    boxShadow: '0 4px 12px rgba(217, 117, 91, 0.3)'
  };

  const dividerContainerStyle: React.CSSProperties = {
    position: 'relative',
    marginTop: '24px',
    marginBottom: '24px'
  };

  const dividerLineStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '0',
    right: '0',
    height: '1px',
    backgroundColor: '#e2e8f0'
  };

  const dividerTextStyle: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center'
  };

  const dividerTextSpanStyle: React.CSSProperties = {
    backgroundColor: 'white',
    padding: '0 12px',
    fontSize: '12px',
    color: '#64748b',
    textTransform: 'uppercase'
  };

  const signupButtonStyle: React.CSSProperties = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    backgroundColor: 'white',
    color: '#d9755b',
    padding: '10px 16px',
    borderRadius: '8px',
    border: '2px solid rgba(217, 117, 91, 0.3)',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textDecoration: 'none'
  };

  const footerStyle: React.CSSProperties = {
    marginTop: '24px',
    textAlign: 'center'
  };

  const footerTextStyle: React.CSSProperties = {
    fontSize: '12px',
    color: '#64748b'
  };

  const clientLinkContainerStyle: React.CSSProperties = {
    marginTop: '16px',
    padding: '16px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    textAlign: 'center'
  };

  const clientLinkTextStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#64748b'
  };

  const clientLinkStyle: React.CSSProperties = {
    color: '#3b82f6',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'color 0.2s ease'
  };

  const errorStyle: React.CSSProperties = {
    color: '#ef4444',
    fontSize: '12px',
    marginTop: '4px'
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

      {/* Login Card */}
      <div style={containerStyle}>
        <div style={headerStyle}>
          <div style={iconContainerStyle}>
            <Calendar size={24} color="white" />
          </div>
          <h1 style={titleStyle}>CRAVE EVENTS</h1>
          <p style={subtitleStyle}>Vendor Portal - Welcome back!</p>
        </div>

        <form onSubmit={handleSubmit} style={formStyle}>
          {/* Email */}
          <div>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              placeholder="vendor@example.com"
              value={formData.email}
              onChange={handleInputChange("email")}
              style={getInputStyleWithError("email")}
              onFocus={(e) => {
                e.target.style.borderColor = '#d9755b';
                e.target.style.boxShadow = '0 0 0 2px rgba(217, 117, 91, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.email ? '#ef4444' : '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
            />
            {errors.email && <p style={errorStyle}>{errors.email}</p>}
          </div>

          {/* Password */}
          <div style={passwordContainerStyle}>
            <label style={labelStyle}>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange("password")}
              style={getPasswordInputStyleWithError("password")}
              onFocus={(e) => {
                e.target.style.borderColor = '#d9755b';
                e.target.style.boxShadow = '0 0 0 2px rgba(217, 117, 91, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.password ? '#ef4444' : '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
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

          {/* Forgot Password */}
          <div style={forgotPasswordStyle}>
            <button
              type="button"
              onClick={() => toast.info("Password reset link sent to your email")}
              style={forgotPasswordLinkStyle}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#eb5a82";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#d9755b";
              }}
            >
              Forgot password?
            </button>
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
                Logging in...
              </>
            ) : (
              <>
                <Calendar size={16} />
                Login
              </>
            )}
          </button>

          {/* Divider */}
          <div style={dividerContainerStyle}>
            <div style={dividerLineStyle} />
            <div style={dividerTextStyle}>
              <span style={dividerTextSpanStyle}>New vendor?</span>
            </div>
          </div>

          {/* Signup Link */}
          <a
            href="/vendorSignup"
            style={signupButtonStyle}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(217, 117, 91, 0.05)';
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(217, 117, 91, 0.5)';
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'white';
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(217, 117, 91, 0.3)';
            }}
          >
            Create vendor account
          </a>
        </form>

        {/* Client Login Link */}
        <div style={clientLinkContainerStyle}>
          <p style={clientLinkTextStyle}>
            Are you a Client?{" "}
            <a
              href="/userLogin"
              style={clientLinkStyle}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#2563eb";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#3b82f6";
              }}
            >
              Login as Client
            </a>
          </p>
        </div>

        <div style={footerStyle}>
          <p style={footerTextStyle}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>

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

export default Login;