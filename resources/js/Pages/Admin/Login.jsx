import { Head, useForm } from '@inertiajs/react';
import { Landmark } from 'lucide-react';

export default function AdminLogin() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/login');
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <Head title="Admin Login" />

            <div className="max-w-sm w-full">
                <div className="text-center mb-8">
                    <Landmark className="w-14 h-14 mx-auto text-parliament-400 mb-3" />
                    <h1 className="text-white text-xl font-bold">Parliament Visits</h1>
                    <p className="text-gray-400 text-sm mt-1">Admin Panel</p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-gray-800 rounded-xl p-8 shadow-2xl"
                >
                    <h2 className="text-white text-lg font-semibold mb-6">Sign In</h2>

                    {errors.email && (
                        <div className="bg-red-500/20 border border-red-500 text-red-300 rounded-lg p-3 mb-4 text-sm">
                            {errors.email}
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-gray-400 text-sm mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-parliament-500 focus:border-parliament-500 outline-none"
                            placeholder="admin@parliament.go.ke"
                            required
                            autoFocus
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-400 text-sm mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-parliament-500 focus:border-parliament-500 outline-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-parliament-700 text-white py-3 rounded-lg font-medium hover:bg-parliament-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {processing ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}
