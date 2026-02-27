import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { Laptop, Languages } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { t, lang, setLang } = useI18n();
  const [location] = useLocation();

  const links = [
    { name: t('home'), path: '/' },
    { name: t('servicesLink'), path: '/#services' },
    { name: t('contactUs'), path: '/request' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
              <motion.div 
                whileHover={{ rotate: 10 }}
                className="p-2 bg-primary/10 rounded-lg"
              >
                <Laptop className="h-6 w-6 text-primary" />
              </motion.div>
              <span className="font-display font-bold text-xl tracking-tight text-foreground">
                {t('appName')}
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              {links.map((link) => (
                <Link key={link.path} href={link.path}>
                  <div className="relative py-2 cursor-pointer group">
                    <span className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </span>
                    {location === link.path && (
                      <motion.div 
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                      />
                    )}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" size="sm" className="gap-2 font-bold rounded-full hover:bg-primary/5">
                    <Languages className="h-4 w-4 text-primary" />
                    <AnimatePresence mode="wait">
                      <motion.span 
                        key={lang}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="hidden sm:inline-block"
                      >
                        {lang === 'en' ? 'English' : 'বাংলা'}
                      </motion.span>
                    </AnimatePresence>
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-2xl p-1 shadow-2xl border-slate-200">
                <DropdownMenuItem onClick={() => setLang('en')} className={`rounded-xl px-4 py-2 font-bold cursor-pointer ${lang === 'en' ? 'bg-primary text-primary-foreground' : 'hover:bg-slate-100'}`}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang('bn')} className={`rounded-xl px-4 py-2 font-bold cursor-pointer ${lang === 'bn' ? 'bg-primary text-primary-foreground' : 'hover:bg-slate-100'}`}>
                  বাংলা
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/request">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/20 rounded-full px-8 font-bold transition-all">
                  {t('requestService')}
                </Button>
              </motion.div>
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}
