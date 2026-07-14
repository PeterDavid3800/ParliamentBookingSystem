import { Head } from '@inertiajs/react';

export default function TailwindTest() {
    return (
        <>
            <Head title="Tailwind CSS Test" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-2xl p-8">
                        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
                            Tailwind CSS is Working! 🎉
                        </h1>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded">
                                <h3 className="text-red-700 font-semibold">Colors</h3>
                                <p className="text-red-600 text-sm">Red theme working</p>
                            </div>
                            
                            <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded">
                                <h3 className="text-green-700 font-semibold">Layout</h3>
                                <p className="text-green-600 text-sm">Grid system working</p>
                            </div>
                            
                            <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded">
                                <h3 className="text-blue-700 font-semibold">Utilities</h3>
                                <p className="text-blue-600 text-sm">Spacing & borders working</p>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                                Gradient Button with Hover Effects
                            </button>
                            
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">Flexbox</span>
                                <span className="bg-yellow-200 text-yellow-700 px-3 py-1 rounded-full text-sm">Typography</span>
                                <span className="bg-indigo-200 text-indigo-700 px-3 py-1 rounded-full text-sm">Responsive</span>
                                <span className="bg-pink-200 text-pink-700 px-3 py-1 rounded-full text-sm">Animations</span>
                            </div>
                        </div>
                        
                        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Responsive Test</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                <div className="bg-purple-500 text-white p-4 rounded text-center">
                                    <div className="block sm:hidden">XS</div>
                                    <div className="hidden sm:block md:hidden">SM</div>
                                    <div className="hidden md:block lg:hidden">MD</div>
                                    <div className="hidden lg:block">LG</div>
                                </div>
                                <div className="bg-blue-500 text-white p-4 rounded text-center">
                                    <span className="text-sm">Responsive Grid</span>
                                </div>
                                <div className="bg-green-500 text-white p-4 rounded text-center">
                                    <span className="text-sm">Working Perfectly!</span>
                                </div>
                                <div className="bg-red-500 text-white p-4 rounded text-center">
                                    <span className="text-sm">All Set! ✓</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}