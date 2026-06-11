"use client";
import { useState } from "react";
import { MoreHorizontal, FileText, CheckCircle, XCircle, Mail, ChevronRight, Search } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Updated mock data with new statuses
const applicants = [
  { id: 1, name: "Alice Johnson", role: "Frontend Developer", date: "Oct 24, 2023", status: "Pending", email: "alice@example.com", phone: "+1 234 567 890" },
  { id: 2, name: "Bob Smith", role: "Backend Engineer", date: "Oct 23, 2023", status: "Shortlisted", email: "bob@example.com", phone: "+1 987 654 321" },
  { id: 3, name: "Charlie Davis", role: "UI Designer", date: "Oct 21, 2023", status: "Rejected", email: "charlie@example.com", phone: "+1 555 666 777" },
  { id: 4, name: "Diana Prince", role: "Product Manager", date: "Oct 20, 2023", status: "Replied", email: "diana@example.com", phone: "+1 444 333 222" },
  { id: 5, name: "Evan Wright", role: "Frontend Developer", date: "Oct 19, 2023", status: "Pending", email: "evan@example.com", phone: "+1 111 222 333" },
];

const tabs = ["All", "Pending", "Shortlisted", "Replied", "Rejected"];

export default function ApplicationsPage() {
  const [selectedApplicant, setSelectedApplicant] = useState<typeof applicants[0] | null>(null);
  const [activeTab, setActiveTab] = useState("All");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending": 
        return <Badge variant="outline" className="text-blue-600 border-transparent bg-blue-50 hover:bg-blue-50 rounded-full px-3 font-medium">Pending</Badge>;
      case "Shortlisted": 
        return <Badge variant="outline" className="text-green-600 border-transparent bg-green-50 hover:bg-green-50 rounded-full px-3 font-medium">Shortlisted</Badge>;
      case "Replied": 
        return <Badge variant="outline" className="text-purple-600 border-transparent bg-purple-50 hover:bg-purple-50 rounded-full px-3 font-medium">Replied</Badge>;
      case "Rejected": 
        return <Badge variant="outline" className="text-slate-500 border-transparent bg-slate-100 hover:bg-slate-100 rounded-full px-3 font-medium">Rejected</Badge>;
      default: 
        return <Badge variant="outline" className="rounded-full px-3">{status}</Badge>;
    }
  };

  // Filter logic
  const filteredApplicants = applicants.filter(
    (app) => activeTab === "All" || app.status === activeTab
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header & Breadcrumb */}
      <header className="flex items-center justify-between pb-6 border-b border-slate-100/80">
        <div className="flex items-center text-sm text-slate-500 space-x-2">
          <span className="hover:text-slate-800 transition-colors cursor-pointer">Dashboard</span>
          <ChevronRight size={14} className="text-slate-300" />
          <span className="font-semibold text-slate-900 tracking-tight">Applications</span>
        </div>
      </header>

      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Custom Pill Tabs */}
        <div className="flex items-center p-1 bg-slate-100/50 border border-slate-100 rounded-xl w-fit">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === tab
                  ? "bg-white text-blue-600 shadow-sm border border-slate-200/50"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-100/50 border border-transparent"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Placeholder (Optional visual addition for a modern dashboard) */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search candidates..." 
            className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* DataTable */}
      <div className="rounded-2xl border border-slate-100/80 bg-white shadow-[0_2px_10px_-3px_rgba(0,0,0,0.03)] overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="hover:bg-transparent border-slate-100/80">
              <TableHead className="text-slate-600 font-medium h-12 px-6">Candidate Name</TableHead>
              <TableHead className="text-slate-600 font-medium h-12">Applied Role</TableHead>
              <TableHead className="text-slate-600 font-medium h-12">Date</TableHead>
              <TableHead className="text-slate-600 font-medium h-12">Status</TableHead>
              <TableHead className="text-right text-slate-600 font-medium h-12 px-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplicants.length > 0 ? (
              filteredApplicants.map((app) => (
                <TableRow key={app.id} className="border-slate-100/80 hover:bg-slate-50/50 transition-colors group">
                  <TableCell className="font-medium text-slate-900 px-6 py-4">{app.name}</TableCell>
                  <TableCell className="text-slate-500">{app.role}</TableCell>
                  <TableCell className="text-slate-500">{app.date}</TableCell>
                  <TableCell>{getStatusBadge(app.status)}</TableCell>
                  <TableCell className="text-right px-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-blue-600 hover:bg-blue-50 rounded-full">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 bg-white text-slate-900 border-slate-100 rounded-xl shadow-lg p-1.5">
                        <DropdownMenuItem onClick={() => setSelectedApplicant(app)} className="cursor-pointer rounded-lg hover:bg-slate-50">
                          <FileText className="mr-2 h-4 w-4 text-slate-400" /> View Resume
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer rounded-lg hover:bg-slate-50">
                          <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Shortlist
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer rounded-lg hover:bg-slate-50">
                          <Mail className="mr-2 h-4 w-4 text-purple-500" /> Reply via Email
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 rounded-lg mt-1">
                          <XCircle className="mr-2 h-4 w-4" /> Reject
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-slate-500">
                  No applications found in this category.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Resume Viewer Modal */}
      <Dialog open={!!selectedApplicant} onOpenChange={(open) => !open && setSelectedApplicant(null)}>
        <DialogContent className="max-w-[80vw] w-full h-[85vh] p-0 gap-0 overflow-hidden bg-white rounded-2xl border-slate-100 shadow-2xl">
          <div className="flex h-full w-full">
            {/* 70% Left: PDF Viewer Placeholder */}
            <div className="w-[70%] bg-slate-50 border-r border-slate-100 flex items-center justify-center relative">
              <div className="absolute top-4 left-4 flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="text-slate-400 flex flex-col items-center gap-4">
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <FileText size={48} className="text-blue-100" />
                </div>
                <p className="font-medium text-slate-500">PDF Viewer Placeholder</p>
              </div>
            </div>
            
            {/* 30% Right: Sticky Sidebar */}
            <div className="w-[30%] p-8 flex flex-col bg-white overflow-y-auto">
              <DialogHeader className="mb-8 space-y-1.5 text-left">
                <DialogTitle className="text-2xl font-semibold text-slate-900 tracking-tight">{selectedApplicant?.name}</DialogTitle>
                <p className="text-sm font-medium text-blue-500">{selectedApplicant?.role}</p>
                <div className="pt-2">{selectedApplicant && getStatusBadge(selectedApplicant.status)}</div>
              </DialogHeader>

              <div className="space-y-6 text-sm text-slate-600 mb-8">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-4">
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">Email Address</span>
                    <span className="text-slate-900 font-medium">{selectedApplicant?.email}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">Phone Number</span>
                    <span className="text-slate-900 font-medium">{selectedApplicant?.phone}</span>
                  </div>
                </div>
                
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-2">Cover Letter</span>
                  <p className="leading-relaxed text-slate-500 bg-white p-1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                  </p>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-slate-100/80 space-y-3">
                <Button className="w-full h-11 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.23)] hover:-translate-y-0.5 transition-all duration-200">
                  <CheckCircle className="mr-2 h-4 w-4" /> Shortlist Application
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="w-full h-11 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50">
                    <Mail className="mr-2 h-4 w-4" /> Reply
                  </Button>
                  <Button variant="outline" className="w-full h-11 rounded-xl border-slate-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-200">
                    <XCircle className="mr-2 h-4 w-4" /> Reject
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}