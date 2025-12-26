"use client";

import { useState, useRef } from "react";
import { User, Mail, Lock, Phone, ArrowRight, CheckCircle, Smartphone } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function SignupPage() {
    const router = useRouter();
    const [step, setStep] = useState<"details" | "otp" | "success">("details");
    const [loading, setLoading] = useState(false);

    // Form States
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    });

    // OTP States
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [generatedOtp, setGeneratedOtp] = useState("");
    const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleInitialSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Generate a random 4-digit OTP
        const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
        setGeneratedOtp(newOtp);

        try {
            const response = await fetch('/api/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email, otp: newOtp }),
            });

            if (response.ok) {
                setStep("otp");
            } else {
                const data = await response.json();
                alert(data.error || "Failed to send OTP. Please check your email configuration.");
            }
        } catch (error) {
            console.error("Signup Error:", error);
            alert("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) return; // Only allow 1 digit
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto move to next input
        if (value && index < 3) {
            otpRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
        // Handle backspace
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    const verifyOtp = () => {
        setLoading(true);
        // Verify against generated OTP
        setTimeout(() => {
            if (otp.join("") === generatedOtp) {
                setStep("success");
                setTimeout(() => {
                    router.push("/");
                }, 2000);
            } else {
                alert(`Invalid OTP! Please check your email.`);
                setLoading(false);
            }
        }, 1500);
    };

    const handleGoogleSignup = () => {
        setLoading(true);
        // Simulate Google Auth
        setTimeout(() => {
            setLoading(false);
            setStep("success");
            setTimeout(() => {
                router.push("/");
            }, 2000);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden p-4">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-900/40 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/40 blur-[120px] rounded-full" />
            </div>

            <div className="w-full max-w-md relative z-10">
                <AnimatePresence mode="wait">
                    {/* STEP 1: USER DETAILS */}
                    {step === "details" && (
                        <motion.div
                            key="details"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="bg-white/10 border border-white/20 rounded-3xl p-8 backdrop-blur-xl shadow-2xl"
                        >
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
                                <p className="text-gray-400 text-sm">Join FlyTogether for exclusive deals.</p>
                            </div>

                            <form onSubmit={handleInitialSubmit} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-gray-400 ml-1">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 transition-all font-medium"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-gray-400 ml-1">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            name="email"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 transition-all font-medium"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-gray-400 ml-1">Phone Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            name="phone"
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 transition-all font-medium"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-gray-400 ml-1">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            name="password"
                                            type="password"
                                            required
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 transition-all font-medium"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-white text-black font-bold py-3.5 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 mt-4 disabled:opacity-70"
                                >
                                    {loading ? "Sending OTP..." : "Continue"} <ArrowRight className="w-4 h-4" />
                                </button>

                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-white/10"></div>
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-[#0c0c0c] px-2 text-gray-500 font-medium">Or continue with</span>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleGoogleSignup}
                                    className="w-full bg-white/5 border border-white/10 text-white font-medium py-3 rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                                        />
                                    </svg>
                                    Google
                                </button>

                                <div className="text-center mt-6">
                                    <p className="text-sm text-gray-500">
                                        Already have an account?{" "}
                                        <Link href="/login" className="text-white font-medium hover:underline">
                                            Log In
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </motion.div>
                    )}

                    {/* STEP 2: OTP VERIFICATION */}
                    {step === "otp" && (
                        <motion.div
                            key="otp"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="bg-white/10 border border-white/20 rounded-3xl p-8 backdrop-blur-xl shadow-2xl text-center"
                        >
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center">
                                    <Smartphone className="w-8 h-8 text-indigo-400" />
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-white mb-2">Verification Code</h2>
                            <p className="text-gray-400 text-sm mb-8">
                                Please enter the 4-digit code sent to<br />
                                <span className="text-white font-mono">{formData.phone}</span>
                            </p>

                            <div className="flex justify-center gap-4 mb-8">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => { otpRefs.current[index] = el }}
                                        type="text"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                        className="w-14 h-16 bg-black/40 border border-white/20 rounded-xl text-center text-2xl font-bold text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono"
                                    />
                                ))}
                            </div>

                            <button
                                onClick={verifyOtp}
                                disabled={otp.join("").length !== 4 || loading}
                                className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Verifying..." : "Verify & Create Account"}
                            </button>

                            <div className="mt-6">
                                <button className="text-sm text-gray-500 hover:text-white transition-colors">
                                    Didn't receive code? Resend
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3: SUCCESS */}
                    {step === "success" && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-green-500/10 border border-green-500/20 rounded-3xl p-8 backdrop-blur-xl shadow-2xl text-center"
                        >
                            <div className="flex justify-center mb-6">
                                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-10 h-10 text-green-500" />
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Welcome Aboard!</h2>
                            <p className="text-gray-400">Account verified successfully.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
