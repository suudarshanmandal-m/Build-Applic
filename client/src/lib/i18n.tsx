import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "bn";

interface Translations {
  [key: string]: {
    en: string;
    bn: string;
  };
}

const dictionary: Translations = {
  appName: { en: "Cyber Corner", bn: "সাইবার কর্নার" },
  home: { en: "Home", bn: "হোম" },
  services: { en: "Our Services", bn: "আমাদের সেবাসমূহ" },
  notices: { en: "Notices", bn: "বিজ্ঞপ্তি" },
  requestService: { en: "Request Service", bn: "সেবার অনুরোধ করুন" },
  heroSubtitle: { en: "Your one-stop digital solution for forms, cards, and online applications.", bn: "ফর্ম, কার্ড এবং অনলাইন আবেদনের জন্য আপনার নির্ভরযোগ্য ডিজিটাল সমাধান।" },
  contactUs: { en: "Contact Us", bn: "যোগাযোগ করুন" },
  latestNotices: { en: "Latest Updates & Notices", bn: "সর্বশেষ আপডেট ও বিজ্ঞপ্তি" },
  noNotices: { en: "No active notices at the moment.", bn: "এই মুহূর্তে কোনো বিজ্ঞপ্তি নেই।" },
  formName: { en: "Full Name", bn: "পুরো নাম" },
  formPhone: { en: "Phone Number", bn: "ফোন নম্বর" },
  formServiceType: { en: "Select Service", bn: "সেবা নির্বাচন করুন" },
  formMessage: { en: "Additional Message (Optional)", bn: "অতিরিক্ত বার্তা (ঐচ্ছিক)" },
  formDocument: { en: "Upload Document (PDF/Image)", bn: "নথি আপলোড করুন (PDF/Image)" },
  formSubmit: { en: "Submit Request", bn: "অনুরোধ জমা দিন" },
  formSubmitting: { en: "Submitting...", bn: "জমা হচ্ছে..." },
  formSuccessTitle: { en: "Request Submitted", bn: "অনুরোধ জমা হয়েছে" },
  formSuccessDesc: { en: "We will contact you shortly regarding your request.", bn: "আমরা শীঘ্রই আপনার অনুরোধের বিষয়ে যোগাযোগ করব।" },
  
  // Services
  s_onlineForm: { en: "Online Form Fill-up", bn: "অনলাইন ফর্ম পূরণ" },
  s_aadhaar: { en: "Aadhaar Card Download", bn: "আধার কার্ড ডাউনলোড" },
  s_pan: { en: "PAN Card", bn: "প্যান কার্ড" },
  s_passport: { en: "Passport", bn: "পাসপোর্ট" },
  s_mobileRecharge: { en: "Mobile Recharge", bn: "মোবাইল রিচার্জ" },
  s_trainTicket: { en: "Railway Ticket Booking", bn: "ট্রেন টিকিট বুকিং" },
  s_dataRecharge: { en: "Data Recharge", bn: "ডেটা রিচার্জ" },
  s_electricity: { en: "Electricity Bill Payment", bn: "বিদ্যুৎ বিল প্রদান" },
  s_xerox: { en: "Xerox / Photocopy", bn: "জেরক্স / ফটোকপি" },
  s_cashWith: { en: "Cash Withdrawal", bn: "নগদ টাকা তোলা" },
  s_print: { en: "Printing Services", bn: "প্রিন্টিং পরিষেবা" },
  s_lamination: { en: "Lamination", bn: "ল্যামিনেশন" },
  s_photo: { en: "Photo Print", bn: "ছবি প্রিন্ট" },
  s_trade: { en: "Trade Licence", bn: "ট্রেড লাইসেন্স" },
  s_udyam: { en: "Udyam Registration", bn: "উদ্যম নিবন্ধন" },
  s_vehicle: { en: "Vehicle Tax Payment", bn: "গাড়ির ট্যাক্স প্রদান" },
  s_cmc: { en: "CMC Vellore Appointment", bn: "CMC ভেলোর অ্যাপয়েন্টমেন্ট" },
  s_driver: { en: "Driver Authorization", bn: "চালক অনুমোদন" },
  s_allTypes: { en: "All Types of Online Applications", bn: "সব ধরনের অনলাইন আবেদন" },
};

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("app_lang") as Language;
    if (saved === "en" || saved === "bn") {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("app_lang", newLang);
  };

  const t = (key: string): string => {
    if (!dictionary[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return dictionary[key][lang];
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
