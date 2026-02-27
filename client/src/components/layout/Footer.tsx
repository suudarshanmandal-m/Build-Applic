import { Link } from "wouter";
import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { 
  Facebook, 
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ChevronRight 
} from "lucide-react";

export function Footer() {
  const { t } = useI18n();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const footerServices = [
    's_onlineForm',
    's_aadhaar',
    's_pan',
    's_passport',
    's_mobileRecharge',
    's_trainTicket',
    's_electricity'
  ];

  return (
    <footer className="relative bg-[#0f172a] text-white pt-16 pb-8 overflow-hidden border-t border-blue-500/20">
      {/* Top border glow effect */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50 shadow-[0_-4px_20px_rgba(59,130,246,0.5)]"></div>
      
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Business Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-2xl font-display font-bold text-blue-400">{t('appName')}</h2>
            <p className="text-blue-100/80 font-medium">{t('proprietor')}</p>
            <div className="flex gap-4 pt-4">
              <motion.a 
                href="#" 
                whileHover={{ scale: 1.2, color: "#3b82f6" }}
                className="p-2 bg-white/5 rounded-lg transition-colors"
              >
                <Facebook size={20} />
              </motion.a>
              <motion.a 
                href="https://wa.me/919832450395" 
                whileHover={{ scale: 1.2, color: "#22c55e" }}
                className="p-2 bg-white/5 rounded-lg transition-colors"
              >
                <MessageCircle size={20} />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-bold border-l-4 border-blue-500 pl-3">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-blue-100/70 hover:text-blue-400 flex items-center gap-2 transition-colors group">
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-blue-100/70 hover:text-blue-400 flex items-center gap-2 transition-colors group">
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  {t('servicesLink')}
                </Link>
              </li>
              <li>
                <Link href="/request" className="text-blue-100/70 hover:text-blue-400 flex items-center gap-2 transition-colors group">
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  {t('contactLink')}
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-blue-100/70 hover:text-blue-400 flex items-center gap-2 transition-colors group">
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  {t('adminLogin')}
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Our Services */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-bold border-l-4 border-blue-500 pl-3">{t('services')}</h3>
            <ul className="space-y-2">
              {footerServices.map(sid => (
                <li key={sid}>
                  <Link href="/request" className="text-blue-100/70 hover:text-blue-400 flex items-center gap-2 transition-colors group">
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    {t(sid)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-bold border-l-4 border-blue-500 pl-3">{t('contactUs')}</h3>
            <div className="space-y-3 text-blue-100/70">
              <div className="flex gap-3">
                <MapPin size={20} className="text-blue-400 shrink-0" />
                <p className="text-sm">
                  Gopiballavpur (In front of Yatra Maydan),<br />
                  Jhargram – 721506
                </p>
              </div>
              <div className="flex gap-3 items-center">
                <Phone size={18} className="text-blue-400 shrink-0" />
                <p className="text-sm">9832450395 | 6297320156</p>
              </div>
              <div className="flex gap-3 items-center">
                <Mail size={18} className="text-blue-400 shrink-0" />
                <p className="text-sm">cybercorner77@gmail.com</p>
              </div>
              <div className="flex gap-3 items-center pt-2">
                <Clock size={18} className="text-blue-400 shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-blue-300">{t('workingHours')}</p>
                  <p>{t('workingDays')}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center text-blue-100/40 text-sm">
          <p>© 2026 {t('appName')}. {t('rightsReserved')}.</p>
        </div>
      </motion.div>

      {/* Background shapes */}
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl pointer-events-none"></div>
    </footer>
  );
}
