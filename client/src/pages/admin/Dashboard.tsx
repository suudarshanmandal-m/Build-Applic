import DashboardLayout from "./DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useServiceRequests } from "@/hooks/use-service-requests";
import { useNotices } from "@/hooks/use-notices";
import { Activity, FileText, Bell, CheckCircle } from "lucide-react";
import { Link } from "wouter";

export default function AdminDashboard() {
  const { data: requests } = useServiceRequests();
  const { data: notices } = useNotices();

  const pendingRequests = requests?.filter(r => r.status === 'Pending').length || 0;
  const completedRequests = requests?.filter(r => r.status === 'Completed').length || 0;

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Overview</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none shadow-lg shadow-blue-500/20">
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <span className="text-4xl font-bold">{requests?.length || 0}</span>
              </div>
              <p className="text-blue-100 font-medium text-lg">Total Requests</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500 to-orange-500 text-white border-none shadow-lg shadow-amber-500/20">
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <span className="text-4xl font-bold">{pendingRequests}</span>
              </div>
              <p className="text-amber-100 font-medium text-lg">Pending Action</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500 to-green-600 text-white border-none shadow-lg shadow-emerald-500/20">
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <span className="text-4xl font-bold">{completedRequests}</span>
              </div>
              <p className="text-emerald-100 font-medium text-lg">Completed</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white border-none shadow-lg shadow-purple-500/20">
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Bell className="w-6 h-6 text-white" />
                </div>
                <span className="text-4xl font-bold">{notices?.length || 0}</span>
              </div>
              <p className="text-purple-100 font-medium text-lg">Active Notices</p>
            </CardContent>
          </Card>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <Card className="shadow-sm">
            <CardHeader className="border-b border-border/50 bg-muted/20">
              <CardTitle className="text-lg">Recent Requests</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {requests?.slice(0, 5).map(req => (
                  <Link key={req.id} href="/admin/requests" className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors block">
                    <div>
                      <p className="font-semibold text-foreground">{req.name}</p>
                      <p className="text-sm text-muted-foreground">{req.serviceType}</p>
                    </div>
                    <div className="text-sm font-medium">
                      <span className={req.status === 'Completed' ? 'text-green-600' : 'text-amber-500'}>
                        {req.status}
                      </span>
                    </div>
                  </Link>
                ))}
                {(!requests || requests.length === 0) && (
                  <div className="p-8 text-center text-muted-foreground">No recent requests</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </DashboardLayout>
  );
}
