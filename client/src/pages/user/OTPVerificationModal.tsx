import React, { useState, useEffect, useRef } from "react";
import { X, Mail, Clock } from "lucide-react";

interface OTPVerificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    email: string;
    onVerifyOTP: (otp: string) => Promise<boolean>;
    onResendOTP: () => Promise<void>;
}

const OTPVerificationModal: React.FC<OTPVerificationModalProps> = ({
    isOpen,
    onClose,
    email,
    onVerifyOTP,
    onResendOTP,
}) => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [timeLeft, setTimeLeft] = useState(60);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [error, setError] = useState("");
    const [isExpired, setIsExpired] = useState(false);

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // countdown timer
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isOpen && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        setIsExpired(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isOpen, timeLeft]);

    // reset when modal opens
    useEffect(() => {
        if (isOpen) {
            setOtp(["", "", "", "", "", ""]);
            setTimeLeft(60);
            setIsExpired(false);
            setError("");
            setTimeout(() => {
                inputRefs.current[0]?.focus();
            }, 100);
        }
    }, [isOpen]);

    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);
        setError("");

        if (value && index < 5) inputRefs.current[index + 1]?.focus();

        if (newOtp.every((digit) => digit) && !isExpired) {
            handleVerify(newOtp.join(""));
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = async (otpValue?: string) => {
        const otpToVerify = otpValue || otp.join("");
        if (otpToVerify.length !== 6) {
            setError("Please enter all 6 digits");
            return;
        }
        if (isExpired) {
            setError("OTP has expired. Please request a new one.");
            return;
        }

        setIsVerifying(true);
        try {
            const isValid = await onVerifyOTP(otpToVerify);
            if (!isValid) {
                setError("Invalid OTP. Please try again.");
                setOtp(["", "", "", "", "", ""]);
                inputRefs.current[0]?.focus();
            }
        } catch {
            setError("Verification failed. Please try again.");
        } finally {
            setIsVerifying(false);
        }
    };

    const handleResend = async () => {
        setIsResending(true);
        try {
            await onResendOTP();
            setTimeLeft(30);
            setIsExpired(false);
            setOtp(["", "", "", "", "", ""]);
            inputRefs.current[0]?.focus();
        } catch {
            setError("Failed to resend OTP. Please try again.");
        } finally {
            setIsResending(false);
        }
    };

    const formatTime = (seconds: number) =>
        `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative border">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="text-center mb-6">
                    <div className="mx-auto w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                        <Mail className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Verify Your Email</h2>
                    <p className="text-sm text-gray-600">We’ve sent a 6-digit code to</p>
                    <p className="text-sm font-medium text-gray-900">{email}</p>
                </div>

                {/* OTP inputs */}
                <div className="flex gap-2 justify-center mb-4">
                    {otp.map((digit, index) => (
                        <input
                            key={index} ref={(el) => {
                                inputRefs.current[index] = el
                            }}
                            type="text"
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-12 h-12 text-center text-lg font-bold border rounded-lg"
                            maxLength={1}
                            disabled={isVerifying || isResending}
                        />
                    ))}
                </div>

                {/* Timer */}
                <div className="flex items-center justify-center gap-2 text-sm mb-2">
                    <Clock className="w-4 h-4" />
                    <span className={isExpired ? "text-red-500" : "text-gray-600"}>
                        {isExpired ? "Expired" : formatTime(timeLeft)}
                    </span>
                </div>

                {/* Error */}
                {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                {/* Verify Button */}
                <button
                    onClick={() => handleVerify()}
                    disabled={otp.some((d) => !d) || isVerifying || isExpired}
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                >
                    {isVerifying ? "Verifying..." : "Verify OTP"}
                </button>

                {/* Resend */}
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">Didn’t receive the code?</p>
                    <button
                        onClick={handleResend}
                        disabled={timeLeft > 0 || isResending}
                        className="text-blue-500 hover:text-blue-600 font-medium"
                    >
                        {isResending ? "Sending..." : "Resend OTP"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OTPVerificationModal;
