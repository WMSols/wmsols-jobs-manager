"use client";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Briefcase, MapPin, Clock, Edit, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getJobPostById, updateJobPost, deleteJobPost, blocksToText, textToBlocks, JobPost } from "@/lib/strapi-job-posts";

export default function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();

  const [job, setJob] = useState<JobPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "", domain: "", location: "", type: "", skills: "", extras: "",
    overview: "", responsiblities: "", requirements: "", benefits: ""
  });

  const fetchJob = async () => {
    try {
      const response = await getJobPostById(resolvedParams.id);
      setJob(response.data);
      setFormData({
        title: response.data.title,
        domain: response.data.domain,
        location: response.data.location,
        type: response.data.type,
        skills: response.data.skills,
        extras: response.data.extras || "",
        overview: blocksToText(response.data.overview),
        responsiblities: blocksToText(response.data.responsiblities),
        requirements: blocksToText(response.data.requirements),
        benefits: blocksToText(response.data.benefits),
      });
    } catch (error) {
      console.error("Failed to fetch job", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchJob(); }, [resolvedParams.id]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    setIsDeleting(true);
    try {
      await deleteJobPost(resolvedParams.id);
      router.push("/jobs");
    } catch (error) {
      console.error("Failed to delete job", error);
      setIsDeleting(false);
    }
  };

  const handleUpdate = async () => {
    setIsSaving(true);
    try {
      await updateJobPost(resolvedParams.id, {
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
      setIsEditOpen(false);
      fetchJob();
    } catch (error) {
      console.error("Failed to update job", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="flex h-[60vh] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-blue-500" /></div>;
  if (!job) return <div>Job not found.</div>;

  const overviewText = blocksToText(job.overview);
  const responsibilitiesList = blocksToText(job.responsiblities).split('\n').filter(i => i.trim());
  const requirementsList = blocksToText(job.requirements).split('\n').filter(i => i.trim());
  const benefitsList = blocksToText(job.benefits).split('\n').filter(i => i.trim());
  const skillsArray = job.skills ? job.skills.split(',').map(s => s.trim()).filter(Boolean) : [];

  return (
    <div className="space-y-8 md:space-y-10 animate-in fade-in duration-500 max-w-5xl mx-auto pb-16 pt-2">
      
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link href="/jobs" className="flex items-center text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors group">
          <ArrowLeft size={16} className="mr-2 text-slate-400 dark:text-slate-500 group-hover:-translate-x-1 transition-transform" />
          Back to Jobs list
        </Link>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <Button onClick={() => setIsEditOpen(true)} className="flex-1 sm:flex-none bg-slate-800 dark:bg-slate-100 hover:bg-slate-900 dark:hover:bg-slate-200 text-white dark:text-slate-900 rounded-xl shadow-sm transition-all h-10 px-5">
            <Edit className="mr-2 h-4 w-4" /> Edit Job
          </Button>
          <Button disabled={isDeleting} onClick={handleDelete} className="flex-1 sm:flex-none bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-sm transition-all h-10 px-5 disabled:opacity-50">
            {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />} Remove
          </Button>
        </div>
      </header>

      {/* Title & Meta */}
      <div className="space-y-4 pb-8 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 dark:text-white tracking-tight leading-tight">
          {job.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm font-medium text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2"><Briefcase size={16} />{job.domain}</div>
          <div className="flex items-center gap-2"><MapPin size={16} />{job.location}</div>
          <div className="flex items-center gap-2"><Clock size={16} />{job.type}</div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-10 md:space-y-12">
        <section className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-3 md:gap-8">
          <h2 className="text-lg md:text-xl font-medium text-slate-900 dark:text-slate-100">About the Role :</h2>
          <p className="text-slate-600 dark:text-slate-400 text-[15px] leading-relaxed">{overviewText}</p>
        </section>

        {responsibilitiesList.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-3 md:gap-8">
            <h2 className="text-lg md:text-xl font-medium text-slate-900 dark:text-slate-100">What You'll Do :</h2>
            <ul className="text-slate-600 dark:text-slate-400 text-[15px] leading-relaxed space-y-3 list-disc pl-4 marker:text-slate-400">
              {responsibilitiesList.map((item, i) => <li key={i} className="pl-1">{item}</li>)}
            </ul>
          </section>
        )}

        {requirementsList.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-3 md:gap-8">
            <h2 className="text-lg md:text-xl font-medium text-slate-900 dark:text-slate-100">What We're Looking For :</h2>
            <ul className="text-slate-600 dark:text-slate-400 text-[15px] leading-relaxed space-y-3 list-disc pl-4 marker:text-slate-400">
              {requirementsList.map((item, i) => <li key={i} className="pl-1">{item}</li>)}
            </ul>
          </section>
        )}

        {skillsArray.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-3 md:gap-8">
            <h2 className="text-lg md:text-xl font-medium text-slate-900 dark:text-slate-100">Skills :</h2>
            <div className="flex flex-wrap gap-2">
              {skillsArray.map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md font-medium px-3 py-1">
                  {skill}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {job.extras && (
          <section className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-3 md:gap-8">
            <h2 className="text-lg md:text-xl font-medium text-slate-900 dark:text-slate-100">Nice to Have :</h2>
            <p className="text-slate-600 dark:text-slate-400 text-[15px] leading-relaxed whitespace-pre-line">
              {job.extras}
            </p>
          </section>
        )}

        {benefitsList.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-3 md:gap-8">
            <h2 className="text-lg md:text-xl font-medium text-slate-900 dark:text-slate-100">What We Offer :</h2>
            <ul className="text-slate-600 dark:text-slate-400 text-[15px] leading-relaxed space-y-3 list-disc pl-4 marker:text-slate-400">
              {benefitsList.map((item, i) => <li key={i} className="pl-1">{item}</li>)}
            </ul>
          </section>
        )}
      </div>

      {/* SWAPPED TO DIALOG FOR CENTERED MODAL */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 w-full sm:max-w-4xl h-[100dvh] sm:h-[90vh] p-6 md:p-10 overflow-y-auto sm:rounded-3xl shadow-2xl">
          <DialogHeader className="mb-8">
            <DialogTitle className="text-slate-900 dark:text-white text-3xl font-bold tracking-tight">Edit Job Posting</DialogTitle>
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
              <Button disabled={isSaving} onClick={handleUpdate} className="w-full h-14  font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition-all disabled:opacity-50">
                {isSaving ? "Saving Changes..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}