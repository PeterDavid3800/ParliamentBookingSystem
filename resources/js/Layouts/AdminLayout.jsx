import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, ClipboardList, LogOut, ChevronRight } from 'lucide-react';

export default function AdminLayout({ children, title = 'Admin Panel' }) {
    const { url } = usePage();
    const currentPath = url || '/admin';

    const isActive = (path) => {
        if (path === '/admin') return currentPath === '/admin';
        return currentPath.startsWith(path);
    };

    const navItems = [
        { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { label: 'Bookings', href: '/admin/bookings', icon: ClipboardList },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-parliament-950 text-white flex flex-col shrink-0">
                {/* Brand */}
                <div className="px-5 py-6 border-b border-white/5">
                    <Link href="/admin" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center p-1 flex-shrink-0">
                            <img
                                src="/parliament.png"
                                alt="Parliament of Kenya"
                                className="h-7 w-auto"
                            />
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-bold text-white truncate leading-tight">
                                Parliament Visits
                            </p>
                            <p className="text-[10px] text-parliament-400 uppercase tracking-widest font-medium">
                                Admin Panel
                            </p>
                        </div>
                    </Link>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-4 space-y-0.5">
                    <p className="px-3 mb-2 text-[10px] font-semibold text-parliament-400 uppercase tracking-widest">
                        Navigation
                    </p>
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                                isActive(item.href)
                                    ? 'bg-parliament-700/60 text-white shadow-sm'
                                    : 'text-parliament-300 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            <item.icon className={`w-4 h-4 flex-shrink-0 ${
                                isActive(item.href) ? 'text-parliament-green-400' : 'text-parliament-400 group-hover:text-parliament-300'
                            }`} />
                            <span>{item.label}</span>
                            {isActive(item.href) && (
                                <ChevronRight className="w-3.5 h-3.5 ml-auto text-parliament-400" />
                            )}
                        </Link>
                    ))}
                </nav>

                {/* User / Logout */}
                <div className="px-3 py-4 border-t border-white/5">
                    <Link
                        href="/admin/logout"
                        method="post"
                        as="button"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-parliament-400 hover:bg-white/5 hover:text-white w-full transition-colors"
                    >
                        <LogOut className="w-4 h-4 flex-shrink-0" />
                        <span>Sign Out</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top bar */}
                <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
                    <div>
                        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="w-8 h-8 rounded-full bg-parliament-100 text-parliament-700 flex items-center justify-center text-xs font-bold">
                            A
                        </span>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 p-8 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
