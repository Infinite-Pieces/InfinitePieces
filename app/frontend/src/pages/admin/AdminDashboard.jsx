import React from "react";
import AnalyticBubble from "../../components/AnalyticBubble";
import AdminLayout from "../../layouts/AdminLayout";

const AdminDashboard = () => {
    const analyticsData = [
        { header: "$15,000", subheader: "Total Sales", rate: "+3% from last month" },
        { header: "1,000", subheader: "Items Sold", rate: "+4% from last month" },
        { header: "700", subheader: "Individual Customers", rate: "+20% Customer Growth"},
        { header: "136", subheader: "Active Now", rate: "-15% over last 24 hours"}
    ];

    return (
        <AdminLayout>
            {/* Scrollable content area */}
            <div className="flex-grow overflow-y-auto border-gray-300 p-2">
                <h1 className="text-4xl font-bold mb-4">Sales Overview</h1>
                <div className="flex justify-center items-center">
                    {analyticsData.map((data, index) => (
                        <AnalyticBubble key={index} header={data.header} subheader={data.subheader} rate={data.rate} />
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
