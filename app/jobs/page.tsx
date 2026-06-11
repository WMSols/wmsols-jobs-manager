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
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header & Breadcrumb */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-100/80">
        <div className="flex items-center text-sm text-slate-500 space-x-2">
          <span className="hover:text-slate-800 transition-colors cursor-pointer">Dashboard</span>
          <ChevronRight size={14} className="text-slate-300" />
          <span className="font-semibold text-slate-900 tracking-tight">Jobs</span>
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.23)] hover:-translate-y-0.5 transition-all duration-200 rounded-xl px-5 h-10">
              <Plus className="mr-2 h-4 w-4" /> Create New Job
            </Button>
          </SheetTrigger>
          {/* Form matching the dynamic page requirements */}
          <SheetContent className="bg-white border-l border-slate-100 sm:max-w-xl p-8 overflow-y-auto">
            <SheetHeader className="mb-8">
              <SheetTitle className="text-slate-900 text-2xl font-semibold tracking-tight">Create New Job</SheetTitle>
            </SheetHeader>
            <div className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2.5">
                  <Label htmlFor="title" className="text-slate-700 font-medium ml-1">Job Title</Label>
                  <Input id="title" placeholder="e.g. Senior React Developer" className="border-slate-200 bg-slate-50/50 rounded-xl h-11" />
                </div>
                <div className="space-y-2.5">
                  <Label htmlFor="department" className="text-slate-700 font-medium ml-1">Department</Label>
                  <Input id="department" placeholder="e.g. Web Development" className="border-slate-200 bg-slate-50/50 rounded-xl h-11" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2.5">
                  <Label htmlFor="location" className="text-slate-700 font-medium ml-1">Location</Label>
                  <Input id="location" placeholder="e.g. Islamabad" className="border-slate-200 bg-slate-50/50 rounded-xl h-11" />
                </div>
                <div className="space-y-2.5">
                  <Label htmlFor="type" className="text-slate-700 font-medium ml-1">Employment Type</Label>
                  <Input id="type" placeholder="e.g. Full-Time" className="border-slate-200 bg-slate-50/50 rounded-xl h-11" />
                </div>
              </div>
              
              <div className="space-y-2.5">
                <Label htmlFor="about" className="text-slate-700 font-medium ml-1">About the Role</Label>
                <textarea id="about" className="flex min-h-[100px] w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" placeholder="Describe the role..."></textarea>
              </div>

              <div className="space-y-2.5">
                <Label htmlFor="requirements" className="text-slate-700 font-medium ml-1">What We're Looking For (Bullet points)</Label>
                <textarea id="requirements" className="flex min-h-[100px] w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" placeholder="- Lead design and engineering..."></textarea>
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
      {/* Jobs DataTable */}
      <div className="rounded-2xl border border-slate-100/80 bg-white shadow-[0_2px_10px_-3px_rgba(0,0,0,0.03)] overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="hover:bg-transparent border-slate-100/80">
              <TableHead className="text-slate-600 font-medium h-12 px-6">Job Title</TableHead>
              <TableHead className="text-slate-600 font-medium h-12">Department</TableHead>
              <TableHead className="text-slate-600 font-medium h-12">Location</TableHead>
              <TableHead className="text-slate-600 font-medium h-12">Type</TableHead>
              <TableHead className="text-slate-600 font-medium h-12">Applicants</TableHead>
              <TableHead className="text-right text-slate-600 font-medium h-12 px-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activeJobs.map((job) => (
              <TableRow key={job.id} className="border-slate-100/80 hover:bg-slate-50/50 transition-colors group">
                <TableCell className="font-semibold text-slate-900 px-6 py-4">{job.title}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-transparent font-medium rounded-full px-3 py-1">
                    {job.department}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-slate-400" />
                    {job.location}
                  </div>
                </TableCell>
                <TableCell className="text-slate-500">{job.type}</TableCell>
                <TableCell className="text-slate-500 font-medium">{job.applicants} Total</TableCell>
                <TableCell className="text-right px-6">
                  <Link href={`/jobs/${job.id}`}>
                    <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-md transition-all h-9 px-4">
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