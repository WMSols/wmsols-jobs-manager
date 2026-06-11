"use client";
import Link from "next/link";
import { Plus, ChevronRight, MapPin, Search, ArrowRight } from "lucide-react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const activeJobs = [
  { id: 1, title: "Senior ReactJs Developer", department: "Web Development", location: "Islamabad", type: "Full-Time", applicants: 45, posted: "2d ago" },
  { id: 2, title: "UI/UX Designer", department: "Design", location: "Remote", type: "Contract", applicants: 12, posted: "5d ago" },
  { id: 3, title: "Product Manager", department: "Product", location: "Lahore", type: "Full-Time", applicants: 24, posted: "1w ago" },
];

export default function JobsPage() {
  return (
   <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 space-x-2">
          <span className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer">Dashboard</span>
          <ChevronRight size={14} className="text-slate-300 dark:text-slate-600" />
          <span className="font-semibold text-slate-900 dark:text-white tracking-tight">Jobs</span>
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white shadow-sm rounded-xl px-5 h-10">
              <Plus className="mr-2 h-4 w-4" /> Create New Job
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 w-full sm:max-w-xl p-6 md:p-8 overflow-y-auto">
            <SheetHeader className="mb-6 md:mb-8">
              <SheetTitle className="text-slate-900 dark:text-white text-2xl font-semibold tracking-tight">Create New Job</SheetTitle>
            </SheetHeader>
            <div className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2.5">
                  <Label className="text-slate-700 dark:text-slate-300 font-medium ml-1">Job Title</Label>
                  <Input placeholder="e.g. Senior React Developer" className="border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 rounded-xl h-11 dark:text-white" />
                </div>
                <div className="space-y-2.5">
                  <Label className="text-slate-700 dark:text-slate-300 font-medium ml-1">Department</Label>
                  <Input placeholder="e.g. Web Development" className="border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 rounded-xl h-11 dark:text-white" />
                </div>
              </div>
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                <Button className="w-full h-11 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 rounded-xl shadow-md transition-all">
                  Publish Job Posting
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </header>

{/* Search Input */}

      {/* <div className="flex justify-between items-center">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search active jobs..." 
            className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
      </div> */}

      {/* The Responsive Table Wrapper */}
      <div className="w-full overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <Table className="w-full min-w-[700px]">
          <TableHeader className="bg-slate-50/50 dark:bg-slate-950/50">
            <TableRow className="hover:bg-transparent border-slate-200 dark:border-slate-800">
              <TableHead className="text-slate-600 dark:text-slate-400 font-medium h-12 px-6">Job Title</TableHead>
              <TableHead className="text-slate-600 dark:text-slate-400 font-medium h-12">Department</TableHead>
              <TableHead className="text-slate-600 dark:text-slate-400 font-medium h-12">Location</TableHead>
              <TableHead className="text-slate-600 dark:text-slate-400 font-medium h-12">Type</TableHead>
              <TableHead className="text-right text-slate-600 dark:text-slate-400 font-medium h-12 px-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activeJobs.map((job) => (
              <TableRow key={job.id} className="border-slate-200 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <TableCell className="font-semibold text-slate-900 dark:text-slate-100 px-6 py-4">{job.title}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-transparent font-medium rounded-full px-3 py-1">
                    {job.department}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-slate-400" />
                    {job.location}
                  </div>
                </TableCell>
                <TableCell className="text-slate-500 dark:text-slate-400">{job.type}</TableCell>
                <TableCell className="text-right px-6">
                  <Link href={`/jobs/${job.id}`}>
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