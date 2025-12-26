"use client";

import { useState, useRef, useCallback } from "react";
import { Lock, Mail, ArrowRight, AlertCircle, ScanFace, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Webcam from "react-webcam";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showFaceID, setShowFaceID] = useState(false);
    const [scanStatus, setScanStatus] = useState<"scanning" | "success" | "failed">("scanning");

    const webcamRef = useRef<Webcam>(null);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        setTimeout(() => {
            if (email === "flytogether@gmail.com" && password === "fernando807") {
                router.push("/admin");
            } else {
                setError("Invalid credentials. Try flytogether@gmail.com / fernando807");
                setLoading(false);
            }
        }, 1500);
    };

    const startFaceID = () => {
        setShowFaceID(true);
        setScanStatus("scanning");

        // Simulate scanning process
        setTimeout(() => {
            setScanStatus("success");
            setTimeout(() => {
                router.push("/admin");
            }, 1000);
        }, 3500);
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/40 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-cyan-900/40 blur-[120px] rounded-full" />
            </div>

            <div className="w-full max-w-md p-8 relative z-10">
                <div className="text-center mb-10">
                    <div className="inline-block p-4 rounded-3xl bg-white/5 border border-white/10 mb-6 backdrop-blur-xl shadow-2xl">
                        <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
                    <p className="text-gray-400">Secure access for authorized personnel only.</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-xl">
                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" />
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-1 ml-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-medium"
                                        placeholder="name@company.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-1 ml-1">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-medium"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-white text-black font-bold py-3.5 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                ) : (
                                    <>Sign In <ArrowRight className="w-4 h-4" /></>
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={startFaceID}
                                className="w-full bg-indigo-500/10 text-indigo-400 font-bold py-3.5 rounded-xl hover:bg-indigo-500/20 border border-indigo-500/20 transition-colors flex items-center justify-center gap-2"
                            >
                                <ScanFace className="w-4 h-4" />
                                Login with Face ID
                            </button>
                        </div>
                    </form>
                </div>

                <p className="text-center text-xs text-gray-600 mt-8">
                    Protected by FlySure™ Security. IP Logged.
                </p>
            </div>

            {/* Face ID Modal */}
            <AnimatePresence>
                {showFaceID && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
                    >
                        <div className="relative w-full max-w-md bg-zinc-900 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                            <button
                                onClick={() => setShowFaceID(false)}
                                className="absolute top-4 right-4 z-20 p-2 bg-black/50 rounded-full text-white hover:bg-white/20 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="relative aspect-[4/5] bg-black">
                                <Webcam
                                    audio={false}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    className="w-full h-full object-cover opacity-80"
                                />

                                {/* Scanning Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="relative w-64 h-64 border-2 border-dashed border-indigo-500/30 rounded-full">
                                        {/* Scanning Line */}
                                        {scanStatus === "scanning" && (
                                            <motion.div
                                                animate={{ top: ["0%", "100%", "0%"] }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                className="absolute left-0 right-0 h-1 bg-indigo-500/80 shadow-[0_0_15px_rgba(99,102,241,1)]"
                                            />
                                        )}

                                        {/* Success State */}
                                        {scanStatus === "success" && (
                                            <motion.div
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                className="absolute inset-0 flex items-center justify-center bg-green-500/20 rounded-full backdrop-blur-sm"
                                            >
                                                <Lock className="w-16 h-16 text-green-500" />
                                            </motion.div>
                                        )}
                                    </div>
                                </div>

                                {/* Tech HUD Elements */}
                                <div className="absolute top-8 left-8 text-xs font-mono text-indigo-400">
                                    SCANNING_PROTOCOL_V2
                                </div>
                                <div className="absolute bottom-8 right-8 text-xs font-mono text-indigo-400">
                                    SECURE_CONN_ESTABLISHED
                                </div>
                            </div>

                            <div className="p-6 bg-zinc-900 border-t border-white/5 text-center">
                                <h3 className="text-white font-bold text-lg mb-1">
                                    {scanStatus === "scanning" ? "Verifying Identity..." : "Identity Confirmed"}
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    {scanStatus === "scanning" ? "Please look directly at the camera" : "Redirecting to dashboard..."}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
