"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, ChevronRight, MapPin, Search, ArrowRight, Loader2, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getJobPosts, createJobPost, textToBlocks, JobPost, PaginationMeta } from "@/lib/strapi-job-posts";

export default function JobsPage() {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pagination, setPagination] = useState<PaginationMeta>({ page: 1, pageCount: 1, pageSize: 25, total: 0 });

  const [formData, setFormData] = useState({
    title: "", domain: "", location: "", type: "", skills: "", extras: "",
    overview: "", responsiblities: "", requirements: "", benefits: ""
  });

  const fetchJobs = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await getJobPosts(page);
      setJobs(response.data);
      setPagination(response.meta.pagination);
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchJobs(1); }, []);

  const handleCreateJob = async () => {
    setIsSubmitting(true);
    try {
      await createJobPost({
        title: formData.title,
        domain: formData.domain,
        location: formData.location,
        type: formData.type,
        skills: formData.skills,
        extras: formData.extras,
        overview: textToBlocks(formData.overview),
        responsiblities: textToBlocks(formData.responsiblities),
        requirements: textToBlocks(formData.requirements),
        benefits: textToBlocks(formData.benefits),
      });
      setIsDialogOpen(false);
      setFormData({ title: "", domain: "", location: "", type: "", skills: "", extras: "", overview: "", responsiblities: "", requirements: "", benefits: "" });
      fetchJobs(1); 
    } catch (error) {
      console.error("Failed to create job", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 space-x-2">
          <Link href="/" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer">Dashboard</Link>
          <ChevronRight size={14} className="text-slate-300 dark:text-slate-600" />
          <span className="font-semibold text-slate-900 dark:text-white tracking-tight">Jobs</span>
        </div>
        
        {/* SWAPPED TO DIALOG FOR CENTERED MODAL */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white shadow-sm rounded-xl px-5 h-10">
              <Plus className="mr-2 h-4 w-4" /> Create New Job
            </Button>
          </DialogTrigger>
          
          <DialogContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 w-full sm:max-w-4xl h-[100dvh] sm:h-[90vh] p-6 md:p-10 overflow-y-auto sm:rounded-3xl shadow-2xl">
            <DialogHeader className="mb-8">
              <DialogTitle className="text-slate-900 dark:text-white text-3xl font-bold tracking-tight">Create New Job</DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Job Title</Label>
                  <Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 rounded-xl h-12 text-base" />
                </div>
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Domain (Department)</Label>
                  <Input value={formData.domain} onChange={e => setFormData({...formData, domain: e.target.value})} className="border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 rounded-xl h-12 text-base" />
                </div>
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Location</Label>
                  <Input value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 rounded-xl h-12 text-base" />
                </div>
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Employment Type</Label>
                  <Input value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 rounded-xl h-12 text-base" />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Overview</Label>
                <textarea value={formData.overview} onChange={e => setFormData({...formData, overview: e.target.value})} className="flex min-h-[120px] w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Responsibilities (1 per line)</Label>
                <textarea value={formData.responsiblities} onChange={e => setFormData({...formData, responsiblities: e.target.value})} className="flex min-h-[120px] w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Requirements (1 per line)</Label>
                <textarea value={formData.requirements} onChange={e => setFormData({...formData, requirements: e.target.value})} className="flex min-h-[120px] w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Benefits (1 per line)</Label>
                <textarea value={formData.benefits} onChange={e => setFormData({...formData, benefits: e.target.value})} className="flex min-h-[120px] w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Skills (Comma separated)</Label>
                  <Input value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} className="border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 rounded-xl h-12 text-base" />
                </div>
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Extras (Nice to have)</Label>
                  <Input value={formData.extras} onChange={e => setFormData({...formData, extras: e.target.value})} className="border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 rounded-xl h-12 text-base" />
                </div>
              </div>

              <div className="pt-8 pb-4">
                <Button disabled={isSubmitting} onClick={handleCreateJob} className="w-full h-14 font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition-all disabled:opacity-50">
                  {isSubmitting ? "Publishing..." : "Publish Job Posting"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </header>

      <div className="w-full overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col min-h-[400px]">
        <Table className="w-full min-w-[700px]">
          <TableHeader className="bg-slate-50/50 dark:bg-slate-950/50">
            <TableRow className="hover:bg-transparent border-slate-200 dark:border-slate-800">
              <TableHead className="text-slate-600 dark:text-slate-400 font-medium h-12 px-6">Job Title</TableHead>
              <TableHead className="text-slate-600 dark:text-slate-400 font-medium h-12">Domain</TableHead>
              <TableHead className="text-slate-600 dark:text-slate-400 font-medium h-12">Location</TableHead>
              <TableHead className="text-slate-600 dark:text-slate-400 font-medium h-12">Type</TableHead>
              <TableHead className="text-right text-slate-600 dark:text-slate-400 font-medium h-12 px-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
               <TableRow><TableCell colSpan={5} className="h-48 text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-500" /></TableCell></TableRow>
            ) : jobs.length > 0 ? jobs.map((job) => (
              <TableRow key={job.documentId} className="border-slate-200 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <TableCell className="font-semibold text-slate-900 dark:text-slate-100 px-6 py-4">{job.title}</TableCell>
                <TableCell><Badge variant="secondary" className="bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-transparent font-medium rounded-full px-3 py-1">{job.domain}</Badge></TableCell>
                <TableCell className="text-slate-500 dark:text-slate-400"><div className="flex items-center gap-1.5"><MapPin size={14} className="text-slate-400" />{job.location}</div></TableCell>
                <TableCell className="text-slate-500 dark:text-slate-400">{job.type}</TableCell>
                <TableCell className="text-right px-6">
                  <Link href={`/jobs/${job.documentId}`}>
                    <Button className="bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl shadow-md transition-all h-9 px-4">
                      View Details <ArrowRight size={14} className="ml-2 opacity-70" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow><TableCell colSpan={5} className="h-48 text-center text-slate-500">No active jobs found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>

        {!isLoading && jobs.length > 0 && (
          <div className="mt-auto p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/30 dark:bg-slate-950/30">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Showing <span className="font-medium text-slate-900 dark:text-slate-200">{(pagination.page - 1) * pagination.pageSize + 1}</span> to <span className="font-medium text-slate-900 dark:text-slate-200">{Math.min(pagination.page * pagination.pageSize, pagination.total)}</span> of <span className="font-medium text-slate-900 dark:text-slate-200">{pagination.total}</span>
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => fetchJobs(pagination.page - 1)} disabled={pagination.page <= 1} className="h-8 rounded-lg border-slate-200 dark:border-slate-700"><ChevronLeft size={16} className="mr-1" /> Previous</Button>
              <Button variant="outline" size="sm" onClick={() => fetchJobs(pagination.page + 1)} disabled={pagination.page >= pagination.pageCount} className="h-8 rounded-lg border-slate-200 dark:border-slate-700">Next <ChevronRight size={16} className="ml-1" /></Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}