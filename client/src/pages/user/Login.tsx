import * as React from "react";
import { useState } from "react";
import { Eye, EyeOff, Calendar } from "lucide-react";
import { NavLink } from "react-router-dom";

interface LoginFormData {
    email: string;
    password: string;
}

interface FormErrors {
    [key: string]: string;
}



const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
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
        if (!validateForm()) return;

        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);

        console.log("Login submitted:", formData);
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/10 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl" />
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-2xl" />
            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-xl" />

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md bg-card rounded-2xl shadow-2xl p-8">
                <div className="text-center mb-6">
                    <div className="mx-auto w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-4 shadow-lg">
                        <Calendar className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h1 className="text-2xl font-bold text-card-foreground">
                        Welcome Back
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Sign in to your account to continue planning amazing events
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-card-foreground">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleInputChange("email")}
                            className="w-full border border-input bg-background rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                        {errors.email && (
                            <p className="text-xs text-destructive mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium mb-1 text-card-foreground">
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleInputChange("password")}
                            className="w-full border border-input bg-background rounded-lg px-3 py-2 pr-10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {showPassword ? (
                                <EyeOff className="w-4 h-4" />
                            ) : (
                                <Eye className="w-4 h-4" />
                            )}
                        </button>
                        {errors.password && (
                            <p className="text-xs text-destructive mt-1">{errors.password}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                                Signing In...
                            </>
                        ) : (
                            <>
                                <Calendar className="w-4 h-4" />
                                Sign In
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <button className="text-sm text-primary hover:text-primary/80 transition-colors">
                        Forgot your password?
                    </button>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-muted-foreground">
                        New to craveEvents?{" "}
                        <NavLink
                            to="/userSignup"
                            className="text-primary hover:text-primary/80 font-medium transition-colors"
                        >
                            Signup here
                        </NavLink>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default Login;