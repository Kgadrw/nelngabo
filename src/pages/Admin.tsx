import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";

const Admin = () => {
  return (
    <>
      <Sidebar variant="admin" />
      <div className="min-h-screen bg-background pt-16 md:pl-72 md:pt-0">
        <div className="px-6 py-10 space-y-8">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Admin;
