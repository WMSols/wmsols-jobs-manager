"use client";
import { use, useEffect, useState } from "react";
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
  Briefcase,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getApplicationById, updateApplicationStatus, JobApplication } from "@/lib/strapi-job-applications";

// Fallback logic specific URL structure
const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

export default function ApplicationDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  
  const [candidate, setCandidate] = useState<JobApplication | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const response = await getApplicationById(resolvedParams.id);
        setCandidate(response.data);
      } catch (error) {
        console.error("Failed to fetch candidate details", error);
        // Fallback for development testing
        setCandidate({
          id: 1,
          documentId: resolvedParams.id,
          name: "Alice Johnson (Fallback)",
          title: "Frontend Developer",
          currentStatus: "Pending",
          email: "alice.johnson@example.com",
          phone: 15551234567,
          createdAt: "2023-10-24T00:00:00.000Z",
          coverLetter: null
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCandidate();
  }, [resolvedParams.id]);

  const handleStatusUpdate = async (newStatus: "Shortlisted" | "Rejected" | "Replied") => {
    if (!candidate) return;
    setIsUpdating(true);
    try {
      const response = await updateApplicationStatus(candidate.documentId, newStatus);
      // Update local state to reflect the change instantly
      setCandidate({ ...candidate, currentStatus: response.data.currentStatus });
    } catch (error) {
      console.error(`Failed to update status to ${newStatus}`, error);
      // Optimistic update fallback for UI testing if backend fails
      setCandidate({ ...candidate, currentStatus: newStatus });
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusBadge = (status: string | null) => {
    const s = status || "Pending";
    switch (s) {
      case "Pending": 
        return <Badge variant="outline" className="text-blue-600 dark:text-blue-400 border-transparent bg-blue-50 dark:bg-blue-500/10 rounded-full px-3 py-0.5 font-medium">Pending</Badge>;
      case "Shortlisted": 
        return <Badge variant="outline" className="text-green-600 dark:text-green-400 border-transparent bg-green-50 dark:bg-green-500/10 rounded-full px-3 py-0.5 font-medium">Shortlisted</Badge>;
      case "Replied": 
        return <Badge variant="outline" className="text-purple-600 dark:text-purple-400 border-transparent bg-purple-50 dark:bg-purple-500/10 rounded-full px-3 py-0.5 font-medium">Replied</Badge>;
      case "Rejected": 
        return <Badge variant="outline" className="text-slate-500 dark:text-slate-400 border-transparent bg-slate-100 dark:bg-slate-800 rounded-full px-3 py-0.5 font-medium">Rejected</Badge>;
      default: 
        return <Badge variant="outline" className="rounded-full px-3 py-0.5">{s}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!candidate) return <div>Candidate not found.</div>;

  // Construct full URL for the resume if it exists
  const documentUrl = candidate.resume 
    ? `${API_URL}${candidate.resume.url}` 
    : "/test.pdf"; // Fallback to local test.pdf if no resume attached

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto pb-12">
      
      {/* Top Navigation & Actions */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <Link href="/applications">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <ArrowLeft size={18} />
            </Button>
          </Link>
          <div className="flex flex-wrap items-center text-sm text-slate-500 dark:text-slate-400 gap-2">
            <Link href="/applications" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">Applications</Link>
            <span className="text-slate-300 dark:text-slate-600">/</span>
            <span className="font-semibold text-slate-900 dark:text-white tracking-tight">{candidate.name}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 md:gap-3 w-full md:w-auto mt-2 md:mt-0">
          <Button 
            onClick={() => handleStatusUpdate("Replied")}
            disabled={isUpdating}
            className="flex-1 md:flex-none bg-slate-800 dark:bg-slate-800 hover:bg-slate-900 dark:hover:bg-slate-700 text-white rounded-xl shadow-sm transition-all h-10 px-4 disabled:opacity-50"
          >
            <Mail className="mr-2 h-4 w-4" /> Replied
          </Button>
          <Button 
            onClick={() => handleStatusUpdate("Rejected")}
            disabled={isUpdating}
            className="flex-1 md:flex-none bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-sm transition-all h-10 px-4 disabled:opacity-50"
          >
            <XCircle className="mr-2 h-4 w-4" /> Reject
          </Button>
          <Button 
            onClick={() => handleStatusUpdate("Shortlisted")}
            disabled={isUpdating}
            className="w-full sm:w-auto flex-none bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-[0_4px_14px_0_rgba(34,197,94,0.39)] hover:shadow-[0_6px_20px_rgba(34,197,94,0.23)] hover:-translate-y-0.5 transition-all duration-200 h-10 px-5 disabled:opacity-50 disabled:hover:translate-y-0"
          >
            <CheckCircle className="mr-2 h-4 w-4" /> Shortlist
          </Button>
        </div>
      </header>

      {/* Candidate Details Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 md:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{candidate.name}</h1>
              {getStatusBadge(candidate.currentStatus)}
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
              <Briefcase size={16} className="text-blue-500" />
              Applying for <span className="text-slate-900 dark:text-slate-200 font-semibold">{candidate.title}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm bg-slate-50 dark:bg-slate-950 rounded-xl p-5 border border-slate-200 dark:border-slate-800/60 w-full lg:w-auto">
            <div className="space-y-1">
              <span className="text-slate-400 dark:text-slate-500 text-[11px] uppercase tracking-wider font-semibold">Email</span>
              <div className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300 break-all">
                <Mail size={14} className="text-slate-400 dark:text-slate-500 shrink-0" />
                {candidate.email}
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 dark:text-slate-500 text-[11px] uppercase tracking-wider font-semibold">Phone</span>
              <div className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300">
                <Phone size={14} className="text-slate-400 dark:text-slate-500 shrink-0" />
                {candidate.phone}
              </div>
            </div>
            <div className="space-y-1 sm:col-span-2 mt-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 dark:text-slate-500 text-[11px] uppercase tracking-wider font-semibold">Applied On</span>
              <div className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300">
                <Calendar size={14} className="text-slate-400 dark:text-slate-500 shrink-0" />
                {new Date(candidate.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Document Viewer */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <FileText size={18} className="text-blue-500" />
            Resume Document
          </h2>
          <a href={documentUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="h-9 w-full sm:w-auto text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
              <Download size={14} className="mr-2" />
              Download Original
            </Button>
          </a>
        </div>

        <div className="bg-slate-200/50 dark:bg-slate-950 rounded-2xl p-2 sm:p-4 md:p-8 border border-slate-200 dark:border-slate-800 shadow-inner flex justify-center">
          <div className="w-full max-w-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden h-[60vh] md:h-[800px] relative">
            <iframe 
              src={`${documentUrl}#toolbar=0&navpanes=0`} 
              className="w-full h-full absolute inset-0 border-none bg-white"
              title="Resume Viewer"
            />
            {/* Fallback */}
            <object data={documentUrl} type="application/pdf" className="w-full h-full absolute inset-0 bg-white">
              <div className="flex flex-col items-center justify-center h-full text-slate-500 dark:text-slate-400 space-y-4 p-6 text-center">
                <FileText size={48} className="text-slate-300 dark:text-slate-600" />
                <p>Your browser does not support inline PDFs.</p>
                <a href={documentUrl} className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 font-medium hover:underline">Download the PDF to view it.</a>
              </div>
            </object>
          </div>
        </div>
      </div>
    </div>
  );
}