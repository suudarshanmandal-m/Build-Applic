import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { useI18n } from "@/lib/i18n";
import { useNotices } from "@/hooks/use-notices";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { 
  FileEdit, Download, CreditCard, Plane, Smartphone, Train, 
  Wifi, Zap, Copy, Banknote, Printer, Layers, Image as ImageIcon, 
  Briefcase, Building2, Car, Stethoscope, FileCheck, Globe, ChevronRight, Bell
} from "lucide-react";

export default function Home() {
  const { t } = useI18n();
  const { data: notices, isLoading: loadingNotices } = useNotices();

  const services = [
    { id: 's_onlineForm', icon: FileEdit, color: "bg-blue-100 text-blue-600" },
    { id: 's_aadhaar', icon: Download, color: "bg-green-100 text-green-600" },
    { id: 's_pan', icon: CreditCard, color: "bg-purple-100 text-purple-600" },
    { id: 's_passport', icon: Plane, color: "bg-sky-100 text-sky-600" },
    { id: 's_mobileRecharge', icon: Smartphone, color: "bg-orange-100 text-orange-600" },
    { id: 's_trainTicket', icon: Train, color: "bg-red-100 text-red-600" },
    { id: 's_dataRecharge', icon: Wifi, color: "bg-teal-100 text-teal-600" },
    { id: 's_electricity', icon: Zap, color: "bg-yellow-100 text-yellow-600" },
    { id: 's_xerox', icon: Copy, color: "bg-gray-100 text-gray-600" },
    { id: 's_cashWith', icon: Banknote, color: "bg-emerald-100 text-emerald-600" },
    { id: 's_print', icon: Printer, color: "bg-indigo-100 text-indigo-600" },
    { id: 's_lamination', icon: Layers, color: "bg-cyan-100 text-cyan-600" },
    { id: 's_photo', icon: ImageIcon, color: "bg-pink-100 text-pink-600" },
    { id: 's_trade', icon: Briefcase, color: "bg-rose-100 text-rose-600" },
    { id: 's_udyam', icon: Building2, color: "bg-amber-100 text-amber-600" },
    { id: 's_vehicle', icon: Car, color: "bg-fuchsia-100 text-fuchsia-600" },
    { id: 's_cmc', icon: Stethoscope, color: "bg-blue-100 text-blue-600" },
    { id: 's_driver', icon: FileCheck, color: "bg-violet-100 text-violet-600" },
    { id: 's_allTypes', icon: Globe, color: "bg-primary/10 text-primary" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute top-0 inset-x-0 h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
          <div className="absolute top-40 -left-20 w-72 h-72 rounded-full bg-blue-400/5 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-bold text-foreground mb-6"
          >
            {t('appName')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance"
          >
            {t('heroSubtitle')}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center gap-4"
          >
            <Link href="/request">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300">
                {t('requestService')} <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-12 w-full">
        
        {/* Services Grid (Left/Main) */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-2 bg-primary rounded-full"></div>
            <h2 className="text-3xl font-display font-bold">{t('services')}</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  key={service.id}
                  className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/50 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-default"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${service.color} transition-transform group-hover:scale-110 group-hover:-rotate-3`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                    {t(service.id)}
                  </h3>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Notices Sidebar (Right) */}
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="sticky top-24">
            <div className="bg-card rounded-2xl border border-border shadow-lg shadow-black/5 overflow-hidden">
              <div className="bg-primary/5 p-6 border-b border-border flex items-center gap-3">
                <Bell className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-display font-bold text-foreground">{t('latestNotices')}</h3>
              </div>
              
              <div className="p-6">
                {loadingNotices ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="animate-pulse">
                        <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
                        <div className="h-5 bg-muted rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-muted rounded w-full"></div>
                      </div>
                    ))}
                  </div>
                ) : notices && notices.length > 0 ? (
                  <div className="space-y-6">
                    {notices.map((notice) => (
                      <div key={notice.id} className="relative pl-4 border-l-2 border-primary/30">
                        <div className="absolute w-2 h-2 rounded-full bg-primary -left-[5px] top-1.5"></div>
                        <p className="text-xs text-muted-foreground font-medium mb-1">
                          {format(new Date(notice.createdAt!), 'MMM dd, yyyy')}
                        </p>
                        <h4 className="font-bold text-foreground mb-1">{notice.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{notice.message}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Bell className="w-8 h-8 mx-auto mb-3 opacity-20" />
                    <p>{t('noNotices')}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
