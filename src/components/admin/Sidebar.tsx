
import { 
  LayoutDashboard, 
  Car, 
  Users, 
  MapPin, 
  BarChart3, 
  Settings, 
  HeadphonesIcon,
  Wallet,
  Bell,
  Shield
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Car, label: "Drivers", count: 12 },
  { icon: Users, label: "Riders", count: 245 },
  { icon: MapPin, label: "Rides", count: 89 },
  { icon: Wallet, label: "Payments" },
  { icon: BarChart3, label: "Analytics" },
  { icon: HeadphonesIcon, label: "Support", count: 7 },
  { icon: Bell, label: "Notifications" },
  { icon: Shield, label: "Safety" },
  { icon: Settings, label: "Settings" },
];

export const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-gray-800 border-r border-gray-700 transition-all duration-300 z-40",
      isOpen ? "w-64" : "w-16"
    )}>
      {/* Logo */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Car className="w-5 h-5 text-white" />
          </div>
          {isOpen && (
            <div>
              <h1 className="text-lg font-bold text-white">RideAdmin</h1>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={cn(
              "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors",
              item.active 
                ? "bg-blue-600 text-white" 
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            )}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {isOpen && (
              <>
                <span className="flex-1 text-left">{item.label}</span>
                {item.count && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {item.count}
                  </span>
                )}
              </>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};
