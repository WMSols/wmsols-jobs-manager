"use client";
import { use } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Briefcase, 
  MapPin, 
  Clock, 
  Edit, 
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);

  // Mock data matching the reference image content
  const job = {
    id: resolvedParams.id,
    title: "Senior ReactJs Developer",
    department: "Web Development",
    location: "Islamabad",
    type: "Full-Time",
    about: "A Senior React Developer is an experienced front-end or full-stack engineer who designs scalable architectures, mentors junior team members, and drives high-level technical decisions. They typically have 4+ years of hands-on experience, a deep understanding of React, TypeScript, and state management, and are adept at solving complex production-level challenges",
    whatYouWillDo: [
      "Lead design and engineering of high-scale Next.js, React, and Node.js codebases.",
      "Author robust TypeScript structures, REST APIs, and GraphQL schemas.",
      "Audit existing client codebases and advise on modern software transformations.",
      "Collaborate closely with UI/UX designers to translate Figma layouts into responsive pixels.",
      "Mentor junior members to enforce pristine software standards."
    ],
    whatWeAreLookingFor: [
      "Lead design and engineering of high-scale Next.js, React, and Node.js codebases.",
      "Author robust TypeScript structures, REST APIs, and GraphQL schemas.",
      "Audit existing client codebases and advise on modern software transformations.",
      "Collaborate closely with UI/UX designers to translate Figma layouts into responsive pixels.",
      "Mentor junior members to enforce pristine software standards."
    ],
    niceToHave: "Experience with Docker, Kubernetes, or AWS serverless deployments.\nActive contributions to popular front-end open-source packages",
    whatWeOffer: [
      "Competitive salary (PKR140k-PKR175k) + equity options.",
      "Generous hardware allowance (M4 MacBook Pro & ultra-wide screen layout).",
      "Full health, dental, and vision insurance premiums covered.",
      "Annual learning allowance (PKR 2,5000) and unlimited tech books budget."
    ]
  };

  return (
    <div className="space-y-8 md:space-y-10 animate-in fade-in duration-500 max-w-5xl mx-auto pb-16 pt-2">
      
      {/* Top Header & Actions - Responsive wrap on mobile */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link href="/jobs" className="flex items-center text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors group">
          <ArrowLeft size={16} className="mr-2 text-slate-400 dark:text-slate-500 group-hover:-translate-x-1 transition-transform" />
          Back to Jobs list
        </Link>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <Button className="flex-1 sm:flex-none bg-slate-800 dark:bg-slate-100 hover:bg-slate-900 dark:hover:bg-slate-200 text-white dark:text-slate-900 rounded-xl shadow-sm transition-all h-10 px-5">
            <Edit className="mr-2 h-4 w-4" /> Edit Job
          </Button>
          <Button className="flex-1 sm:flex-none bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-sm transition-all h-10 px-5">
            <Trash2 className="mr-2 h-4 w-4" /> Remove
          </Button>
        </div>
      </header>

      {/* Title & Meta Data */}
      <div className="space-y-4 pb-8 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 dark:text-white tracking-tight leading-tight">
          {job.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm font-medium text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Briefcase size={16} className="text-slate-400 dark:text-slate-500" />
            {job.department}
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-slate-400 dark:text-slate-500" />
            {job.location}
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-slate-400 dark:text-slate-500" />
            {job.type}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-10 md:space-y-12">
        
        <section className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-3 md:gap-8">
          <h2 className="text-lg md:text-xl font-medium text-slate-900 dark:text-slate-100">About the Role :</h2>
          <p className="text-slate-600 dark:text-slate-400 text-[15px] leading-relaxed">
            {job.about}
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-3 md:gap-8">
          <h2 className="text-lg md:text-xl font-medium text-slate-900 dark:text-slate-100">What You'll Do :</h2>
          <ul className="text-slate-600 dark:text-slate-400 text-[15px] leading-relaxed space-y-3 list-disc pl-4 marker:text-slate-400 dark:marker:text-slate-600">
            {job.whatYouWillDo.map((item, i) => (
              <li key={i} className="pl-1">{item}</li>
            ))}
          </ul>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-3 md:gap-8">
          <h2 className="text-lg md:text-xl font-medium text-slate-900 dark:text-slate-100">What We're Looking For :</h2>
          <ul className="text-slate-600 dark:text-slate-400 text-[15px] leading-relaxed space-y-3 list-disc pl-4 marker:text-slate-400 dark:marker:text-slate-600">
            {job.whatWeAreLookingFor.map((item, i) => (
              <li key={i} className="pl-1">{item}</li>
            ))}
          </ul>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-3 md:gap-8">
          <h2 className="text-lg md:text-xl font-medium text-slate-900 dark:text-slate-100">Nice to Have :</h2>
          <p className="text-slate-600 dark:text-slate-400 text-[15px] leading-relaxed whitespace-pre-line">
            {job.niceToHave}
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-3 md:gap-8">
          <h2 className="text-lg md:text-xl font-medium text-slate-900 dark:text-slate-100">What We Offer :</h2>
          <ul className="text-slate-600 dark:text-slate-400 text-[15px] leading-relaxed space-y-3 list-disc pl-4 marker:text-slate-400 dark:marker:text-slate-600">
            {job.whatWeOffer.map((item, i) => (
              <li key={i} className="pl-1">{item}</li>
            ))}
          </ul>
        </section>

      </div>
    </div>
  );
}