import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { useI18n } from "@/lib/i18n";
import { useCreateServiceRequest } from "@/hooks/use-service-requests";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { UploadCloud, CheckCircle2, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function RequestForm() {
  const { t } = useI18n();
  const { toast } = useToast();
  const createRequest = useCreateServiceRequest();
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const services = [
    's_onlineForm', 's_aadhaar', 's_pan', 's_passport', 's_mobileRecharge', 
    's_trainTicket', 's_dataRecharge', 's_electricity', 's_xerox', 's_cashWith', 
    's_print', 's_lamination', 's_photo', 's_trade', 's_udyam', 's_vehicle', 
    's_cmc', 's_driver', 's_allTypes'
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (file) {
      formData.set('documentFile', file);
    }

    try {
      await createRequest.mutateAsync(formData);
      setIsSuccess(true);
      toast({
        title: "Success",
        description: "Your request has been submitted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit request",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('home')}
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {isSuccess ? (
            <Card className="border-primary/20 shadow-lg p-12 text-center">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-4">{t('formSuccessTitle')}</h2>
              <p className="text-lg text-muted-foreground mb-8">{t('formSuccessDesc')}</p>
              <Button onClick={() => setIsSuccess(false)} variant="outline" className="px-8">
                Submit Another Request
              </Button>
            </Card>
          ) : (
            <Card className="shadow-xl border-border/50 overflow-hidden">
              <div className="bg-primary/5 border-b border-border/50 p-8">
                <CardTitle className="text-3xl font-display text-foreground">{t('requestService')}</CardTitle>
                <CardDescription className="text-base mt-2">
                  Fill out the form below and attach any required documents.
                </CardDescription>
              </div>
              
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-semibold">{t('formName')} *</Label>
                      <Input id="name" name="name" required className="h-12 bg-background" placeholder="John Doe" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-semibold">{t('formPhone')} *</Label>
                      <Input id="phone" name="phone" required className="h-12 bg-background" placeholder="+91 9876543210" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="serviceType" className="text-sm font-semibold">{t('formServiceType')} *</Label>
                    <Select name="serviceType" required>
                      <SelectTrigger className="h-12 bg-background">
                        <SelectValue placeholder={t('formServiceType')} />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map(id => (
                          <SelectItem key={id} value={t(id)}>{t(id)}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-semibold">{t('formMessage')}</Label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      className="min-h-[120px] bg-background resize-y" 
                      placeholder="Any specific instructions..." 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">{t('formDocument')}</Label>
                    <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:bg-muted/50 transition-colors relative">
                      <input 
                        type="file" 
                        id="documentFile"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                      />
                      <UploadCloud className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm font-medium text-foreground mb-1">
                        {file ? file.name : "Click to upload or drag and drop"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PDF, JPG, PNG (Max 10MB)
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                      disabled={createRequest.isPending}
                    >
                      {createRequest.isPending ? t('formSubmitting') : t('formSubmit')}
                    </Button>
                  </div>

                </form>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}
