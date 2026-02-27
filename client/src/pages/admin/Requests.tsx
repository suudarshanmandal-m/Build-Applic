import { useServiceRequests, useUpdateServiceRequestStatus, useDeleteServiceRequest } from "@/hooks/use-service-requests";
import DashboardLayout from "./DashboardLayout";
import { format } from "date-fns";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreVertical, Check, Trash2, FileText, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, 
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { useState } from "react";

export default function RequestsPage() {
  const { data: requests, isLoading } = useServiceRequests();
  const updateStatus = useUpdateServiceRequestStatus();
  const deleteRequest = useDeleteServiceRequest();
  const { toast } = useToast();
  
  const [deleteId, setDeleteId] = useState<number | null>(null);

  if (isLoading) return <DashboardLayout><div className="p-8">Loading requests...</div></DashboardLayout>;

  const todayStr = format(new Date(), 'yyyy-MM-dd');
  const todayCount = requests?.filter(r => format(new Date(r.createdAt!), 'yyyy-MM-dd') === todayStr).length || 0;
  const pendingCount = requests?.filter(r => r.status === 'Pending').length || 0;

  const handleStatusChange = async (id: number, status: "Pending" | "Completed") => {
    try {
      await updateStatus.mutateAsync({ id, status });
      toast({ title: "Status updated" });
    } catch (e) {
      toast({ title: "Error updating status", variant: "destructive" });
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteRequest.mutateAsync(deleteId);
      toast({ title: "Request deleted" });
    } catch (e) {
      toast({ title: "Error deleting request", variant: "destructive" });
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-display font-bold text-foreground">Service Requests</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-sm border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{requests?.length || 0}</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Today's Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">{todayCount}</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-amber-500">{pendingCount}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-sm border-border/50 overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Client Details</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Document</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                    No requests found.
                  </TableCell>
                </TableRow>
              )}
              {requests?.map((req) => (
                <TableRow key={req.id}>
                  <TableCell className="whitespace-nowrap text-muted-foreground text-sm">
                    {format(new Date(req.createdAt!), 'MMM dd, yyyy HH:mm')}
                  </TableCell>
                  <TableCell>
                    <div className="font-semibold text-foreground">{req.name}</div>
                    <div className="text-sm text-muted-foreground">{req.phone}</div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{req.serviceType}</span>
                    {req.message && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1 max-w-[200px]" title={req.message}>
                        {req.message}
                      </p>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={req.status === 'Completed' ? 'default' : 'secondary'} 
                           className={req.status === 'Completed' ? 'bg-green-500 hover:bg-green-600' : 'bg-amber-100 text-amber-800 hover:bg-amber-200'}>
                      {req.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {req.documentFile ? (
                      <a href={`/uploads/${req.documentFile}`} target="_blank" rel="noreferrer" className="inline-flex items-center text-sm text-primary hover:underline">
                        <FileText className="w-4 h-4 mr-1" /> View
                      </a>
                    ) : (
                      <span className="text-sm text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {req.status === 'Pending' && (
                          <DropdownMenuItem onClick={() => handleStatusChange(req.id, "Completed")} className="text-green-600">
                            <Check className="mr-2 h-4 w-4" /> Mark Completed
                          </DropdownMenuItem>
                        )}
                        {req.status === 'Completed' && (
                          <DropdownMenuItem onClick={() => handleStatusChange(req.id, "Pending")}>
                            Mark Pending
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => setDeleteId(req.id)} className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the service request
                and remove its data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </div>
    </DashboardLayout>
  );
}
