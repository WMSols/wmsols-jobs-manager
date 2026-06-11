"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, FileText } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Jobs", href: "/jobs", icon: Briefcase },
    { name: "Applications", href: "/applications", icon: FileText },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-slate-200 bg-white/50 backdrop-blur-sm p-4">
      <div className="mb-8 font-semibold text-slate-900 text-xl tracking-tight">
        JobManager.
      </div>
      <nav className="space-y-2">
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
    </aside>
  );
}