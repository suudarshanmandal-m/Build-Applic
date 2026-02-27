import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { Laptop, Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { t, lang, setLang } = useI18n();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Laptop className="h-6 w-6 text-primary" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-foreground">
                {t('appName')}
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 font-medium">
                  <Languages className="h-4 w-4" />
                  <span className="hidden sm:inline-block">
                    {lang === 'en' ? 'English' : 'বাংলা'}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLang('en')} className={lang === 'en' ? 'bg-primary/10 font-bold' : ''}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang('bn')} className={lang === 'bn' ? 'bg-primary/10 font-bold' : ''}>
                  বাংলা
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/request">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20 rounded-xl px-6 transition-all hover:-translate-y-0.5">
                {t('requestService')}
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}
