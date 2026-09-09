import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';

export default function PublicLayout({ children }) {
    const { url } = usePage();
    const currentPath = url || '/';
    const [menuOpen, setMenuOpen] = useState(false);
    const isActive = (path) => currentPath === path;
    const navLinks = [
        { label: 'Home', href: '/' },
        { label: 'Schedule', href: '/schedule' },
        { label: 'Book a Visit', href: '/book' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Contact', href: '/contact' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-parliament-900 text-white shadow-lg sticky top-0 z-50 border-b-4 border-parliament-500">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex items-center justify-between py-3">
                        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity shrink-0">
                            <div className="bg-white rounded-md px-2 py-1">
                                <img src="/parliament.png" alt="Parliament of Kenya" className="h-11 w-auto" />
                            </div>
                            <div className="hidden sm:block">
                                <h1 className="text-base font-bold tracking-tight leading-tight">Parliament of Kenya</h1>
                                <p className="text-green-100 text-xs">National Assembly Visits Portal</p>
                            </div>
                        </Link>
                        <nav className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link key={link.href} href={link.href} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${link.label === 'Book a Visit' ? 'bg-parliament-500 text-white hover:bg-parliament-400 ml-2' : isActive(link.href) ? 'bg-white/15 text-white' : 'text-green-50 hover:bg-white/10 hover:text-white'}`}>
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg hover:bg-white/10" aria-label="Toggle menu">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
                            </svg>
                        </button>
                    </div>
                    {menuOpen && (
                        <nav className="md:hidden pb-4 border-t border-white/10 pt-3 space-y-1">
                            {navLinks.map((link) => (
                                <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className={`block px-4 py-3 rounded-lg text-sm font-medium ${link.label === 'Book a Visit' ? 'bg-parliament-500 text-white' : isActive(link.href) ? 'bg-white/15 text-white' : 'text-green-50 hover:bg-white/10'}`}>
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    )}
                </div>
            </header>

            <main className="flex-1 w-full">{children}</main>

            <footer className="bg-parliament-950 text-green-100 mt-auto">
                <div className="max-w-6xl mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <div className="bg-white rounded-md p-2 inline-block mb-3"><img src="/parliament.png" alt="Parliament of Kenya" className="h-11 w-auto" /></div>
                            <p className="text-sm leading-relaxed">Official visitor booking portal for educational and institutional visits to the Parliament of Kenya.</p>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Quick Links</h3>
                            <ul className="space-y-2 text-sm">{navLinks.map((link) => <li key={link.href}><Link href={link.href} className="hover:text-white">{link.label}</Link></li>)}</ul>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Contact</h3>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Parliament Buildings, Nairobi</li>
                                <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> visits@parliament.go.ke</li>
                                <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +254 20 222 1291</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-green-900 mt-8 pt-6 text-center text-xs text-green-200 flex flex-col sm:flex-row items-center justify-center gap-2">
                        <p>© {new Date().getFullYear()} Parliament of Kenya. All rights reserved.</p><span className="hidden sm:inline">|</span><Link href="/terms" className="hover:text-white">Terms & Conditions</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
