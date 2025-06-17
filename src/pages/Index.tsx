
import { useState } from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { Header } from "@/components/admin/Header";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { RecentRides } from "@/components/admin/RecentRides";
import { DriverRequests } from "@/components/admin/DriverRequests";
import { RevenueChart } from "@/components/admin/RevenueChart";
import { LiveMap } from "@/components/admin/LiveMap";
import { DriversPage } from "@/components/admin/pages/DriversPage";
import { RidersPage } from "@/components/admin/pages/RidersPage";
import { RidesPage } from "@/components/admin/pages/RidesPage";
import { PaymentsPage } from "@/components/admin/pages/PaymentsPage";
import { AnalyticsPage } from "@/components/admin/pages/AnalyticsPage";
import { SupportPage } from "@/components/admin/pages/SupportPage";
import { NotificationsPage } from "@/components/admin/pages/NotificationsPage";
import { SafetyPage } from "@/components/admin/pages/SafetyPage";
import { SettingsPage } from "@/components/admin/pages/SettingsPage";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <DashboardStats />
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <RevenueChart />
              </div>
              <div>
                <DriverRequests />
              </div>
              <div className="lg:col-span-2">
                <LiveMap />
              </div>
              <div>
                <RecentRides />
              </div>
            </div>
          </div>
        );
      case "drivers":
        return <DriversPage />;
      case "riders":
        return <RidersPage />;
      case "rides":
        return <RidesPage />;
      case "payments":
        return <PaymentsPage />;
      case "analytics":
        return <AnalyticsPage />;
      case "support":
        return <SupportPage />;
      case "notifications":
        return <NotificationsPage />;
      case "safety":
        return <SafetyPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <div className="text-white dark:text-white text-gray-900">Page not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 dark:bg-gray-900 bg-gray-50 text-white dark:text-white text-gray-900 flex">
      <Sidebar 
        isOpen={sidebarOpen} 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
