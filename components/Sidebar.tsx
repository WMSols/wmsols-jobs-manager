"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, FileText } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Jobs", href: "/jobs", icon: Briefcase },
    { name: "Applications", href: "/applications", icon: FileText },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-slate-200 bg-white/50 backdrop-blur-sm p-4">
      <a href="/" className="mb-8 border-b pb-4 h-30 flex flex-col text-slate-900 text-lg font-bold mt-3">
<span className=" flex gap-1 text-blue-500">
        <span 
      className="w-6 h-6 rounded flex items-center justify-center font-bold text-white text-lg mb-2"
      style={{ background: 'linear-gradient(to top, #2868A3 0%, #3DA8FF 56%, #1C1344 150%)' }}
    >
      W
    </span>WMsols
</span>
       Career Management
      </a>
      <nav className="space-y-2 mt-4">
        {links.map((link) => {
          const isActive = pathname.startsWith(link.href);
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-500"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Icon size={18} />
              {link.name}
            </Link>
          );
        })}
      </nav>
      {/* Theme Toggle at the bottom */}
    <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
      <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Theme</span>
      <ThemeToggle />
    </div>
    </aside>
  );
}