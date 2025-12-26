"use client";

import { CreditCard, Wallet, Smartphone, ShieldCheck } from "lucide-react";

export default function PaymentPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 pb-20 pt-24">
            <div className="container mx-auto px-4 max-w-2xl">
                <h1 className="text-3xl font-bold mb-8 text-center">Secure Payment</h1>

                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-xl border border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center justify-center gap-2 mb-8 text-green-600 bg-green-50 dark:bg-green-900/20 py-2 rounded-lg">
                        <ShieldCheck className="w-5 h-5" />
                        <span className="text-sm font-semibold">100% Safe & Secure Transaction</span>
                    </div>

                    <div className="space-y-4">
                        <div className="border border-gray-200 dark:border-zinc-700 rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:border-primary transition-colors bg-white dark:bg-black">
                            <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                                <CreditCard className="w-5 h-5 text-gray-600" />
                            </div>
                            <div className="flex-1">
                                <div className="font-bold">Credit / Debit Card</div>
                                <div className="text-xs text-gray-500">Visa, Mastercard, Amex</div>
                            </div>
                            <input type="radio" name="payment" className="w-5 h-5 text-primary" defaultChecked />
                        </div>

                        <div className="border border-gray-200 dark:border-zinc-700 rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:border-primary transition-colors bg-white dark:bg-black">
                            <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                                <Smartphone className="w-5 h-5 text-gray-600" />
                            </div>
                            <div className="flex-1">
                                <div className="font-bold">UPI / Net Banking</div>
                                <div className="text-xs text-gray-500">Google Pay, PhonePe</div>
                            </div>
                            <input type="radio" name="payment" className="w-5 h-5 text-primary" />
                        </div>

                        <div className="border border-gray-200 dark:border-zinc-700 rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:border-primary transition-colors bg-white dark:bg-black">
                            <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                                <Wallet className="w-5 h-5 text-gray-600" />
                            </div>
                            <div className="flex-1">
                                <div className="font-bold">Wallets</div>
                                <div className="text-xs text-gray-500">PayPal, Paytm</div>
                            </div>
                            <input type="radio" name="payment" className="w-5 h-5 text-primary" />
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100 dark:border-zinc-800">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-gray-500">Total Amount</span>
                            <span className="text-3xl font-bold">₹64,000</span>
                        </div>
                        <button
                            onClick={() => window.location.href = '/book/confirmation'}
                            className="w-full bg-gradient-to-r from-primary to-indigo-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/30 hover:scale-[1.02] transition-transform"
                        >
                            Pay Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
