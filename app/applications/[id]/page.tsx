"use client";
import { use } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Mail, 
  CheckCircle, 
  XCircle, 
  FileText, 
  Download,
  Calendar,
  Phone,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ApplicationDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  // Next.js 15 requires unwrapping the params Promise
  const resolvedParams = use(params);

  // Mock data for the view
  const candidate = {
    id: resolvedParams.id,
    name: "Alice Johnson",
    role: "Frontend Developer",
    status: "Pending",
    email: "alice.johnson@example.com",
    phone: "+1 (555) 123-4567",
    appliedDate: "Oct 24, 2023",
    experience: "4 Years",
    documentUrl: "/test.pdf" 
  };

  const getStatusBadge = (status: string) => {
    return (
      <Badge variant="outline" className="text-blue-600 border-transparent bg-blue-50 rounded-full px-3 py-0.5 font-medium">
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto pb-12">
      {/* Top Navigation & Prominent Action Buttons */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100/80">
        <div className="flex items-center gap-4">
          <Link href="/applications">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100">
              <ArrowLeft size={18} />
            </Button>
          </Link>
          <div className="flex items-center text-sm text-slate-500 space-x-2">
            <Link href="/applications" className="hover:text-slate-800 transition-colors">Applications</Link>
            <span className="text-slate-300">/</span>
            <span className="font-semibold text-slate-900 tracking-tight">{candidate.name}</span>
          </div>
        </div>

        {/* Moved Actions to Top with Prominent Colors */}
        <div className="flex items-center gap-3">
          <Button className="bg-slate-800 hover:bg-slate-900 text-white rounded-xl shadow-sm transition-all h-10 px-4">
            <Mail className="mr-2 h-4 w-4" /> Reply
          </Button>
          <Button className="bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-sm transition-all h-10 px-4">
            <XCircle className="mr-2 h-4 w-4" /> Reject
          </Button>
          <Button className="bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-[0_4px_14px_0_rgba(34,197,94,0.39)] hover:shadow-[0_6px_20px_rgba(34,197,94,0.23)] hover:-translate-y-0.5 transition-all duration-200 h-10 px-5">
            <CheckCircle className="mr-2 h-4 w-4" /> Shortlist
          </Button>
        </div>
      </header>

      {/* Candidate Details Card */}
      <div className="bg-white rounded-2xl border border-slate-100/80 p-8 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.03)]">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{candidate.name}</h1>
              {getStatusBadge(candidate.status)}
            </div>
            <p className="text-slate-500 font-medium flex items-center gap-2">
              <Briefcase size={16} className="text-blue-500" />
              Applying for <span className="text-slate-900 font-semibold">{candidate.role}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm bg-slate-50 rounded-xl p-5 border border-slate-100/80">
            <div className="space-y-1">
              <span className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold">Email</span>
              <div className="flex items-center gap-2 font-medium text-slate-700">
                <Mail size={14} className="text-slate-400" />
                {candidate.email}
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold">Phone</span>
              <div className="flex items-center gap-2 font-medium text-slate-700">
                <Phone size={14} className="text-slate-400" />
                {candidate.phone}
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold">Applied On</span>
              <div className="flex items-center gap-2 font-medium text-slate-700">
                <Calendar size={14} className="text-slate-400" />
                {candidate.appliedDate}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Document Viewer */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900 tracking-tight flex items-center gap-2">
            <FileText size={18} className="text-blue-500" />
            Resume Document
          </h2>
          <Button variant="outline" size="sm" className="h-8 text-slate-500 border-slate-200 hover:bg-slate-50 rounded-lg">
            <Download size={14} className="mr-2" />
            Download Original
          </Button>
        </div>

        <div className="bg-slate-200/50 rounded-2xl p-4 sm:p-8 border border-slate-100 shadow-inner flex justify-center">
          <div className="w-full max-w-3xl bg-white shadow-xl border border-slate-200 rounded-lg overflow-hidden h-[800px] relative">
            <iframe 
              src={`${candidate.documentUrl}#toolbar=0&navpanes=0`} 
              className="w-full h-full absolute inset-0 border-none"
              title="Resume Viewer"
            />
            <object data={candidate.documentUrl} type="application/pdf" className="w-full h-full absolute inset-0">
              <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-4">
                <FileText size={48} className="text-slate-300" />
                <p>Your browser does not support inline PDFs.</p>
                <a href={candidate.documentUrl} className="text-blue-500 hover:underline font-medium">Download the PDF to view it.</a>
              </div>
            </object>
          </div>
        </div>
      </div>
    </div>
  );
}