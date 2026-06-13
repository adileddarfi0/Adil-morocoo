 'use client';

import { useState, useEffect } from 'react';
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { 
  Settings as SettingsIcon, Globe, Palette, Shield, 
  Bell, LogOut, Moon, Sun, ChevronRight, Check,
  Smartphone, Languages, Lock, Layout, Radius
} from "lucide-react";
import { useUser, useAuth, useFirestore, useDoc } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const { user } = useUser();
  const db = useFirestore();
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isAr, setIsAr] = useState(false);

  const { data: userData } = useDoc(user ? doc(db, "users", user.uid) : null);

  useEffect(() => {
    setIsAr(localStorage.getItem('app-lang') === 'ar');
  }, []);

  const handleUpdateTheme = (key: string, value: string) => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    updateDoc(userRef, {
      [`themeSettings.${key}`]: value
    });
  };

  const handleLanguageToggle = () => {
    const newLang = isAr ? 'en' : 'ar';
    localStorage.setItem('app-lang', newLang);
    document.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    window.location.reload();
  };

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/login');
  };

  const colors = [
    { name: 'Saffron', hsl: '17 76% 56%' },
    { name: 'Atlas Blue', hsl: '210 70% 50%' },
    { name: 'Emerald', hsl: '142 70% 45%' },
    { name: 'Gnaoua Purple', hsl: '270 60% 50%' },
    { name: 'Rose', hsl: '345 75% 42%' }
  ];

  return (
    <div className="min-h-screen pb-20 pt-4 md:pt-24 bg-background">
      <Navbar />
      <main className="container mx-auto max-w-4xl px-4 space-y-8">
        <div className="flex items-center gap-4 mb-10">
           <div className="p-3 rounded-2xl bg-primary/20 text-primary shadow-xl shadow-primary/10">
              <SettingsIcon className="h-8 w-8" />
           </div>
           <div>
              <h1 className="font-headline text-4xl">{isAr ? "الإعدادات" : "Settings"}</h1>
              <p className="text-muted-foreground text-xs uppercase tracking-widest font-bold opacity-60">
                 {isAr ? "تحكم في مملكتك الخاصة" : "Govern your personal kingdom"}
              </p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
           {/* Sidebar Navigation */}
           <div className="md:col-span-4 space-y-2">
              <Card className="bg-card/40 border-white/5 rounded-3xl overflow-hidden p-2">
                 {[
                   { icon: Smartphone, label: isAr ? "المظهر" : "Appearance", active: true },
                   { icon: Languages, label: isAr ? "اللغة" : "Language" },
                   { icon: Bell, label: isAr ? "التنبيهات" : "Notifications" },
                   { icon: Lock, label: isAr ? "الخصوصية" : "Privacy" }
                 ].map((item, i) => (
                   <button key={i} className={cn(
                     "w-full flex items-center justify-between p-4 rounded-2xl transition-all font-bold text-sm",
                     item.active ? "bg-primary text-white shadow-lg" : "hover:bg-white/5 text-muted-foreground"
                   )}>
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </div>
                      <ChevronRight className="h-4 w-4 opacity-40" />
                   </button>
                 ))}
              </Card>
              
              <Button 
                variant="destructive" 
                className="w-full h-14 rounded-3xl font-bold gap-2 mt-4 shadow-xl shadow-destructive/20"
                onClick={handleSignOut}
              >
                <LogOut className="h-5 w-5" />
                {isAr ? "مغادرة القبيلة" : "Leave the Tribe"}
              </Button>
           </div>

           {/* Content Area */}
           <div className="md:col-span-8 space-y-6">
              <Card className="bg-card/40 border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden">
                <CardHeader className="p-8 border-b border-white/5">
                   <div className="flex items-center gap-3 text-primary mb-2">
                      <Palette className="h-5 w-5" />
                      <CardTitle className="font-headline text-2xl">{isAr ? "مظهر المملكة" : "Kingdom Appearance"}</CardTitle>
                   </div>
                   <CardDescription>{isAr ? "اختر الألوان والأنماط التي تناسب ذوقك." : "Choose colors and styles that fit your taste."}</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                   <div className="space-y-4">
                      <Label className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground">{isAr ? "اللون الأساسي" : "Primary Color"}</Label>
                      <div className="flex flex-wrap gap-4">
                         {colors.map(color => (
                           <button 
                            key={color.name}
                            onClick={() => handleUpdateTheme('primaryColor', color.hsl)}
                            className={cn(
                              "h-12 w-12 rounded-full border-4 transition-all shadow-lg",
                              userData?.themeSettings?.primaryColor === color.hsl ? "border-white scale-110" : "border-transparent"
                            )}
                            style={{ backgroundColor: `hsl(${color.hsl})` }}
                           />
                         ))}
                      </div>
                   </div>

                   <div className="space-y-4">
                      <div className="flex items-center justify-between">
                         <div className="space-y-1">
                            <Label className="text-sm font-bold">{isAr ? "زوايا حادة" : "Border Radius"}</Label>
                            <p className="text-[10px] text-muted-foreground">{isAr ? "تحكم في انحناء حواف الواجهة" : "Control the curvature of the UI edges"}</p>
                         </div>
                         <div className="flex gap-2">
                            {['0rem', '0.75rem', '1.5rem', '2.5rem'].map(r => (
                              <button 
                                key={r}
                                onClick={() => handleUpdateTheme('borderRadius', r)}
                                className={cn(
                                  "h-10 px-4 rounded-xl border border-white/10 text-[10px] font-bold transition-all",
                                  userData?.themeSettings?.borderRadius === r ? "bg-primary text-white" : "bg-white/5 text-muted-foreground"
                                )}
                              >
                                {r === '0rem' ? (isAr ? 'حاد' : 'Sharp') : r}
                              </button>
                            ))}
                         </div>
                      </div>
                   </div>

                   <div className="pt-6 border-t border-white/5 space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <Globe className="h-5 w-5 text-blue-500" />
                           <div className="space-y-0.5">
                              <p className="text-sm font-bold">{isAr ? "اللغة العربية" : "Arabic Language"}</p>
                              <p className="text-[10px] text-muted-foreground">{isAr ? "تبديل لغة الواجهة بالكامل" : "Switch interface language entirely"}</p>
                           </div>
                        </div>
                        <Switch checked={isAr} onCheckedChange={handleLanguageToggle} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <Moon className="h-5 w-5 text-indigo-400" />
                           <div className="space-y-0.5">
                              <p className="text-sm font-bold">{isAr ? "الوضع الليلي" : "Dark Mode"}</p>
                              <p className="text-[10px] text-muted-foreground">{isAr ? "مفعل دائماً في عادل للأصالة" : "Always active in Adil for authenticity"}</p>
                           </div>
                        </div>
                        <Switch checked disabled />
                      </div>
                   </div>
                </CardContent>
              </Card>

              <div className="p-8 bg-card/20 rounded-[2.5rem] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                 <div className="flex items-center gap-4 text-center md:text-left">
                    <div className="p-3 rounded-2xl bg-green-500/20 text-green-500">
                       <Shield className="h-6 w-6" />
                    </div>
                    <div>
                       <p className="font-bold text-sm">{isAr ? "الأمان والخصوصية" : "Security & Privacy"}</p>
                       <p className="text-[10px] text-muted-foreground">{isAr ? "بياناتك مشفرة بذكاء مغربي أصيل" : "Your data is encrypted with authentic Moroccan intelligence"}</p>
                    </div>
                 </div>
                 <Button variant="outline" className="rounded-xl border-white/10 h-10 px-6 font-bold">{isAr ? "إدارة" : "Manage"}</Button>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
      }
