import React from "react";
import SideMenu from "../components/SideMenu";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-800 pl-64">
      <SideMenu />
      <div className="m-2 mr-2 flex-grow p-4 bg-gray-100 rounded-md flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
