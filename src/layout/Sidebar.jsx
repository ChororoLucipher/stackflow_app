import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
export default function Sidebar() {
    const { signOut } = useAuth();
    const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${isActive ?
    'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`;
    
    return (
        <aside className="w-64 bg-white border-r h-full flex flex-col">
            <div className="p-6 border-b"><h1 className="text-2xl font-bold textblue-600">StockFlow</h1></div>
                <nav className="flex-1 p-4 space-y-2">
                    <NavLink to="/" className={linkClass}><LayoutDashboard size={20} />
                        Dashboard
                    </NavLink>
                    <NavLink to="/products" className={linkClass}><Package size={20} />
                        Products
                    </NavLink>
                </nav>
                <div className="p-4 border-t">
                <button onClick={signOut} className="flex items-center gap-3 text-gray-600
                    hover:text-red-600 w-full px-4 py-2">
                    <LogOut size={20} /> Logout
                </button>
            </div>
        </aside>
    );
}