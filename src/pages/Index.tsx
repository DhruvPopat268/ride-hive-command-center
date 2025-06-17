
import { useState } from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { Header } from "@/components/admin/Header";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { RecentRides } from "@/components/admin/RecentRides";
import { DriverRequests } from "@/components/admin/DriverRequests";
import { RevenueChart } from "@/components/admin/RevenueChart";
import { LiveMap } from "@/components/admin/LiveMap";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <Sidebar isOpen={sidebarOpen} />
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-6 space-y-6">
          {/* Dashboard Stats */}
          <DashboardStats />
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Revenue Chart */}
            <div className="xl:col-span-2">
              <RevenueChart />
            </div>
            
            {/* Driver Requests */}
            <div>
              <DriverRequests />
            </div>
            
            {/* Live Map */}
            <div className="lg:col-span-2">
              <LiveMap />
            </div>
            
            {/* Recent Rides */}
            <div>
              <RecentRides />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
