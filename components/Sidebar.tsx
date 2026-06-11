"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Briefcase, FileText, Menu } from "lucide-react";
import { ThemeToggle } from "./theme-toggle"; 
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Overview", href: "/", icon: LayoutDashboard },
    { name: "Jobs", href: "/jobs", icon: Briefcase },
    { name: "Applications", href: "/applications", icon: FileText },
  ];

  const NavContent = () => (
    <>
      <div className="mb-8 font-semibold text-slate-900 dark:text-white text-xl tracking-tight px-3">
        Careers Management
      </div>
      <nav className="space-y-2 flex-1">
        {links.map((link) => {
          const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-50"
              }`}
            >
              <Icon size={18} />
              {link.name}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between px-3">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Theme</span>
        <ThemeToggle />
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Top Navbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md z-40 flex items-center justify-between px-4">
        <div className="font-semibold text-slate-900 dark:text-white text-lg tracking-tight">
          Careers Management
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-slate-600 dark:text-slate-300">
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-70 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 flex flex-col p-6">
            <NavContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-64 border-r border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm p-4 z-40">
        <NavContent />
      </aside>
    </>
  );
}