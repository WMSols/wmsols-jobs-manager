"use client";
import { useState } from "react";
import { MoreHorizontal, FileText, CheckCircle, XCircle, Mail, ChevronRight } from "lucide-react";
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

const applicants = [
  { id: 1, name: "Alice Johnson", role: "Frontend Developer", date: "Oct 24, 2023", status: "New", email: "alice@example.com", phone: "+1 234 567 890" },
  { id: 2, name: "Bob Smith", role: "Backend Engineer", date: "Oct 23, 2023", status: "Shortlisted", email: "bob@example.com", phone: "+1 987 654 321" },
  { id: 3, name: "Charlie Davis", role: "UI Designer", date: "Oct 21, 2023", status: "Rejected", email: "charlie@example.com", phone: "+1 555 666 777" },
];

export default function ApplicationsPage() {
  const [selectedApplicant, setSelectedApplicant] = useState<typeof applicants[0] | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "New": return <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">New</Badge>;
      case "Shortlisted": return <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Shortlisted</Badge>;
      case "Rejected": return <Badge variant="outline" className="text-slate-500 border-slate-200 bg-slate-100">Rejected</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Breadcrumb */}
      <header className="flex items-center text-sm text-slate-500 space-x-2 pb-4 border-b border-slate-200">
        <span>Dashboard</span>
        <ChevronRight size={14} />
        <span className="font-medium text-slate-900">Applications</span>
      </header>

      {/* DataTable */}
      <div className="rounded-md border border-slate-200 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-slate-900 font-medium">Name</TableHead>
              <TableHead className="text-slate-900 font-medium">Applied Role</TableHead>
              <TableHead className="text-slate-900 font-medium">Date</TableHead>
              <TableHead className="text-slate-900 font-medium">Status</TableHead>
              <TableHead className="text-right text-slate-900 font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applicants.map((app) => (
              <TableRow key={app.id}>
                <TableCell className="font-medium text-slate-900">{app.name}</TableCell>
                <TableCell className="text-slate-600">{app.role}</TableCell>
                <TableCell className="text-slate-600">{app.date}</TableCell>
                <TableCell>{getStatusBadge(app.status)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0 text-slate-600 hover:text-blue-500">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 bg-white text-slate-900">
                      <DropdownMenuItem onClick={() => setSelectedApplicant(app)} className="cursor-pointer">
                        <FileText className="mr-2 h-4 w-4 text-slate-500" /> View Resume
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <CheckCircle className="mr-2 h-4 w-4 text-slate-500" /> Shortlist
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
                        <XCircle className="mr-2 h-4 w-4" /> Reject
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Mail className="mr-2 h-4 w-4 text-slate-500" /> Reply via Email
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Resume Viewer Modal */}
      <Dialog open={!!selectedApplicant} onOpenChange={(open) => !open && setSelectedApplicant(null)}>
        <DialogContent className="max-w-[80vw] w-full h-[85vh] p-0 gap-0 overflow-hidden bg-white">
          <div className="flex h-full w-full">
            {/* 70% Left: PDF Viewer Placeholder */}
            <div className="w-[70%] bg-slate-100 border-r border-slate-200 flex items-center justify-center">
              <div className="text-slate-400 flex flex-col items-center gap-2">
                <FileText size={48} className="text-slate-300" />
                <p>PDF Viewer Component Placeholder</p>
              </div>
            </div>
            
            {/* 30% Right: Sticky Sidebar */}
            <div className="w-[30%] p-6 flex flex-col bg-white overflow-y-auto">
              <DialogHeader className="mb-6 space-y-1">
                <DialogTitle className="text-2xl font-semibold text-slate-900">{selectedApplicant?.name}</DialogTitle>
                <p className="text-sm font-medium text-blue-500">{selectedApplicant?.role}</p>
              </DialogHeader>

              <div className="space-y-4 text-sm text-slate-600 mb-8">
                <div>
                  <span className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">Email</span>
                  {selectedApplicant?.email}
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">Phone</span>
                  {selectedApplicant?.phone}
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">Cover Letter</span>
                  <p className="leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-slate-100">
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white shadow-sm">
                  Shortlist Application
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}