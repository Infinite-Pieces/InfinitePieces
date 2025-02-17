import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SideMenu = () => {
    const navigate = useNavigate();
    return(
        <div className="fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white flex-col overflow-hidden">
            <div className="p-4 text-2xl font-bond border-b border-gray-700">
                Admin Panel
            </div>

            <nav className="flex-grow p-4">
                <ul>
                    <li className="mb-2">
                        <Link to="/" class="block py-2 px-4 hover:bg-gray-700 rounded">
                            DashBoard
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="p-4 border-t border-gray-700">
                <p className="text-sm text-gray-400">Logged in as Admin</p>
            </div>
        </div>
    );
};

export default SideMenu;