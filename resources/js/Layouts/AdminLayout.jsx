import { Link, usePage } from '@inertiajs/react';
import { Landmark, LayoutDashboard, ClipboardList, LogOut } from 'lucide-react';

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
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white flex flex-col shrink-0">
                <div className="p-6 border-b border-gray-800">
                    <div className="flex items-center gap-2 text-2xl font-bold">
                        <Landmark className="w-7 h-7" />
                        <span>Admin</span>
                    </div>
                    <div className="text-gray-400 text-sm mt-1">Parliament Visits</div>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                isActive(item.href)
                                    ? 'bg-parliament-700 text-white'
                                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                            }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <Link
                        href="/admin/logout"
                        method="post"
                        as="button"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white w-full transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="bg-white shadow-sm px-8 py-4">
                    <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
                </header>
                <main className="flex-1 p-8 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
