import Link from "next/link";
import { 
  Briefcase, 
  Users, 
  Clock, 
  TrendingUp, 
  ArrowRight,
  UserPlus,
  Activity
} from "lucide-react";

export default function OverviewPage() {
  const stats = [
    { title: "Active Jobs", value: "12", change: "+2 this week", icon: Briefcase, color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Total Applications", value: "842", change: "+148 this month", icon: Users, color: "text-slate-700", bg: "bg-slate-100" },
    { title: "Pending Review", value: "45", change: "Requires attention", icon: Clock, color: "text-orange-500", bg: "bg-orange-50" },
    { title: "Interviewing", value: "18", change: "+4 this week", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
  ];

  const recentActivity = [
    { id: 1, action: "New application received", subject: "Alice Johnson", target: "Frontend Developer", time: "2 hours ago" },
    { id: 2, action: "Application shortlisted", subject: "Bob Smith", target: "Backend Engineer", time: "4 hours ago" },
    { id: 3, action: "New job posted", subject: "HR Team", target: "Product Manager", time: "Yesterday" },
    { id: 4, action: "Application rejected", subject: "Charlie Davis", target: "UI Designer", time: "Yesterday" },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <header className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-sm text-slate-500 mt-1">Here is what's happening with your job listings today.</p>
      </header>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-slate-500 text-sm">{stat.title}</h3>
                <div className={`p-2 rounded-md ${stat.bg}`}>
                  <Icon size={18} className={stat.color} />
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-xs text-slate-500 mt-1 font-medium">{stat.change}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity Feed */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Recent Activity</h2>
            <Link href="/applications" className="text-sm text-blue-500 hover:text-blue-600 font-medium flex items-center gap-1">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {recentActivity.map((activity, index) => (
                <div key={activity.id} className="flex gap-4 relative">
                  {/* Timeline connector line */}
                  {index !== recentActivity.length - 1 && (
                    <div className="absolute left-[15px] top-8 bottom-[-24px] w-px bg-slate-100" />
                  )}
                  <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center">
                    <Activity size={14} className="text-slate-500" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-900">
                      <span className="font-medium">{activity.action}</span> from <span className="font-medium">{activity.subject}</span>
                    </p>
                    <p className="text-sm text-slate-500 mt-0.5">for {activity.target}</p>
                    <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col">
          <h2 className="font-semibold text-slate-900 mb-6">Quick Actions</h2>
          <div className="space-y-3 flex-1">
            <Link 
              href="/jobs" 
              className="flex items-center gap-3 w-full p-3 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-colors group"
            >
              <div className="p-2 rounded-md bg-slate-100 group-hover:bg-blue-100 group-hover:text-blue-600 text-slate-600 transition-colors">
                <Briefcase size={18} />
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-slate-900 group-hover:text-blue-700">Post a New Job</div>
                <div className="text-xs text-slate-500">Create a new listing</div>
              </div>
            </Link>

            <Link 
              href="/applications" 
              className="flex items-center gap-3 w-full p-3 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-colors group"
            >
              <div className="p-2 rounded-md bg-slate-100 group-hover:bg-blue-100 group-hover:text-blue-600 text-slate-600 transition-colors">
                <UserPlus size={18} />
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-slate-900 group-hover:text-blue-700">Review Candidates</div>
                <div className="text-xs text-slate-500">45 pending applications</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}