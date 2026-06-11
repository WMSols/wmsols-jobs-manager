"use client";
import { Plus, Clock, ChevronRight, MoreHorizontal, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const activeJobs = [
  { id: 1, title: "Frontend Developer", department: "Engineering", type: "Full-time", applicants: 12, posted: "2d ago" },
  { id: 2, title: "UI Designer", department: "Design", type: "Contract", applicants: 5, posted: "5d ago" },
  { id: 3, title: "Product Manager", department: "Product", type: "Full-time", applicants: 24, posted: "1w ago" },
];

export default function JobsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header & Breadcrumb */}
      <header className="flex items-center justify-between pb-6 border-b border-slate-100/80">
        <div className="flex items-center text-sm text-slate-500 space-x-2">
          <span className="hover:text-slate-800 transition-colors cursor-pointer">Dashboard</span>
          <ChevronRight size={14} className="text-slate-300" />
          <span className="font-semibold text-slate-900 tracking-tight">Jobs</span>
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.23)] hover:-translate-y-0.5 transition-all duration-200 rounded-full px-5">
              <Plus className="mr-2 h-4 w-4" /> Create New Job
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-white border-l border-slate-100 sm:max-w-md p-8">
            <SheetHeader className="mb-8">
              <SheetTitle className="text-slate-900 text-2xl font-semibold tracking-tight flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-500" />
                Create New Job
              </SheetTitle>
            </SheetHeader>
            <div className="grid gap-7">
              <div className="space-y-2.5">
                <Label htmlFor="title" className="text-slate-700 font-medium ml-1">Job Title</Label>
                <Input 
                  id="title" 
                  placeholder="e.g. Senior React Developer" 
                  className="border-slate-200 bg-slate-50/50 focus-visible:ring-blue-500 focus-visible:bg-white rounded-xl h-11 transition-colors" 
                />
              </div>
              <div className="space-y-2.5">
                <Label htmlFor="department" className="text-slate-700 font-medium ml-1">Department</Label>
                <Input 
                  id="department" 
                  placeholder="e.g. Engineering" 
                  className="border-slate-200 bg-slate-50/50 focus-visible:ring-blue-500 focus-visible:bg-white rounded-xl h-11 transition-colors" 
                />
              </div>
              <div className="space-y-2.5">
                <Label htmlFor="type" className="text-slate-700 font-medium ml-1">Employment Type</Label>
                <Input 
                  id="type" 
                  placeholder="e.g. Full-time" 
                  className="border-slate-200 bg-slate-50/50 focus-visible:ring-blue-500 focus-visible:bg-white rounded-xl h-11 transition-colors" 
                />
              </div>
              <div className="pt-6 mt-2 border-t border-slate-100">
                <Button className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-md transition-all">
                  Publish Job Posting
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {/* Enhanced Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeJobs.map((job) => (
          <div 
            key={job.id} 
            className="group relative bg-white rounded-2xl p-6 ring-1 ring-slate-200/50 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] hover:-translate-y-1.5 transition-all duration-500 ease-out flex flex-col overflow-hidden cursor-pointer"
          >
            {/* Hover Accent Top Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-transparent font-medium rounded-full px-3 py-1">
                  {job.department}
                </Badge>
                <Badge variant="outline" className="text-slate-500 border-slate-200 font-medium rounded-full px-3 py-1 bg-white">
                  {job.type}
                </Badge>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full -mr-2 -mt-1 transition-colors z-20">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="space-y-1.5 mb-8">
              <h3 className="font-semibold text-xl text-slate-900 tracking-tight group-hover:text-blue-500 transition-colors">
                {job.title}
              </h3>
              <div className="flex items-center gap-1.5 text-sm text-slate-400">
                <Clock size={14} />
                <span>Posted {job.posted}</span>
              </div>
            </div>
            
            <div className="mt-auto pt-5 flex items-center justify-between border-t border-slate-100/80">
              {/* Applicant Avatars + Count */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-7 h-7 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-medium text-slate-500 shadow-sm"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-sm font-medium text-slate-600">
                  {job.applicants} total
                </span>
              </div>

              {/* Hover Call to Action */}
              <div className="flex items-center gap-1 text-sm font-medium text-blue-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                View 
                <ArrowRight size={14} className="ml-0.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}