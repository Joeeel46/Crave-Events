import React, { useState } from "react";
import { Eye, EyeOff, Calendar } from "lucide-react";
import { useClientSignupMutation } from "@/hooks/clientCustomHooks";
import OTPVerificationModal from "./OTPVerificationModal";
import { useCreateAccountMutation } from "@/hooks/clientCustomHooks";
type SignupFormData = {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
};

interface FormErrors {
    [key: string]: string;
}

interface OTPVerificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    email: string;
    onVerifyOTP: (otp: string) => Promise<boolean>;
    onResendOTP: () => Promise<void>;
}

const Signup: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showOTPModal, setShowOTPModal] = useState(false);

    const [formData, setFormData] = useState<SignupFormData>({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const sendOtp = useClientSignupMutation();
    const createAccount = useCreateAccountMutation();
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        if (!formData.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = "Please enter a valid email address";
        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 6)
            newErrors.password = "Password must be at least 6 characters";
        if (!formData.confirmPassword)
            newErrors.confirmPassword = "Please confirm your password";
        else if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = "Passwords do not match";
        if (!formData.firstName) newErrors.firstName = "First name is required";
        if (!formData.lastName) newErrors.lastName = "Last name is required";
        if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange =
        (field: keyof SignupFormData) =>
            (e: React.ChangeEvent<HTMLInputElement>) => {
                setFormData((prev) => ({ ...prev, [field]: e.target.value }));
                if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
            };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const response = await sendOtp.mutateAsync(formData);
            if (!response.userExists) {
                setShowOTPModal(true);
            } else {
                setErrors({ email: "Email already exists" });
            }
        } catch (error) {
            console.error("Signup error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // OTP handling
    const handleVerifyOTP = async (otp: string) => {
        const response = await createAccount.mutateAsync({ formdata: formData, otpString: otp });
        console.log(response);
        if (otp === "123456") {
            setShowOTPModal(false);
            alert("Account created successfully!");
            return true;
        }
        return false;
    };

    const handleResendOTP = async () => {
        await new Promise((res) => setTimeout(res, 1000));
        console.log("OTP resent");
    };

    // Inline styles matching login design
    const mainStyle: React.CSSProperties = {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05), rgba(236, 72, 153, 0.1))',
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
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))',
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
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))',
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
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
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
        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    };

    const titleStyle: React.CSSProperties = {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#0f172a',
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
        padding: '8px 12px',
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

    const submitButtonStyle: React.CSSProperties = {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        backgroundColor: isLoading ? 'rgba(59, 130, 246, 0.5)' : '#3b82f6',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '8px',
        border: 'none',
        fontSize: '16px',
        cursor: isLoading ? 'not-allowed' : 'pointer',
        transition: 'background-color 0.2s ease'
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
        color: '#3b82f6',
        fontWeight: '500',
        textDecoration: 'none',
        transition: 'color 0.2s ease'
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
        <>
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
                        <h1 style={titleStyle}>Create Account</h1>
                        <p style={subtitleStyle}>
                            Join craveEvents and start planning amazing events today
                        </p>
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

                        {/* Phone */}
                        <div>
                            <label style={labelStyle}>Phone Number</label>
                            <input
                                type="tel"
                                placeholder="+1 (555) 123-4567"
                                value={formData.phoneNumber}
                                onChange={handleInputChange("phoneNumber")}
                                style={getInputStyleWithError("phoneNumber")}
                            />
                            {errors.phoneNumber && <p style={errorStyle}>{errors.phoneNumber}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label style={labelStyle}>Email Address</label>
                            <input
                                type="email"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={handleInputChange("email")}
                                style={getInputStyleWithError("email")}
                            />
                            {errors.email && <p style={errorStyle}>{errors.email}</p>}
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
                                onMouseOver={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#0f172a' }}
                                onMouseOut={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#64748b' }}
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
                                    {
                                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(59, 130, 246, 0.9)';
                                    }
                                }
                            }}
                            onMouseOut={(e) => {
                                if (!isLoading) {
                                    {
                                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#3b82f6';
                                    }
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
                                onMouseOver={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                    e.currentTarget.style.color = 'rgba(59, 130, 246, 0.8)';
                                }}
                                onMouseOut={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                    e.currentTarget.style.color = '#3b82f6';
                                }}
                                href="/userLogin"
                            >
                                Sign in here
                            </a>

                        </p>
                    </div>
                </div>
            </main>

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
        </>
    );
};

export default Signup;