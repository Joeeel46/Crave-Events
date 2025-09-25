import * as React from "react";
import { useState } from "react";
import { Eye, EyeOff, Building2, Mail, Lock, User, Phone } from "lucide-react";
import { AuthCard, AuthCardHeader, AuthCardTitle, AuthCardDescription, AuthCardContent, AuthCardFooter } from "../../components/auth/AuthCard";
import { AuthInput } from "../../components/auth/AuthInput";
import { AuthButton } from "../../components/auth/AuthButton";

type AuthMode = "login" | "signup";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  companyName: string;
  contactName: string;
  phoneNumber: string;
}

interface FormErrors {
  [key: string]: string;
}

const VendorAuth = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    contactName: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (mode === "signup") {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }

      if (!formData.companyName) {
        newErrors.companyName = "Company name is required";
      }

      if (!formData.contactName) {
        newErrors.contactName = "Contact name is required";
      }

      if (!formData.phoneNumber) {
        newErrors.phoneNumber = "Phone number is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    
    // Here you would integrate with your authentication service
    console.log(`${mode} submitted:`, formData);
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    setErrors({});
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      companyName: "",
      contactName: "",
      phoneNumber: "",
    });
  };

  const isSignup = mode === "signup";

  return (
    <AuthCard>
      <AuthCardHeader>
        <div className="mx-auto w-12 h-12 bg-gradient-to-br from-primary to-primary-hover rounded-xl flex items-center justify-center mb-4">
          <Building2 className="w-6 h-6 text-primary-foreground" />
        </div>
        <AuthCardTitle>
          {isSignup ? "Create Vendor Account" : "Vendor Login"}
        </AuthCardTitle>
        <AuthCardDescription>
          {isSignup 
            ? "Join our marketplace and start selling your products" 
            : "Access your vendor dashboard and manage your business"
          }
        </AuthCardDescription>
      </AuthCardHeader>

      <AuthCardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <>
              <AuthInput
                label="Company Name"
                type="text"
                placeholder="Your company name"
                value={formData.companyName}
                onChange={handleInputChange("companyName")}
                error={errors.companyName}
              />
              
              <AuthInput
                label="Contact Name"
                type="text"
                placeholder="Your full name"
                value={formData.contactName}
                onChange={handleInputChange("contactName")}
                error={errors.contactName}
              />

              <AuthInput
                label="Phone Number"
                type="tel"
                placeholder="Your phone number"
                value={formData.phoneNumber}
                onChange={handleInputChange("phoneNumber")}
                error={errors.phoneNumber}
              />
            </>
          )}

          <AuthInput
            label="Email Address"
            type="email"
            placeholder="vendor@company.com"
            value={formData.email}
            onChange={handleInputChange("email")}
            error={errors.email}
          />

          <div className="relative">
            <AuthInput
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange("password")}
              error={errors.password}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {isSignup && (
            <div className="relative">
              <AuthInput
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange("confirmPassword")}
                error={errors.confirmPassword}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          )}

          <AuthButton type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                {isSignup ? "Creating Account..." : "Signing In..."}
              </>
            ) : (
              isSignup ? "Create Account" : "Sign In"
            )}
          </AuthButton>
        </form>
      </AuthCardContent>

      <AuthCardFooter>
        {isSignup ? (
          <p>
            Already have an account?{" "}
            <button
              type="button"
              onClick={toggleMode}
              className="text-primary hover:text-primary-hover font-medium transition-colors"
            >
              Sign in here
            </button>
          </p>
        ) : (
          <p>
            New vendor?{" "}
            <button
              type="button"
              onClick={toggleMode}
              className="text-primary hover:text-primary-hover font-medium transition-colors"
            >
              Create an account
            </button>
          </p>
        )}
      </AuthCardFooter>
    </AuthCard>
  );
};

export default VendorAuth;