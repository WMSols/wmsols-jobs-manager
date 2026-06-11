"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const applicants = [
  { id: 1, name: "Alice Johnson", role: "Frontend Developer", date: "Oct 24, 2023", status: "Pending", email: "alice@example.com", phone: "+1 234 567 890" },
  { id: 2, name: "Bob Smith", role: "Backend Engineer", date: "Oct 23, 2023", status: "Shortlisted", email: "bob@example.com", phone: "+1 987 654 321" },
  { id: 3, name: "Charlie Davis", role: "UI Designer", date: "Oct 21, 2023", status: "Rejected", email: "charlie@example.com", phone: "+1 555 666 777" },
  { id: 4, name: "Diana Prince", role: "Product Manager", date: "Oct 20, 2023", status: "Replied", email: "diana@example.com", phone: "+1 444 333 222" },
  { id: 5, name: "Evan Wright", role: "Frontend Developer", date: "Oct 19, 2023", status: "Pending", email: "evan@example.com", phone: "+1 111 222 333" },
];

const tabs = ["All", "Pending", "Shortlisted", "Replied", "Rejected"];

export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState("All");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending": 
        return <Badge variant="outline" className="text-blue-600 border-transparent bg-blue-50 rounded-full px-3 font-medium">Pending</Badge>;
      case "Shortlisted": 
        return <Badge variant="outline" className="text-green-600 border-transparent bg-green-50 rounded-full px-3 font-medium">Shortlisted</Badge>;
      case "Replied": 
        return <Badge variant="outline" className="text-purple-600 border-transparent bg-purple-50 rounded-full px-3 font-medium">Replied</Badge>;
      case "Rejected": 
        return <Badge variant="outline" className="text-slate-500 border-transparent bg-slate-100 rounded-full px-3 font-medium">Rejected</Badge>;
      default: 
        return <Badge variant="outline" className="rounded-full px-3">{status}</Badge>;
    }
  };

  const filteredApplicants = applicants.filter(
    (app) => activeTab === "All" || app.status === activeTab
  );

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
      <header className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 space-x-2">
          <a href="/" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer">Dashboard</a>
          <ChevronRight size={14} className="text-slate-300 dark:text-slate-600" />
          <span className="font-semibold text-slate-900 dark:text-white tracking-tight">Applications</span>
        </div>
      </header>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Responsive Tabs: Wraps to next line on small screens */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl w-full md:w-fit">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 flex-1 md:flex-none ${
                activeTab === tab
                  ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200 dark:border-slate-700"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50 border border-transparent"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* Search Input */}
        {/* <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search candidates..." 
            className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div> */}
      </div>

      <div className="w-full overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <Table className="w-full min-w-175">
          <TableHeader className="bg-slate-50/50 dark:bg-slate-950/50">
            <TableRow className="hover:bg-transparent border-slate-200 dark:border-slate-800">
              <TableHead className="text-slate-600 dark:text-slate-400 font-medium h-12 px-6">Candidate Name</TableHead>
              <TableHead className="text-slate-600 dark:text-slate-400 font-medium h-12">Applied Role</TableHead>
              <TableHead className="text-slate-600 dark:text-slate-400 font-medium h-12">Date</TableHead>
              <TableHead className="text-slate-600 dark:text-slate-400 font-medium h-12">Status</TableHead>
              <TableHead className="text-right text-slate-600 dark:text-slate-400 font-medium h-12 px-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplicants.map((app) => (
              <TableRow key={app.id} className="border-slate-200 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <TableCell className="font-medium text-slate-900 dark:text-slate-100 px-6 py-4">{app.name}</TableCell>
                <TableCell className="text-slate-500 dark:text-slate-400">{app.role}</TableCell>
                <TableCell className="text-slate-500 dark:text-slate-400">{app.date}</TableCell>
                <TableCell>{getStatusBadge(app.status)}</TableCell>
                <TableCell className="text-right px-6">
                  <Link href={`/applications/${app.id}`}>
                    <Button className="bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl shadow-md transition-all h-9 px-4">
                      View Details <ArrowRight size={14} className="ml-2 opacity-70" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}