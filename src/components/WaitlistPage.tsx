"use client";

import { useState } from "react";
import Button from "./Button";
import Confetti from "./Confetti";
import Link from "next/link";

export default function WaitlistPage() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        school: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.fullName || !formData.email || !formData.school) {
            setErrorMessage("Please fill in all fields.");
            setSubmitState("error");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setErrorMessage("Please enter a valid email address.");
            setSubmitState("error");
            return;
        }

        setIsLoading(true);
        setSubmitState("idle");
        setErrorMessage("");

        try {
            const response = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: formData.email }),
            });

            if (response.ok) {
                setSubmitState("success");
                setShowConfetti(true);
                setFormData({ fullName: "", email: "", school: "" });
            } else {
                setSubmitState("error");
                setErrorMessage("Something went wrong. Please try again.");
            }
        } catch (error) {
            setSubmitState("error");
            setErrorMessage("Network error. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[var(--color-youthpay-neutral-grey)] to-white flex items-center justify-center p-6">
            <Confetti isActive={showConfetti} onComplete={() => setShowConfetti(false)} />

            {/* Logo */}
            <Link href="/" className="fixed top-6 left-6 flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--color-youthpay-primary-blue)] to-[var(--color-youthpay-accent-purple)] flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-white" />
                </div>
                <div>
                    <div className="text-xs font-bold tracking-[0.3em] text-gray-500">YOUTH</div>
                    <div className="text-lg font-bold text-[var(--color-youthpay-neutral-dark)]">PAY</div>
                </div>
            </Link>

            <div className="max-w-2xl w-full">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-6xl md:text-7xl font-black text-[var(--color-youthpay-neutral-dark)] mb-6">
                        Be the First on Campus. ✨
                    </h1>
                    <p className="text-2xl text-gray-600">
                        Join the exclusive waitlist to get early access when we launch at your school.
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
                    {submitState === "success" ? (
                        <div className="text-center py-12">
                            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[var(--color-youthpay-action-orange)] to-[var(--color-youthpay-accent-purple)] flex items-center justify-center">
                                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-4xl font-black text-[var(--color-youthpay-neutral-dark)] mb-4">
                                You're in! 🎉
                            </h2>
                            <p className="text-xl text-gray-600 mb-8">
                                We'll notify you as soon as we launch at your school.
                            </p>
                            <Button
                                variant="secondary"
                                onClick={() => setSubmitState("idle")}
                            >
                                Add Another Person
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Full Name */}
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-bold text-gray-700 mb-2">
                                    Full Name
                                </label>
                                <input
                                    id="fullName"
                                    type="text"
                                    placeholder="Zendaya..."
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-[var(--color-youthpay-primary-blue)] focus:outline-none transition-colors"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="you@university.edu"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-[var(--color-youthpay-primary-blue)] focus:outline-none transition-colors"
                                />
                                <p className="text-sm text-gray-500 mt-2">
                                    We won't spam you. Promise.
                                </p>
                            </div>

                            {/* School */}
                            <div>
                                <label htmlFor="school" className="block text-sm font-bold text-gray-700 mb-2">
                                    School / University
                                </label>
                                <input
                                    id="school"
                                    type="text"
                                    placeholder="Start typing your school..."
                                    value={formData.school}
                                    onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                                    className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-[var(--color-youthpay-primary-blue)] focus:outline-none transition-colors"
                                />
                            </div>

                            {/* Error Message */}
                            {submitState === "error" && (
                                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                                    <p className="text-red-600 text-sm font-semibold">{errorMessage}</p>
                                </div>
                            )}

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                variant="primary"
                                isLoading={isLoading}
                                className="w-full !text-xl !py-5"
                            >
                                Get Early Access 🚀
                            </Button>

                            {/* Privacy Note */}
                            <p className="text-center text-sm text-gray-500">
                                We respect your privacy. Your data is secure and we are SBP licensed.
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
