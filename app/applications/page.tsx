"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Search, ArrowRight, Loader2, ChevronLeft } from "lucide-react";
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
import { getFilteredJobApplications, JobApplication, PaginationMeta } from "@/lib/strapi-job-applications";

// Fallback Dummy Data
const dummyApplicants: JobApplication[] = [
  { id: 1, documentId: "doc1", name: "Alice Johnson", title: "Frontend Developer", createdAt: "2023-10-24T00:00:00.000Z", currentStatus: "Pending", email: "alice@example.com", phone: 1234567890, coverLetter: null },
  { id: 2, documentId: "doc2", name: "Bob Smith", title: "Backend Engineer", createdAt: "2023-10-23T00:00:00.000Z", currentStatus: "Shortlisted", email: "bob@example.com", phone: 9876543210, coverLetter: null },
  { id: 3, documentId: "doc3", name: "Charlie Davis", title: "UI Designer", createdAt: "2023-10-21T00:00:00.000Z", currentStatus: "Rejected", email: "charlie@example.com", phone: 5556667777, coverLetter: null },
];

const tabs = ["All", "Pending", "Shortlisted", "Replied", "Rejected"];

export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [applicants, setApplicants] = useState<JobApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationMeta>({ page: 1, pageCount: 1, pageSize: 25, total: 0 });

  const fetchApplications = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await getFilteredJobApplications(activeTab, page);
      setApplicants(response.data);
      setPagination(response.meta.pagination);
    } catch (error) {
      console.error("Failed to fetch applications, using fallback data", error);
      // Fallback logic
      const filteredDummy = activeTab === "All" 
        ? dummyApplicants 
        : dummyApplicants.filter(app => app.currentStatus === activeTab);
      setApplicants(filteredDummy);
      setPagination({ page: 1, pageCount: 1, pageSize: 25, total: filteredDummy.length });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications(1);
  }, [activeTab]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.pageCount) {
      fetchApplications(newPage);
    }
  };

  const getStatusBadge = (status: string | null) => {
    const s = status || "Pending";
    switch (s) {
      case "Pending": 
        return <Badge variant="outline" className="text-blue-600 border-transparent bg-blue-50 dark:bg-blue-500/10 dark:text-blue-400 rounded-full px-3 font-medium">Pending</Badge>;
      case "Shortlisted": 
        return <Badge variant="outline" className="text-green-600 border-transparent bg-green-50 dark:bg-green-500/10 dark:text-green-400 rounded-full px-3 font-medium">Shortlisted</Badge>;
      case "Replied": 
        return <Badge variant="outline" className="text-purple-600 border-transparent bg-purple-50 dark:bg-purple-500/10 dark:text-purple-400 rounded-full px-3 font-medium">Replied</Badge>;
      case "Rejected": 
        return <Badge variant="outline" className="text-slate-500 border-transparent bg-slate-100 dark:bg-slate-800 dark:text-slate-400 rounded-full px-3 font-medium">Rejected</Badge>;
      default: 
        return <Badge variant="outline" className="rounded-full px-3">{s}</Badge>;
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
      <header className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 space-x-2">
          <Link href="/" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer">Dashboard</Link>
          <ChevronRight size={14} className="text-slate-300 dark:text-slate-600" />
          <span className="font-semibold text-slate-900 dark:text-white tracking-tight">Applications</span>
        </div>
      </header>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
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
      </div>

      <div className="w-full overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col min-h-[400px]">
        <Table className="w-full min-w-[700px]">
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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-48 text-center">
                  <div className="flex flex-col items-center justify-center text-slate-400">
                    <Loader2 className="h-8 w-8 animate-spin mb-4 text-blue-500" />
                    <p>Fetching applications...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : applicants.length > 0 ? (
              applicants.map((app) => (
                <TableRow key={app.documentId} className="border-slate-200 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <TableCell className="font-medium text-slate-900 dark:text-slate-100 px-6 py-4">{app.name}</TableCell>
                  <TableCell className="text-slate-500 dark:text-slate-400">{app.title}</TableCell>
                  <TableCell className="text-slate-500 dark:text-slate-400">
                    {new Date(app.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </TableCell>
                  <TableCell>{getStatusBadge(app.currentStatus)}</TableCell>
                  <TableCell className="text-right px-6">
                    <Link href={`/applications/${app.documentId}`}>
                      <Button className="bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl shadow-md transition-all h-9 px-4">
                        View Details <ArrowRight size={14} className="ml-2 opacity-70" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-48 text-center text-slate-500 dark:text-slate-400">
                  No job applications found in this category.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
        {!isLoading && applicants.length > 0 && (
          <div className="mt-auto p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/30 dark:bg-slate-950/30">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Showing <span className="font-medium text-slate-900 dark:text-slate-200">{(pagination.page - 1) * pagination.pageSize + 1}</span> to <span className="font-medium text-slate-900 dark:text-slate-200">{Math.min(pagination.page * pagination.pageSize, pagination.total)}</span> of <span className="font-medium text-slate-900 dark:text-slate-200">{pagination.total}</span> results
            </p>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page <= 1}
                className="h-8 rounded-lg border-slate-200 dark:border-slate-700"
              >
                <ChevronLeft size={16} className="mr-1" /> Previous
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page >= pagination.pageCount}
                className="h-8 rounded-lg border-slate-200 dark:border-slate-700"
              >
                Next <ChevronRight size={16} className="ml-1" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}