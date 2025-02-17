import React from 'react';

const AdminDashboard = () => {

    return (
        <div className="flex h-screen bg-gray-100">
            <SideMenu />
            <div className="flex-grow p-4">
                <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
                <p>Check out this dashboard</p>
            </div>
        </div>
    );
};

export default AdminDashboard;