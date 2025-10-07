import { Link, useNavigate } from "react-router-dom";
import { 
  Calendar, 
  LogOut, 
  User, 
  LayoutDashboard,
  Users,
  Package,
  Settings, 
  Bell,
  TrendingUp,
  DollarSign,
  FileText,
  Star,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { toast } from "react-hot-toast";

import { AuthButton } from "../components/auth/AuthButton";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { clearVendor } from "../store/slice/vendor.slice";
import { useLogoutVendor } from "@/hooks/vendorCustomHooks";

const VendorHome = () => {
  const { vendor, isAuthenticated } = useAppSelector((state) => state.vendor);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { mutate: logout, isPending } = useLogoutVendor();

  // Redirect if not authenticated
  

  console.log(vendor);

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        dispatch(clearVendor());
        navigate("/vendorLogin");
        toast.success("Logged out successfully!");
      },
      onError: (error: any) => {
        console.error("Logout failed:", error);
        toast.error("Logout failed. Please try again.");
      },
    });
  };

  // Sample stats data - replace with actual data from your API
  const stats = [
    { label: "Total Bookings", value: "124", icon: Calendar, color: "from-blue-500 to-blue-600", trend: "+12%" },
    { label: "Revenue", value: "$45,230", icon: DollarSign, color: "from-green-500 to-green-600", trend: "+8%" },
    { label: "Active Events", value: "18", icon: Clock, color: "from-purple-500 to-purple-600", trend: "+5%" },
    { label: "Customer Rating", value: "4.8", icon: Star, color: "from-yellow-500 to-yellow-600", trend: "+0.2" },
  ];

  const quickActions = [
    { label: "Dashboard", icon: LayoutDashboard, link: "/vendor/dashboard", color: "from-pink-500 to-purple-500" },
    { label: "User Management", icon: Users, link: "/vendor/users", color: "from-blue-500 to-cyan-500" },
    { label: "Services", icon: Package, link: "/vendor/services", color: "from-green-500 to-emerald-500" },
    { label: "Bookings", icon: FileText, link: "/vendor/bookings", color: "from-orange-500 to-red-500" },
  ];

  const recentActivities = [
    { type: "booking", message: "New booking from John Doe", time: "5 mins ago", status: "success" },
    { type: "payment", message: "Payment received for Event #1234", time: "1 hour ago", status: "success" },
    { type: "review", message: "New 5-star review from Sarah", time: "2 hours ago", status: "info" },
    { type: "alert", message: "Event tomorrow needs confirmation", time: "3 hours ago", status: "warning" },
  ];

  // Don't render content if not authenticated
 

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                craveEvents
              </span>
              <p className="text-xs text-gray-500 -mt-1">Vendor Portal</p>
            </div>
          </div>

          {/* Vendor Info & Logout */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {isAuthenticated && vendor && (
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-50 to-purple-50 rounded-full border border-pink-200">
                <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {vendor.name || vendor.email?.split('@')[0]}
                  </p>
                  <p className="text-xs text-gray-500">Vendor</p>
                </div>
              </div>
            )}

            <AuthButton 
              variant="outline" 
              onClick={handleLogout}
              disabled={isPending}
              className="border-red-300 text-red-600 hover:bg-red-50 flex items-center gap-1"
            >
              <LogOut className="w-4 h-4" />
              {isPending ? "Logging out..." : "Logout"}
            </AuthButton>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {vendor?.name || vendor?.email?.split('@')[0]}! 👋
          </h1>
          <p className="text-gray-600">Here's what's happening with your business today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {stat.trend}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.link} className="cursor-pointer">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                  <div className={`w-14 h-14 bg-gradient-to-br ${action.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{action.label}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Recent Activities</h2>
                <Link to="/vendor/activities">
                  <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                    View All
                  </button>
                </Link>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.status === 'success' ? 'bg-green-100' :
                      activity.status === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                    }`}>
                      {activity.status === 'success' ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : activity.status === 'warning' ? (
                        <AlertCircle className="w-5 h-5 text-yellow-600" />
                      ) : (
                        <Bell className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats & Settings */}
          <div className="space-y-6">
            {/* Performance Overview */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                Performance
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Booking Rate", value: 87, color: "from-green-500 to-emerald-500" },
                  { label: "Response Time", value: 92, color: "from-blue-500 to-cyan-500" },
                  { label: "Customer Satisfaction", value: 95, color: "from-purple-500 to-pink-500" },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">{item.label}</span>
                      <span className="font-semibold text-gray-900">{item.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`bg-gradient-to-r ${item.color} h-2 rounded-full`} style={{ width: `${item.value}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Settings Shortcut */}
            <Link to="/vendor/settings">
              <div className="bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl shadow-lg p-6 text-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <Settings className="w-10 h-10 mb-4" />
                <h3 className="text-lg font-bold mb-2">Account Settings</h3>
                <p className="text-sm text-white/90">Manage your profile, services, and preferences</p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VendorHome;