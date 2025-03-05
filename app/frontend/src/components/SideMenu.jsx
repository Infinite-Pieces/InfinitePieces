import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SideMenu = () => {
    const navigate = useNavigate();
    return(
        <div className="fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white flex flex-col">
            <div className="p-4 text-2xl font-bond border-b border-gray-700">
                Admin Panel
            </div>

            <nav className="flex-grow p-4">
                <ul>
                    <li className="mb-2">
                        <Link to="/admin-dashboard" class="block py-2 px-4 hover:bg-gray-700 rounded">
                            Dashboard
                        </Link>
                    </li>
                </ul>
                <ul>
                    <li className="mb-2">
                        <Link to="/admin-errors" class="block py-2 px-4 hover:bg-gray-700 rounded">
                            Error log
                        </Link>
                    </li>
                </ul>
                <ul>
                    <li className="mb-2">
                        <Link to="/admin-issues" class="block py-2 px-4 hover:bg-gray-700 rounded">
                            Issues Reported
                        </Link>
                    </li>
                </ul>
                <ul>
                    <li className="mb-2">
                        <Link to="/admin-payments" class="block py-2 px-4 hover:bg-gray-700 rounded">
                            Payment Log
                        </Link>
                    </li>
                </ul>
                <ul>
                    <li className="mb-2">
                        <Link to="/admin-inquiries" class="block py-2 px-4 hover:bg-gray-700 rounded">
                            Customer Inqueries
                        </Link>
                    </li>
                </ul>

            </nav>


            <div className="p-4 border-t border-gray-700 mt-auto">
                <p className="text-sm text-gray-400">Logged in as Admin</p>
            </div>
        </div>
    );
};

export default SideMenu;