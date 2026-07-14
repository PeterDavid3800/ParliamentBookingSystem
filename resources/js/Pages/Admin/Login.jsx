import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Eye, EyeOff, ArrowRight, Shield } from 'lucide-react';

export default function AdminLogin() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/login', {
            onError: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen flex">
            <Head title="Admin Login — Parliament of Kenya" />

            {/* ── Left Panel — Branding ── */}
            <div className="hidden lg:flex lg:w-5/12 xl:w-1/2 relative overflow-hidden bg-parliament-950">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />

                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-parliament-800/80 via-parliament-900/90 to-parliament-950" />

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-between h-full p-12 xl:p-16">
                    <div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lg p-1.5 flex-shrink-0">
                                <img
                                    src="/parliament.png"
                                    alt="Parliament of Kenya"
                                    className="h-9 w-auto"
                                />
                            </div>
                            <div>
                                <h2 className="text-white text-lg font-bold leading-tight">
                                    Parliament of Kenya
                                </h2>
                                <p className="text-parliament-300 text-xs tracking-wide">
                                    VISITS ADMINISTRATION
                                </p>
                            </div>
                        </div>

                        <div className="mt-16">
                            <h1 className="text-white text-3xl xl:text-4xl font-extrabold leading-tight tracking-tight">
                                Manage visits
                                <br />
                                <span className="text-parliament-green-300">with confidence</span>
                            </h1>
                            <p className="text-parliament-200 mt-4 text-base leading-relaxed max-w-sm">
                                Review bookings, manage time slots, and coordinate school visits to the Parliament of Kenya — all from one dashboard.
                            </p>
                        </div>
                    </div>

                    {/* Feature badges */}
                    <div className="space-y-3">
                        {[
                            { label: 'Secure access for authorised staff only', Icon: Shield },
                            { label: 'Real-time booking management', Icon: ArrowRight },
                            { label: 'Complete visit oversight & reporting', Icon: ArrowRight },
                        ].map((item) => (
                            <div
                                key={item.label}
                                className="flex items-center gap-3 text-parliament-100 text-sm"
                            >
                                <item.Icon className="w-4 h-4 text-parliament-green-400 flex-shrink-0" />
                                <span>{item.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div>
                        <p className="text-parliament-400 text-xs">
                            &copy; {new Date().getFullYear()} Parliament of Kenya. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Right Panel — Login Form ── */}
            <div className="flex-1 flex items-center justify-center px-6 py-12 bg-gray-50">
                <div className="w-full max-w-md">
                    {/* Mobile logo (visible only on small screens) */}
                    <div className="lg:hidden text-center mb-10">
                        <img
                            src="/parliament.png"
                            alt="Parliament of Kenya"
                            className="h-16 w-auto mx-auto"
                        />
                        <h2 className="text-gray-900 text-xl font-bold mt-4">Parliament of Kenya</h2>
                        <p className="text-gray-500 text-sm">Admin Panel</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 xl:p-10">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
                            <p className="text-gray-500 text-sm mt-1">
                                Sign in to your admin account to continue.
                            </p>
                        </div>

                        {/* Error alert */}
                        {Object.keys(errors).length > 0 && (
                            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-6 text-sm flex items-start gap-2">
                                <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>Invalid email or password. Please try again.</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 bg-white focus:ring-2 focus:ring-parliament-500 focus:border-parliament-500 outline-none transition-shadow"
                                    placeholder="admin@parliament.go.ke"
                                    required
                                    autoFocus
                                    autoComplete="email"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <a
                                        href="#"
                                        className="text-xs text-parliament-600 hover:text-parliament-700 font-medium transition-colors"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 text-gray-900 placeholder-gray-400 bg-white focus:ring-2 focus:ring-parliament-500 focus:border-parliament-500 outline-none transition-shadow"
                                        placeholder="Enter your password"
                                        required
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        tabIndex={-1}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Remember me */}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-300 text-parliament-600 focus:ring-parliament-500"
                                />
                                <label htmlFor="remember" className="ml-2.5 text-sm text-gray-600 cursor-pointer select-none">
                                    Remember me for 30 days
                                </label>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-parliament-700 text-white py-3 rounded-xl font-semibold hover:bg-parliament-800 focus:ring-4 focus:ring-parliament-200 disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                            >
                                {processing ? (
                                    <>
                                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Signing in…
                                    </>
                                ) : (
                                    'Sign in'
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Footer note */}
                    <p className="text-center text-xs text-gray-400 mt-8">
                        Authorised personnel only. Access is monitored and logged.
                    </p>
                </div>
            </div>
        </div>
    );
}
