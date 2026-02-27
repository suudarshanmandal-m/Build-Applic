import { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import { useNotices, useCreateNotice, useDeleteNotice } from "@/hooks/use-notices";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trash2, Plus, Megaphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function NoticesPage() {
  const { data: notices, isLoading } = useNotices();
  const createNotice = useCreateNotice();
  const deleteNotice = useDeleteNotice();
  const { toast } = useToast();
  
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createNotice.mutateAsync({ title, message });
      setIsOpen(false);
      setTitle("");
      setMessage("");
      toast({ title: "Notice published successfully" });
    } catch (e) {
      toast({ title: "Failed to publish notice", variant: "destructive" });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteNotice.mutateAsync(id);
      toast({ title: "Notice deleted" });
    } catch (e) {
      toast({ title: "Failed to delete notice", variant: "destructive" });
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-display font-bold text-foreground">Manage Notices</h1>
          
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="shadow-md">
                <Plus className="w-4 h-4 mr-2" /> New Notice
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Publish New Notice</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Notice Title</Label>
                  <Input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="E.g. Server Maintenance" />
                </div>
                <div className="space-y-2">
                  <Label>Message</Label>
                  <Textarea required value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Details..." className="min-h-[100px]" />
                </div>
                <Button type="submit" className="w-full" disabled={createNotice.isPending}>
                  {createNotice.isPending ? "Publishing..." : "Publish Notice"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isLoading ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">Loading notices...</div>
          ) : notices?.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-card rounded-xl border border-border">
              <Megaphone className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">No active notices.</p>
            </div>
          ) : (
            notices?.map(notice => (
              <Card key={notice.id} className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-3 flex flex-row items-start justify-between space-y-0">
                  <div className="space-y-1">
                    <CardTitle className="text-xl">{notice.title}</CardTitle>
                    <p className="text-xs text-muted-foreground font-medium">
                      {format(new Date(notice.createdAt!), 'MMM dd, yyyy - hh:mm a')}
                    </p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 -mt-2 -mr-2"
                    onClick={() => handleDelete(notice.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground whitespace-pre-wrap">{notice.message}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>

      </div>
    </DashboardLayout>
  );
}
