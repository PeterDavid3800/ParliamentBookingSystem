import { Head } from '@inertiajs/react';

export default function Welcome({laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            
            <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-8">
                            <h1 className="text-4xl font-bold mb-4">
                                Welcome to Laravel + Inertia.js + React!
                            </h1>
                            <p className="text-xl opacity-90">
                                Your application is now powered by the modern stack.
                            </p>
                        </div>
                        
                        <div className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h2 className="text-xl font-semibold mb-3 text-gray-800">
                                        🚀 Laravel Version
                                    </h2>
                                    <p className="text-gray-600">{laravelVersion}</p>
                                </div>
                                
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h2 className="text-xl font-semibold mb-3 text-gray-800">
                                        🐘 PHP Version
                                    </h2>
                                    <p className="text-gray-600">{phpVersion}</p>
                                </div>
                                
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h2 className="text-xl font-semibold mb-3 text-gray-800">
                                        ⚛️ React
                                    </h2>
                                    <p className="text-gray-600">
                                        This component is rendered by React!
                                    </p>
                                </div>
                                
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h2 className="text-xl font-semibold mb-3 text-gray-800">
                                        🔥 Inertia.js
                                    </h2>
                                    <p className="text-gray-600">
                                        Seamless client-server communication
                                    </p>
                                </div>
                            </div>
                            
                             <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                                    <h2 className="text-lg font-semibold text-blue-800 mb-2">
                                        Get Started
                                    </h2>
                                    <p className="text-blue-600">
                                        You can now start building your React components with Inertia.js!
                                    </p>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}