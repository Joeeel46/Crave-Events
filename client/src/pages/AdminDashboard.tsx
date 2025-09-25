import { useState } from "react";
import { 
  Users, 
  Calendar, 
  BarChart3, 
  Settings, 
  Bell, 
  Search,
  Plus,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Shield,
  LogOut,
  Home,
  Menu,
  X
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { title: "Total Users", value: "2,847", change: "+12%", icon: Users, color: "blue" },
    { title: "Active Services", value: "156", change: "+8%", icon: Calendar, color: "green" },
    { title: "Revenue", value: "$47,590", change: "+23%", icon: BarChart3, color: "purple" },
    { title: "Pending Requests", value: "23", change: "-5%", icon: Bell, color: "orange" },
  ];

  const recentUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", status: "Active", joined: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Active", joined: "2024-01-14" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", status: "Pending", joined: "2024-01-13" },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", status: "Active", joined: "2024-01-12" },
  ];

  const recentServices = [
    { id: 1, title: "Corporate Gala 2024", client: "Tech Corp", date: "2024-02-15", status: "Confirmed" },
    { id: 2, title: "Wedding Celebration", client: "John & Mary", date: "2024-02-20", status: "Planning" },
    { id: 3, title: "Birthday Party", client: "Sarah Johnson", date: "2024-02-25", status: "Confirmed" },
  ];

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "users", label: "Users", icon: Users },
    { id: "services", label: "Services", icon: Calendar },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 lg:translate-x-0 lg:relative lg:flex lg:flex-col`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-700 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-semibold">Admin Panel</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Sidebar Navigation */}
        <nav className="flex-1 px-3 py-6 overflow-y-auto">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-slate-700 flex-shrink-0">
          <Link
            to="/adminLogin"
            className="w-full flex items-center px-3 py-3 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white rounded-lg transition-all duration-200"
          >
            <LogOut className="w-5 h-5 mr-3 flex-shrink-0" />
            <span>Logout</span>
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-slate-800 border-b border-slate-700 flex-shrink-0">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center min-w-0">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-slate-400 hover:text-white mr-4 flex-shrink-0 transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-semibold text-white capitalize truncate">{activeTab}</h1>
            </div>
            
            <div className="flex items-center space-x-4 flex-shrink-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-800"></span>
              </button>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full shadow-lg"></div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto bg-slate-900">
          {activeTab === "overview" && (
            <div>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <p className="text-slate-400 text-sm font-medium mb-1">{stat.title}</p>
                        <p className="text-2xl font-bold text-white mb-2">{stat.value}</p>
                        <p className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                          {stat.change} from last month
                        </p>
                      </div>
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ml-4 ${
                        stat.color === 'blue' ? 'bg-blue-500/20' :
                        stat.color === 'green' ? 'bg-green-500/20' :
                        stat.color === 'purple' ? 'bg-purple-500/20' :
                        'bg-orange-500/20'
                      }`}>
                        <stat.icon className={`w-6 h-6 ${
                          stat.color === 'blue' ? 'text-blue-400' :
                          stat.color === 'green' ? 'text-green-400' :
                          stat.color === 'purple' ? 'text-purple-400' :
                          'text-orange-400'
                        }`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Recent Users */}
                <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg">
                  <div className="p-6 border-b border-slate-700">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white">Recent Users</h3>
                      <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
                        View all
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {recentUsers.map((user) => (
                        <div key={user.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-700/50 transition-colors">
                          <div className="flex items-center min-w-0 flex-1">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                              <span className="text-white text-sm font-medium">{user.name.charAt(0)}</span>
                            </div>
                            <div className="ml-3 min-w-0 flex-1">
                              <p className="text-white font-medium truncate">{user.name}</p>
                              <p className="text-slate-400 text-sm truncate">{user.email}</p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ml-3 ${
                            user.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'
                          }`}>
                            {user.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Services */}
                <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg">
                  <div className="p-6 border-b border-slate-700">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white">Recent Services</h3>
                      <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
                        View all
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {recentServices.map((service) => (
                        <div key={service.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-700/50 transition-colors">
                          <div className="min-w-0 flex-1">
                            <p className="text-white font-medium truncate">{service.title}</p>
                            <p className="text-slate-400 text-sm truncate">{service.client} • {service.date}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ml-3 ${
                            service.status === 'Confirmed' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                          }`}>
                            {service.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">User Management</h2>
                <div className="flex items-center space-x-3">
                  <button className="flex items-center px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </button>
                  <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    Add User
                  </button>
                </div>
              </div>

              <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-700/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Joined</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      {recentUsers.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-medium">{user.name.charAt(0)}</span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-white">{user.name}</div>
                                <div className="text-sm text-slate-400">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              user.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{user.joined}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button className="text-blue-400 hover:text-blue-300">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="text-green-400 hover:text-green-300">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="text-red-400 hover:text-red-300">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "services" && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold text-white">Service Management</h2>
                <div className="flex items-center space-x-3">
                  <button className="flex items-center px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all duration-200 shadow-lg">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </button>
                  <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg">
                    <Plus className="w-4 h-4 mr-2" />
                    New Service
                  </button>
                </div>
              </div>

              <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="space-y-4">
                    {recentServices.map((service) => (
                      <div key={service.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 transition-colors">
                        <div className="flex items-center min-w-0 flex-1">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4 shadow-lg flex-shrink-0">
                            <Calendar className="w-6 h-6 text-white" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-white font-medium truncate">{service.title}</h3>
                            <p className="text-slate-400 text-sm truncate">{service.client} • {service.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 flex-shrink-0 ml-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            service.status === 'Confirmed' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                          }`}>
                            {service.status}
                          </span>
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-400 hover:text-blue-300 p-1 rounded transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-green-400 hover:text-green-300 p-1 rounded transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Analytics Dashboard</h2>
              <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg p-8">
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-400 text-lg">Analytics charts and data visualization would go here.</p>
                  <p className="text-slate-500 text-sm mt-2">Connect your analytics service to view detailed reports</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">System Settings</h2>
              <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg p-8">
                <div className="text-center py-12">
                  <Settings className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-400 text-lg">System configuration options would go here.</p>
                  <p className="text-slate-500 text-sm mt-2">Manage your application settings and preferences</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;