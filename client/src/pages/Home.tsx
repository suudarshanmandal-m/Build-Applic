import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useI18n } from "@/lib/i18n";
import { useNotices } from "@/hooks/use-notices";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useSpring } from "framer-motion";
import { format } from "date-fns";
import { 
  FileEdit, Download, CreditCard, Plane, Smartphone, Train, 
  Wifi, Zap, Copy, Banknote, Printer, Layers, Image as ImageIcon, 
  Briefcase, Building2, Car, Stethoscope, FileCheck, Globe, ChevronRight, Bell,
  MousePointer2
} from "lucide-react";

export default function Home() {
  const { t } = useI18n();
  const { data: notices, isLoading: loadingNotices } = useNotices();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
        style={{ scaleX }}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-20 pb-32 overflow-hidden bg-slate-50">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-50/50 via-white to-blue-50/50">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none"
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              x: [0, -40, 0],
              y: [0, 60, 0]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-40 -left-20 w-[500px] h-[500px] rounded-full bg-blue-400/10 blur-[100px] pointer-events-none"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wider uppercase"
          >
            Digital Service Excellence
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-display font-bold text-foreground mb-8 tracking-tighter"
          >
            {t('appName')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-3xl text-muted-foreground max-w-3xl mx-auto mb-12 text-balance leading-relaxed"
          >
            {t('heroSubtitle')}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <Link href="/request">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="h-16 px-10 text-xl rounded-full bg-primary text-primary-foreground shadow-2xl shadow-primary/30 hover:shadow-primary/40 relative overflow-hidden group">
                  <span className="relative z-10 flex items-center gap-2">
                    {t('requestService')} <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-white/10"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/40"
          >
            <span className="text-[10px] uppercase tracking-widest font-bold">Scroll to Explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MousePointer2 size={20} className="rotate-180" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col lg:flex-row gap-16 w-full">
        
        {/* Services Grid (Left/Main) */}
        <div className="flex-1">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-12"
          >
            <div className="h-10 w-2 bg-primary rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
            <h2 className="text-4xl font-display font-bold tracking-tight">{t('services')}</h2>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                  }}
                  key={service.id}
                  whileHover={{ y: -8 }}
                  className="group relative bg-white rounded-3xl p-8 border border-slate-200 hover:border-primary/30 transition-all duration-500 cursor-default overflow-hidden shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.15)]"
                >
                  {/* Subtle Glow Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${service.color} transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                    {t(service.id)}
                  </h3>
                  <div className="mt-4 w-8 h-1 bg-primary/20 group-hover:w-16 group-hover:bg-primary transition-all duration-500 rounded-full" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Notices Sidebar (Right) */}
        <div className="w-full lg:w-[400px] flex-shrink-0">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="sticky top-24"
          >
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden group">
              <div className="bg-primary p-8 text-white relative overflow-hidden">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-2xl"
                />
                <div className="relative z-10 flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                    <Bell className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-display font-bold">{t('latestNotices')}</h3>
                </div>
              </div>
              
              <div className="p-8">
                {loadingNotices ? (
                  <div className="space-y-6">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="animate-pulse">
                        <div className="h-4 bg-slate-100 rounded w-1/4 mb-3"></div>
                        <div className="h-6 bg-slate-100 rounded w-3/4 mb-3"></div>
                        <div className="h-4 bg-slate-100 rounded w-full"></div>
                      </div>
                    ))}
                  </div>
                ) : notices && notices.length > 0 ? (
                  <div className="space-y-10">
                    {notices.map((notice, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        key={notice.id} 
                        className="relative pl-6 group/item"
                      >
                        <div className="absolute left-0 top-1 bottom-0 w-px bg-slate-200 group-hover/item:bg-primary transition-colors duration-300"></div>
                        <motion.div 
                          className="absolute w-3 h-3 rounded-full bg-slate-200 -left-[6px] top-1.5 border-2 border-white group-hover/item:bg-primary group-hover/item:scale-125 transition-all duration-300"
                        />
                        <p className="text-xs text-primary font-bold uppercase tracking-wider mb-2">
                          {format(new Date(notice.createdAt!), 'MMM dd, yyyy')}
                        </p>
                        <h4 className="font-bold text-lg text-slate-800 mb-2 group-hover/item:text-primary transition-colors">{notice.title}</h4>
                        <p className="text-sm text-slate-500 leading-relaxed font-medium">{notice.message}</p>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-400">
                    <Bell className="w-12 h-12 mx-auto mb-4 opacity-10" />
                    <p className="font-medium">{t('noNotices')}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

      </div>
      <Footer />
    </div>
  );
}
