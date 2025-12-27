import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, ChevronRight, GraduationCap, Users, ShieldCheck, 
  LayoutDashboard, BookOpen, FileText, Library, BarChart3, 
  ClipboardCheck, Database, Home, Wallet, Headset, Sparkles,
  Quote, ArrowRight, Zap, Network, Lock, Server, FileCheck, Globe,
  Play, Activity, Check, Minus, AlertCircle, MoveRight, Sun, Moon,
  UserPlus, CreditCard, Book, Heart, TrendingUp, Award
} from 'lucide-react';

import FeatureCard from './FeatureCard';
import AiAssistant from './AiAssistant';
import { ModuleFeature } from './types';

// Constants
const FEATURES: ModuleFeature[] = [
  { id: '1', name: 'Gradiate Applya', description: 'Streamline the entire admission process from inquiry to enrollment with intelligent workflows.', icon: FileText, category: 'Academics' },
  { id: '2', name: 'Gradiate SIS', description: 'The core Student Information System ensuring data integrity and accessibility across the campus.', icon: Database, category: 'Student Life' },
  { id: '3', name: 'Gradiate LMS', description: 'Next-gen Learning Management System fostering collaboration and academic excellence.', icon: BookOpen, category: 'Academics' },
  { id: '4', name: 'Gradiate Portal', description: 'A unified digital hub for students, faculty, and staff to access everything they need.', icon: LayoutDashboard, category: 'Student Life' },
  { id: '5', name: 'Gradiate HR', description: 'Complete human resources management for university staff and faculty.', icon: Users, category: 'Administration' },
  { id: '6', name: 'Gradiate Identity', description: 'Identity Access Management (IAM) securing your digital campus with SSO and MFA.', icon: ShieldCheck, category: 'Administration' },
  { id: '7', name: 'Gradiate Library', description: 'Manage physical and digital assets seamlessly for your research community.', icon: Library, category: 'Student Life' },
  { id: '8', name: 'Gradiate Insights', description: 'Actionable intelligence and predictive analytics to drive institutional success.', icon: BarChart3, category: 'Intelligence' },
  { id: '9', name: 'Gradiate Audit', description: 'Comprehensive auditing tools for financial and compliance adherence.', icon: ClipboardCheck, category: 'Administration' },
  { id: '10', name: 'Gradiate Life', description: 'Managing residence life, transport, and student well-being services.', icon: Home, category: 'Student Life' },
  { id: '11', name: 'Gradiate Finance', description: 'Robust financial planning, tuition billing, and payroll management.', icon: Wallet, category: 'Administration' },
  { id: '12', name: 'Gradiate Desk', description: '24/7 AI-driven service desk for technical and administrative queries.', icon: Headset, category: 'Intelligence' },
];

const JOURNEY_STAGES = [
  {
    id: 'admission',
    title: 'Admissions',
    icon: UserPlus,
    description: 'The first point of contact. Attract, vet, and enroll the brightest minds with zero friction.',
    modules: [
      { name: 'Applya', role: 'Online Applications', icon: FileText },
      { name: 'Identity', role: 'Credential Issuance', icon: ShieldCheck }
    ]
  },
  {
    id: 'onboarding',
    title: 'Onboarding',
    icon: CreditCard,
    description: 'Setting the foundation. Automated tuition billing, module selection, and portal access.',
    modules: [
      { name: 'Finance', role: 'Billing & Payments', icon: Wallet },
      { name: 'Portal', role: 'Student Dashboard', icon: LayoutDashboard }
    ]
  },
  {
    id: 'learning',
    title: 'Academics',
    icon: Book,
    description: 'The core experience. Delivering world-class education through collaborative digital environments.',
    modules: [
      { name: 'LMS', role: 'Course Delivery', icon: BookOpen },
      { name: 'Library', role: 'Research Access', icon: Library }
    ]
  },
  {
    id: 'life',
    title: 'Campus Life',
    icon: Heart,
    description: 'Beyond the classroom. Managing housing, wellness, and 24/7 technical support.',
    modules: [
      { name: 'Life', role: 'Residence & Health', icon: Home },
      { name: 'Desk', role: 'AI Support Bot', icon: Headset }
    ]
  },
  {
    id: 'growth',
    title: 'Growth',
    icon: TrendingUp,
    description: 'Ensuring success. Using data to identify at-risk students and optimize learning outcomes.',
    modules: [
      { name: 'Insights', role: 'Predictive Analytics', icon: BarChart3 },
      { name: 'SIS', role: 'Academic Transcripts', icon: Database }
    ]
  },
  {
    id: 'graduation',
    title: 'Graduation',
    icon: Award,
    description: 'The final milestone. Audited records, alumni portal entry, and career service hand-off.',
    modules: [
      { name: 'Audit', role: 'Degree Verification', icon: ClipboardCheck },
      { name: 'Identity', role: 'Alumni SSO', icon: Lock }
    ]
  }
];

const CORE_SERVICES_DATA = [
  { 
    id: 'sis', 
    name: 'SIS', 
    icon: Database, 
    position: 'top-0 left-1/2 -translate-x-1/2', 
    hoverTranslate: 'hover:-translate-y-2',
    lineStyle: 'top-20 left-1/2 w-[2px] h-[90px]',
    lineBaseClass: 'bg-slate-200 dark:bg-slate-700',
    description: "Centralized academic records."
  },
  {
    id: 'finance',
    name: 'Finance',
    icon: Wallet,
    position: 'top-1/2 right-0 -translate-y-1/2',
    hoverTranslate: 'hover:translate-x-2',
    lineStyle: 'right-36 top-1/2 w-[90px] h-[2px]',
    lineBaseClass: 'bg-slate-200 dark:bg-slate-700',
    description: "Tuition & payroll management."
  },
  {
    id: 'admissions',
    name: 'Admissions',
    icon: FileText,
    position: 'bottom-0 left-1/2 -translate-x-1/2',
    hoverTranslate: 'hover:translate-y-2',
    lineStyle: 'bottom-20 left-1/2 w-[2px] h-[90px]',
    lineBaseClass: 'bg-slate-200 dark:bg-slate-700',
    description: "Applicant tracking system."
  },
  {
    id: 'library',
    name: 'Library',
    icon: Library,
    position: 'top-1/2 left-0 -translate-y-1/2',
    hoverTranslate: 'hover:-translate-x-2',
    lineStyle: 'left-36 top-1/2 w-[90px] h-[2px]',
    lineBaseClass: 'bg-slate-200 dark:bg-slate-700',
    description: "Digital asset management."
  },
  {
    id: 'lms',
    name: 'LMS',
    icon: BookOpen,
    position: 'top-[12%] right-[10%]',
    hoverTranslate: 'hover:-translate-y-1 hover:translate-x-1',
    lineStyle: 'top-24 right-28 w-[60px] h-[2px] rotate-45 origin-right',
    lineBaseClass: 'bg-slate-200 dark:bg-slate-700',
    description: "Course delivery system."
  },
  {
    id: 'hr',
    name: 'HR',
    icon: Users,
    position: 'bottom-[12%] right-[10%]',
    hoverTranslate: 'hover:translate-y-1 hover:translate-x-1',
    lineStyle: 'bottom-24 right-28 w-[60px] h-[2px] -rotate-45 origin-right',
    lineBaseClass: 'bg-slate-200 dark:bg-slate-700',
    description: "Staff lifecycle tools."
  },
  {
    id: 'portal',
    name: 'Portal',
    icon: LayoutDashboard,
    position: 'bottom-[12%] left-[10%]',
    hoverTranslate: 'hover:translate-y-1 hover:-translate-x-1',
    lineStyle: 'bottom-24 left-28 w-[60px] h-[2px] rotate-45 origin-left',
    lineBaseClass: 'bg-slate-200 dark:bg-slate-700',
    description: "Unified access point."
  },
  {
    id: 'insights',
    name: 'Insights',
    icon: BarChart3,
    position: 'top-[12%] left-[10%]',
    hoverTranslate: 'hover:-translate-y-1 hover:-translate-x-1',
    lineStyle: 'top-24 left-28 w-[60px] h-[2px] -rotate-45 origin-left',
    lineBaseClass: 'bg-slate-200 dark:bg-slate-700',
    description: "AI-driven analytics."
  }
];

const TESTIMONIALS = [
  {
    id: 1,
    quote: "The external auditors were blown away. Gradiate's immutable audit trails reduced our annual audit timeline by 6 weeks, and we achieved a clean audit for the first time in history.",
    author: "Dr. Sarah Jenkins",
    role: "Chief Financial Officer, West Coast University",
    image: "https://i.pravatar.cc/150?u=dean"
  },
  {
    id: 2,
    quote: "The unified data architecture solved our fragmentation issues overnight. We now have a 360-degree view of every student, from admissions to alumni status.",
    author: "James Alcott",
    role: "CIO, Northern Technical Institute",
    image: "https://i.pravatar.cc/150?u=james"
  },
  {
    id: 3,
    quote: "Security and reliability are non-negotiable for us. Gradiate's ISO 27001 compliance gives our council peace of mind that our institutional data is sovereign and safe.",
    author: "Dr. Elena Rodriguez",
    role: "Council Chair, State Valley College",
    image: "https://i.pravatar.cc/150?u=elena"
  }
];

const COMPARISON_DATA = [
    { feature: 'Unified Data Model', gradiate: true, legacy: false, point: false, note: 'Single source of truth across all 12 modules' },
    { feature: 'Implementation Time', gradiate: '3-6 Months', legacy: '18-36 Months', point: '1-3 Months', note: 'Rapid deployment with migration assistants' },
    { feature: 'Real-time Analytics', gradiate: true, legacy: 'Add-on ($$)', point: 'Limited', note: 'Native, predictive AI out of the box' },
    { feature: 'Mobile Student Exp.', gradiate: true, legacy: false, point: true, note: 'Modern, responsive design for Gen Z' },
    { feature: 'Update Frequency', gradiate: 'Weekly', legacy: 'Annually', point: 'Monthly', note: 'Continuous delivery without downtime' },
    { feature: 'Total Cost (TCO)', gradiate: '$$', legacy: '$$$$$', point: '$$$', note: 'Transparent pricing, no hidden maintenance fees' },
];

const CASE_STUDIES = [
  {
    institution: "State Technical University",
    title: "Modernizing Admissions at Scale",
    challenge: "12 disconnected legacy systems led to 4-week application processing times and high student dropout rates during intake.",
    solution: "Implemented Gradiate Applya & SIS to unify the student journey.",
    stats: [
      { label: "Processing Speed", value: "60% Faster" },
      { label: "Enrollment Yield", value: "+18%" }
    ],
    image: "https://picsum.photos/seed/tech/800/600" 
  },
  {
    institution: "National Health Sciences College",
    title: "Achieving Total Data Sovereignty",
    challenge: "Facing severe regulatory penalties due to data breaches and manual, error-prone audit trails for student records.",
    solution: "Deployed Gradiate Core with Audit module on dedicated infrastructure.",
    stats: [
      { label: "Audit Findings", value: "0 (Clean)" },
      { label: "Compliance", value: "100%" }
    ],
    image: "https://picsum.photos/seed/med/800/600"
  },
  {
    institution: "West Coast Business School",
    title: "Financial Turnaround via AI",
    challenge: "Tuition leakage and unpredictable cash flow due to manual billing reconciliations and poor student communication.",
    solution: "Gradiate Finance with Insights predictive modeling.",
    stats: [
      { label: "Recovered Revenue", value: "$2.4M" },
      { label: "Collection Rate", value: "98%" }
    ],
    image: "https://picsum.photos/seed/biz/800/600"
  }
];

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'All' | 'Administration' | 'Academics' | 'Student Life' | 'Intelligence'>('All');
  const [activeCoreService, setActiveCoreService] = useState<string | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeJourneyStage, setActiveJourneyStage] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const videoRef = useRef<HTMLVideoElement>(null);

  // Dark Mode side effects
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Timeline Auto-Cycle Logic
  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setActiveJourneyStage((prev) => (prev + 1) % JOURNEY_STAGES.length);
    }, 6000);

    return () => clearInterval(cycleInterval);
  }, []);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const filteredFeatures = activeTab === 'All' 
    ? FEATURES 
    : FEATURES.filter(f => f.category === activeTab);

  const activeServiceData = CORE_SERVICES_DATA.find(s => s.id === activeCoreService);
  const ActiveIcon = activeServiceData?.icon;

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeTestimonial]);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsVideoPlaying(true);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-slate-950' : 'bg-slate-50'} text-slate-900 dark:text-slate-100 font-sans selection:bg-brand-200 dark:selection:bg-brand-800`}>
      
      {/* Navigation */}
      <nav className="fixed w-full z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="bg-brand-600 p-2 rounded-lg">
                <GraduationCap className="text-white h-6 w-6" />
              </div>
              <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Gradiate</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#solutions" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 font-medium transition-colors">Solutions</a>
              <a href="#platform" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 font-medium transition-colors">Platform</a>
              <a href="#comparison" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 font-medium transition-colors">Comparison</a>
              <a href="#about" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 font-medium transition-colors">About</a>
              
              <button 
                onClick={toggleTheme}
                className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-full transition-all shadow-md hover:shadow-lg">
                Request Demo
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-600 dark:text-slate-400 hover:text-brand-600 p-2"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 absolute w-full shadow-lg animate-fade-in-down">
            <div className="px-4 pt-2 pb-6 space-y-1">
              <a href="#solutions" className="block px-3 py-3 text-base font-medium text-slate-600 dark:text-slate-400 hover:text-brand-600 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">Solutions</a>
              <a href="#platform" className="block px-3 py-3 text-base font-medium text-slate-600 dark:text-slate-400 hover:text-brand-600 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">Platform</a>
              <a href="#comparison" className="block px-3 py-3 text-base font-medium text-slate-600 dark:text-slate-400 hover:text-brand-600 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">Comparison</a>
              <a href="#about" className="block px-3 py-3 text-base font-medium text-slate-600 dark:text-slate-400 hover:text-brand-600 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">About</a>
              <button className="w-full mt-4 px-5 py-3 bg-brand-600 text-white font-medium rounded-lg">
                Request Demo
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] dark:invert"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-900/20 border border-brand-100 dark:border-brand-800 text-brand-700 dark:text-brand-400 text-sm font-medium mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            New: Gradiate Insights is now live
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
            The Operating System for <br />
            <span className="gradient-text">Higher Education</span>
          </h1>
          
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
            The complete digital transformation platform for <span className="font-semibold text-slate-800 dark:text-slate-200">Universities, Technical Colleges, and Tertiary Institutions</span>. 
            Streamline the journey from admission to graduation.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white text-lg font-bold rounded-full transition-all shadow-lg hover:shadow-brand-200/50 flex items-center justify-center gap-2">
              Explore the Ecosystem <ChevronRight size={20} />
            </button>
            <button className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 text-lg font-bold rounded-full transition-all shadow-sm flex items-center justify-center gap-2">
              <Users size={20} className="text-slate-400" /> Partner with Us
            </button>
          </div>

          <div className="mt-16 relative rounded-2xl p-2 bg-slate-200/50 dark:bg-slate-800/50 max-w-5xl mx-auto shadow-2xl">
             <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-slate-950 via-transparent to-transparent z-10 h-full w-full rounded-2xl pointer-events-none"></div>
             <img 
               src="https://picsum.photos/1200/600?grayscale&blur=2" 
               alt="Gradiate Dashboard Interface" 
               className="rounded-xl shadow-inner w-full h-auto object-cover opacity-90"
             />
             <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center">
               <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-white/50 dark:border-slate-700/50 px-6 py-4 rounded-2xl shadow-lg max-w-md text-center">
                  <p className="font-semibold text-slate-800 dark:text-white">Unified Dashboard</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Real-time data across all 12 modules</p>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white dark:bg-slate-900 py-12 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <div className="text-4xl font-bold text-brand-600 dark:text-brand-400 mb-1">500+</div>
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Partner Institutions</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-brand-600 dark:text-brand-400 mb-1">2.5M</div>
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Students</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-brand-600 dark:text-brand-400 mb-1">99.9%</div>
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Uptime</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-brand-600 dark:text-brand-400 mb-1">100%</div>
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Clean Audits</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By / Testimonials Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-brand-600 dark:text-brand-400 font-semibold tracking-wide uppercase text-sm mb-2">Trusted By Leading Institutions</h2>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Empowering Education Leaders</h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              From <span className="font-semibold text-slate-700 dark:text-slate-300">technical colleges and vocational institutes</span> to global research universities, Gradiate scales to meet the unique needs of every tertiary institution.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center opacity-60 dark:opacity-70 hover:opacity-100 transition-opacity duration-500 mb-20 grayscale dark:grayscale-0 hover:grayscale-0">
             <div className="text-xl font-serif font-bold text-slate-700 dark:text-white">Stanford <span className="text-brand-600">Tech</span></div>
             <div className="text-lg font-sans font-black tracking-tight text-slate-800 dark:text-white uppercase">NorthState</div>
             <div className="text-xl font-serif italic text-slate-600 dark:text-slate-300">King's College</div>
             <div className="flex items-center gap-2 font-bold text-slate-700 dark:text-white">
               <div className="w-8 h-8 bg-slate-700 dark:bg-slate-600 rounded-full flex items-center justify-center text-white text-xs font-serif">U</div>
               UNIVEX
             </div>
             <div className="text-sm font-bold tracking-widest border-2 border-slate-700 dark:border-slate-500 px-3 py-1 text-slate-700 dark:text-slate-300">MODERN</div>
          </div>

          <div className="relative max-w-4xl mx-auto h-[400px] md:h-[320px]">
            {TESTIMONIALS.map((item, index) => (
              <div 
                key={item.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === activeTestimonial 
                    ? 'opacity-100 z-10' 
                    : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 md:p-12 shadow-xl border border-slate-100 dark:border-slate-800 relative h-full flex flex-col justify-center">
                  <div className="absolute -top-6 -left-6 bg-brand-500 text-white p-4 rounded-full shadow-lg">
                    <Quote size={24} />
                  </div>
                  <blockquote className="text-xl md:text-2xl font-medium text-slate-800 dark:text-slate-200 leading-relaxed text-center mb-8">
                    "{item.quote}"
                  </blockquote>
                  <div className="flex flex-col items-center">
                    <img src={item.image} alt={item.author} className="w-16 h-16 rounded-full mb-3 border-4 border-brand-50 dark:border-brand-900/40" />
                    <div className="font-bold text-slate-900 dark:text-white">{item.author}</div>
                    <div className="text-sm text-brand-600 dark:text-brand-400 font-medium">{item.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center gap-3 mt-8">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`h-3 rounded-full transition-all duration-500 ease-out ${
                  index === activeTestimonial 
                    ? 'bg-brand-600 w-10 shadow-md' 
                    : 'bg-slate-300 dark:bg-slate-700 w-3 hover:bg-brand-300 hover:scale-110'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={index === activeTestimonial ? 'true' : 'false'}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
             <button className="inline-flex items-center gap-2 text-brand-700 dark:text-brand-400 font-semibold hover:text-brand-800 dark:hover:text-brand-300 transition-colors group">
               Read more customer stories <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
             </button>
          </div>
        </div>
      </section>

      {/* Interactive Student Journey Timeline */}
      <section className="py-24 bg-white dark:bg-slate-950 border-y border-slate-200 dark:border-slate-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-brand-600 dark:text-brand-400 font-semibold tracking-wide uppercase text-sm mb-2">The Student Lifecycle</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">Seamlessly Integrated Experience</h3>
            <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400 text-lg">
              Follow the journey of a student empowered by the Gradiate ecosystem. We support every milestone with purpose-built intelligence.
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* Desktop Timeline Visual Track */}
            <div className="hidden md:block absolute top-[44px] left-[5%] right-[5%] h-1 bg-slate-200 dark:bg-slate-800 rounded-full z-0 overflow-hidden">
               <div 
                 className="h-full bg-gradient-to-r from-brand-400 to-brand-600 transition-all duration-1000 ease-in-out" 
                 style={{ width: `${(activeJourneyStage / (JOURNEY_STAGES.length - 1)) * 100}%` }}
               />
            </div>

            {/* Stage Nav Items - Balanced Spacing */}
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0 mb-20 px-0 md:px-4">
              {JOURNEY_STAGES.map((stage, idx) => (
                <div key={stage.id} className="flex flex-col items-center group cursor-pointer" onClick={() => setActiveJourneyStage(idx)}>
                  <div className={`relative w-16 h-16 md:w-24 md:h-24 rounded-full flex items-center justify-center border-4 transition-all duration-700 shadow-xl ${
                    idx === activeJourneyStage 
                    ? 'bg-brand-600 border-white dark:border-slate-700 text-white scale-110 shadow-brand-500/20 ring-4 ring-brand-100 dark:ring-brand-900/30' 
                    : idx < activeJourneyStage 
                      ? 'bg-brand-50 dark:bg-brand-900/20 border-brand-500 text-brand-600 dark:text-brand-400' 
                      : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400 hover:border-brand-200'
                  }`}>
                    <stage.icon size={idx === activeJourneyStage ? 36 : 28} className="transition-all duration-700" />
                    
                    {idx < activeJourneyStage && (
                      <div className="absolute -top-1 -right-1 bg-brand-500 text-white rounded-full p-1 border-2 border-white dark:border-slate-900">
                        <Check size={12} strokeWidth={4} />
                      </div>
                    )}
                  </div>
                  <div className="mt-4 text-center">
                    <p className={`font-bold text-sm md:text-lg transition-colors duration-500 ${idx === activeJourneyStage ? 'text-brand-700 dark:text-brand-400 scale-105' : 'text-slate-500'}`}>{stage.title}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Stage {idx + 1}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Active Stage Detail Card - Better Visual Balance */}
            <div className="relative overflow-hidden bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl">
               <div className="absolute top-0 right-0 w-96 h-96 bg-brand-400/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
               
               <div className="grid md:grid-cols-5 gap-0 relative z-10">
                 {/* Main Description Area */}
                 <div className="md:col-span-3 p-8 md:p-16 border-r border-slate-100 dark:border-slate-800 transition-all duration-700">
                    <div key={`stage-desc-${activeJourneyStage}`} className="animate-in fade-in slide-in-from-left-8 duration-700 ease-out">
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm mb-8">
                        <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Milestone Focus</span>
                      </div>
                      <h4 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-8 tracking-tight">
                        {JOURNEY_STAGES[activeJourneyStage].title}
                      </h4>
                      <p className="text-slate-600 dark:text-slate-400 text-xl leading-relaxed font-medium mb-10 max-w-xl">
                        {JOURNEY_STAGES[activeJourneyStage].description}
                      </p>
                      <button className="px-8 py-4 bg-brand-600 text-white font-black rounded-2xl shadow-lg shadow-brand-500/20 hover:bg-brand-700 transition-all flex items-center gap-3 group">
                        Strategy Guide <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                 </div>

                 {/* Module Highlights Area */}
                 <div className="md:col-span-2 p-8 md:p-12 bg-white/30 dark:bg-slate-950/30 backdrop-blur-sm">
                    <div key={`stage-mod-${activeJourneyStage}`} className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-700 ease-out">
                      <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-8 flex items-center gap-2">
                        <Sparkles size={14} className="text-brand-500"/> Core Modules
                      </p>
                      
                      {JOURNEY_STAGES[activeJourneyStage].modules.map((module, i) => (
                        <div key={i} className="flex items-center gap-5 p-6 bg-white dark:bg-slate-800/80 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group cursor-pointer hover:border-brand-200">
                          <div className="w-14 h-14 bg-brand-50 dark:bg-brand-900/30 rounded-2xl flex items-center justify-center text-brand-600 dark:text-brand-400 shadow-inner group-hover:scale-110 transition-transform duration-500">
                            {React.createElement(module.icon, { size: 28 })}
                          </div>
                          <div>
                            <p className="font-extrabold text-slate-900 dark:text-white text-lg leading-none mb-1.5">Gradiate {module.name}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{module.role}</p>
                          </div>
                        </div>
                      ))}

                      <div className="mt-10 p-6 rounded-3xl bg-academic-900/5 dark:bg-brand-900/10 border border-brand-100 dark:border-brand-900/20">
                         <div className="flex items-center gap-2 mb-2 text-brand-700 dark:text-brand-400 font-bold text-xs uppercase tracking-wider">
                           <Network size={14} /> Data Pipeline
                         </div>
                         <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                           Automatic sync to <strong>Gradiate Core</strong> for Institutional Insights.
                         </p>
                      </div>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY GRADIATE SECTION */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-brand-600 dark:text-brand-400 font-semibold tracking-wide uppercase text-sm mb-2">Why Gradiate?</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">The Modern Standard for Higher Ed</h3>
            <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400 text-lg">
               Legacy ERPs are clunky and disconnected. Gradiate offers a cohesive ecosystem designed specifically for the complex needs of modern tertiary institutions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
             <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-slate-100 dark:border-slate-700 group">
                <div className="w-14 h-14 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                   <LayoutDashboard className="text-brand-600 dark:text-brand-400 w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Comprehensive Ecosystem</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                   Stop stitching together incompatible software. From admissions (Applya) to alumni relations, every module shares the same DNA, design language, and database.
                </p>
             </div>

             <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-slate-100 dark:border-slate-700 group">
                <div className="w-14 h-14 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                   <Zap className="text-amber-500 w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Instant Integration</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                   Deeply integrated with the tools you love, including <strong>Google Workspace</strong>. Plus, our unified core ensures that financial holds instantly sync across Gradiate LMS and Portal.
                </p>
             </div>

             <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-slate-100 dark:border-slate-700 group">
                <div className="w-14 h-14 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                   <ShieldCheck className="text-emerald-600 dark:text-emerald-400 w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Audit-Proof Reliability</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                   Never fear an audit again. Our immutable ledgers and automated compliance reporting ensure you are always cleared with zero findings by external auditors.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* CORE ENGINE SECTION */}
      <section className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(203,213,225,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(203,213,225,0.2)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(30,41,59,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.3)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-brand-600 dark:text-brand-400 font-semibold tracking-wide uppercase text-sm mb-2">The Gradiate Core</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">The Heart of Your Digital Campus</h3>
            <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400 text-lg">
              A unified data layer acts as the single source of truth, synchronizing information instantly across every department and application.
            </p>
          </div>

          <div className="relative w-full max-w-[800px] h-[600px] mx-auto hidden md:block mt-16 mb-20 select-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] border border-slate-100 dark:border-slate-800 rounded-full -z-20"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-slate-200 dark:border-slate-800 rounded-full -z-20"></div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 group">
              <div className="relative">
                <div className={`w-48 h-48 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-full flex items-center justify-center shadow-[0_0_50px_-10px_rgba(13,148,136,0.25)] border-2 transition-all duration-500 relative z-20 ${activeCoreService ? 'border-brand-400 scale-105 shadow-[0_0_70px_-10px_rgba(13,148,136,0.5)]' : 'border-white dark:border-slate-700 ring-1 ring-slate-100 dark:ring-slate-800'}`}>
                    <div className="text-center transition-all duration-300 px-4 w-full flex flex-col items-center justify-center h-full">
                      {activeCoreService && activeServiceData ? (
                        <div className="animate-in fade-in zoom-in duration-300">
                          <div className="w-12 h-12 bg-brand-50 dark:bg-brand-900/20 rounded-xl flex items-center justify-center mx-auto mb-2 text-brand-600 dark:text-brand-400 shadow-sm border border-brand-100 dark:border-brand-800">
                              {ActiveIcon && <ActiveIcon size={24} />}
                          </div>
                          <h4 className="font-bold text-slate-900 dark:text-white text-lg leading-tight">{activeServiceData.name}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium leading-relaxed line-clamp-2 px-1">
                            {activeServiceData.description}
                          </p>
                        </div>
                      ) : (
                        <div className="animate-in fade-in zoom-in duration-300 flex flex-col items-center">
                          <div className="relative mb-3">
                            <div className="absolute inset-0 bg-brand-400 blur-lg opacity-20 animate-pulse rounded-full"></div>
                            <div className="bg-gradient-to-br from-brand-500 to-brand-700 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg relative z-10 rotate-3 transition-transform group-hover:rotate-0">
                              <Network className="text-white w-8 h-8" />
                            </div>
                          </div>
                          <span className="font-bold text-slate-800 dark:text-white tracking-tight text-lg">Gradiate Core</span>
                          <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mt-2 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Online
                          </span>
                        </div>
                      )}
                    </div>
                </div>
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full -z-10 transition-all duration-700 border-2 border-dashed ${activeCoreService ? 'w-64 h-64 border-brand-300/50 dark:border-brand-800/50 animate-[spin_10s_linear_infinite]' : 'w-60 h-60 border-slate-200/60 dark:border-slate-800/60 animate-[spin_20s_linear_infinite]'}`}></div>
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full -z-20 transition-all duration-500 bg-brand-500/5 blur-3xl ${activeCoreService ? 'w-96 h-96 opacity-100' : 'w-72 h-72 opacity-0'}`}></div>
              </div>
            </div>

            {CORE_SERVICES_DATA.map((service) => (
               <div 
                 key={service.id}
                 className={`absolute ${service.position} flex flex-col items-center gap-3 group cursor-pointer transition-all duration-500 z-20 ${service.hoverTranslate}`}
                 onMouseEnter={() => setActiveCoreService(service.id)}
                 onMouseLeave={() => setActiveCoreService(null)}
                 onClick={() => setActiveCoreService(service.id)}
               >
                 <div className={`relative px-4 py-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border rounded-2xl shadow-sm transition-all duration-300 flex items-center gap-3 min-w-[140px] ${
                    activeCoreService === service.id 
                    ? 'border-brand-400 dark:border-brand-500 shadow-[0_10px_25px_-5px_rgba(13,148,136,0.3)] scale-110 -translate-y-1 ring-2 ring-brand-100 dark:ring-brand-900/50' 
                    : 'border-slate-200 dark:border-slate-800 hover:border-brand-200 dark:hover:border-brand-800 hover:shadow-md'
                 }`}>
                   <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300 ${activeCoreService === service.id ? 'bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300' : 'bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-brand-50 group-hover:text-brand-600'}`}>
                      <service.icon size={20} />
                   </div>
                   <span className={`text-sm font-bold transition-colors ${activeCoreService === service.id ? 'text-brand-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                     {service.name}
                   </span>
                   {activeCoreService === service.id && (
                     <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-500"></span>
                     </span>
                   )}
                 </div>
                 <div className={`absolute -z-10 transition-all duration-500 ${service.lineStyle} ${
                    activeCoreService === service.id 
                    ? `bg-gradient-to-r from-brand-400 via-brand-300 to-brand-400 bg-[length:200%_auto] opacity-100 shadow-[0_0_10px_rgba(45,212,191,0.5)]` 
                    : `${service.lineBaseClass} opacity-30`
                 }`}></div>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO EXPLAINER SECTION */}
      <section className="py-20 bg-slate-900 dark:bg-black text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-brand-900/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-academic-900/30 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold uppercase tracking-widest mb-6 border border-brand-500/30">
                 <Play size={12} className="fill-current" /> Watch the Tour
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Experience the Future of <br/><span className="text-brand-400">Campus Management</span>
              </h2>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                See how Gradiate connects every aspect of university life—from the registrar's office to the dorm room—into one seamless, intelligent ecosystem.
              </p>
              <button 
                onClick={handlePlayVideo}
                className="px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-brand-500/25 flex items-center gap-3 group"
              >
                Watch Demo <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="lg:w-1/2 w-full">
              <div className="relative aspect-video w-full bg-black rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
                <video 
                  ref={videoRef}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${isVideoPlaying ? 'opacity-100' : 'opacity-0'}`}
                  controls={isVideoPlaying}
                  src="https://www.pexels.com/download/video/3121459/"
                  onPlay={() => setIsVideoPlaying(true)}
                  onPause={() => setIsVideoPlaying(false)}
                >
                  Your browser does not support the video tag.
                </video>
                {!isVideoPlaying && (
                  <div className="absolute inset-0 z-20 group cursor-pointer bg-slate-800" onClick={handlePlayVideo}>
                    <img src="https://picsum.photos/seed/gradiate-demo/800/450" alt="Gradiate Platform Preview" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300 group-hover:bg-brand-600/90 group-hover:border-transparent">
                          <Play size={32} className="text-white fill-white ml-1" />
                        </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Compliance Section */}
      <section className="py-20 bg-slate-900 dark:bg-black text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="text-brand-400 h-6 w-6" />
                <span className="text-brand-400 font-bold uppercase tracking-wider text-sm">Enterprise Grade</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Engineered for <span className="text-brand-400">Total Audit Clearance</span> & Trust
              </h2>
              <p className="text-lg leading-relaxed text-slate-400">
                Tertiary institutions require more than just software; they need certainty. Gradiate provides the irrefutable evidence of data integrity required to satisfy the Auditor-General and external audit firms.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-brand-500/50 transition-colors">
                  <Globe className="text-brand-400 h-8 w-8 mb-4" />
                  <h4 className="text-white font-bold text-lg mb-2">Global Compliance</h4>
                  <p className="text-sm text-slate-400">Fully compliant with FERPA, GDPR, HIPAA, and local higher-ed mandates.</p>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-brand-500/50 transition-colors">
                  <Server className="text-brand-400 h-8 w-8 mb-4" />
                  <h4 className="text-white font-bold text-lg mb-2">Dedicated Infrastructure</h4>
                  <p className="text-sm text-slate-400">Option for isolated, single-tenant infrastructure ensures your data remains physically segregated.</p>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-brand-500/50 transition-colors">
                  <FileCheck className="text-brand-400 h-8 w-8 mb-4" />
                  <h4 className="text-white font-bold text-lg mb-2">Audit & Traceability</h4>
                  <p className="text-sm text-slate-400">Immutable audit logs track every transaction and access request.</p>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-brand-500/50 transition-colors">
                  <Lock className="text-brand-400 h-8 w-8 mb-4" />
                  <h4 className="text-white font-bold text-lg mb-2">Defense-Grade Security</h4>
                  <p className="text-sm text-slate-400">Zero-trust architecture, end-to-end encryption, and automated threat detection.</p>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Grid */}
      <section id="solutions" className="py-24 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-brand-600 dark:text-brand-400 font-semibold tracking-wide uppercase text-sm mb-2">The Ecosystem</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Complete Coverage. Zero Friction.</h3>
            <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400 text-lg">
              Gradiate modules are designed to work together seamlessly, eliminating data silos and administrative headaches.
            </p>
          </div>

          <div className="flex justify-center flex-wrap gap-2 mb-12">
            {['All', 'Administration', 'Academics', 'Student Life', 'Intelligence'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTab === tab 
                    ? 'bg-brand-600 text-white shadow-md' 
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFeatures.map((feature) => (
              <FeatureCard key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON SECTION */}
      <section id="comparison" className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
               <h2 className="text-brand-600 dark:text-brand-400 font-semibold tracking-wide uppercase text-sm mb-2">Why Institutions Switch</h2>
               <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">See How We Stack Up</h3>
            </div>
            <div className="overflow-x-auto pb-6 -mx-4 px-4 md:mx-0 md:px-0">
                <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700">
                            <th className="py-6 px-6 text-slate-500 dark:text-slate-400 font-medium w-1/4">Features</th>
                            <th className="py-6 px-6 text-center w-1/4 bg-brand-50/50 dark:bg-brand-900/20 rounded-t-2xl border-x border-t border-brand-100 dark:border-brand-800 relative">
                                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full shadow-sm">Recommended</span>
                                <div className="flex flex-col items-center">
                                    <div className="p-2 bg-brand-100 dark:bg-brand-900/40 rounded-lg mb-2">
                                        <GraduationCap className="text-brand-600 dark:text-brand-400 w-6 h-6" />
                                    </div>
                                    <span className="text-xl font-bold text-slate-900 dark:text-white">Gradiate</span>
                                </div>
                            </th>
                            <th className="py-6 px-6 text-center w-1/4 opacity-60 font-bold text-slate-600 dark:text-slate-400">Legacy ERPs</th>
                            <th className="py-6 px-6 text-center w-1/4 opacity-60 font-bold text-slate-600 dark:text-slate-400">Point Solutions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {COMPARISON_DATA.map((row, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                                <td className="py-5 px-6">
                                    <div className="font-semibold text-slate-800 dark:text-slate-200">{row.feature}</div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-normal max-w-xs">{row.note}</div>
                                </td>
                                <td className="py-5 px-6 text-center bg-brand-50/30 dark:bg-brand-900/10 border-x border-brand-50 dark:border-brand-900/20">
                                    {row.gradiate === true ? <div className="flex justify-center"><div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm"><Check size={18} strokeWidth={3} /></div></div> : <span className="font-bold text-brand-700 dark:text-brand-300 bg-brand-100/50 dark:bg-brand-900/40 px-3 py-1 rounded-lg text-sm">{row.gradiate}</span>}
                                </td>
                                <td className="py-5 px-6 text-center">{row.legacy === false ? <div className="flex justify-center opacity-40"><Minus size={18} /></div> : typeof row.legacy === 'string' ? <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">{row.legacy}</span> : <div className="flex justify-center"><Check size={18} className="text-emerald-600/70" /></div>}</td>
                                <td className="py-5 px-6 text-center">{row.point === false ? <div className="flex justify-center opacity-40"><Minus size={18} /></div> : typeof row.point === 'string' ? <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">{row.point}</span> : <div className="flex justify-center"><Check size={18} className="text-emerald-600/70" /></div>}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </section>

      {/* Feature Spotlight: Insights */}
      <section className="py-24 bg-academic-900 dark:bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-3 py-1 bg-brand-500/20 text-brand-300 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Powered by Gradiate Intelligence</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Decisions Driven by Data, <br/> Not Guesswork.</h2>
              <p className="text-slate-300 dark:text-slate-400 text-lg mb-8 leading-relaxed">Gradiate Insights uses advanced machine learning to predict student retention risks, optimize resource allocation, and provide real-time financial forecasting.</p>
              <button className="text-brand-300 font-semibold hover:text-white transition-colors flex items-center gap-2 group">Learn about Insights <span className="group-hover:translate-x-1 transition-transform">→</span></button>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-brand-500/30 rounded-full blur-3xl"></div>
              <div className="relative bg-slate-800 dark:bg-slate-950 border border-slate-700 dark:border-slate-800 rounded-2xl p-6 shadow-2xl">
                 <div className="flex items-center gap-4 mb-6 border-b border-slate-700 dark:border-slate-800 pb-4">
                   <div className="h-10 w-10 bg-brand-600 rounded-lg flex items-center justify-center"><BarChart3 className="text-white" /></div>
                   <div><h4 className="font-bold">Enrollment Forecast</h4><p className="text-xs text-slate-400">Fall Semester 2025</p></div>
                 </div>
                 <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-slate-400"><span>Engineering</span><span>+12%</span></div>
                      <div className="h-2 bg-slate-700 dark:bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-brand-500 w-[85%]"></div></div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-slate-400"><span>Business</span><span>+18%</span></div>
                      <div className="h-2 bg-slate-700 dark:bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-teal-400 w-[92%]"></div></div>
                    </div>
                 </div>
                 <div className="mt-6 pt-4 border-t border-slate-700 dark:border-slate-800 text-xs text-slate-400 flex gap-2"><Sparkles size={14} className="text-brand-400" /> AI analysis suggests increasing Engineering faculty capacity by 10%.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories / Case Studies */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-brand-600 dark:text-brand-400 font-semibold tracking-wide uppercase text-sm mb-2">Impact Stories</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Real Problems. Gradiate Solutions.</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {CASE_STUDIES.map((study, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800 flex flex-col group">
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/10 transition-colors z-10"></div>
                  <img src={study.image} alt={study.institution} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute bottom-4 left-4 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider shadow-sm">{study.institution}</div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{study.title}</h4>
                  <div className="mb-6 space-y-4 flex-1">
                    <div><p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-1">The Challenge</p><p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{study.challenge}</p></div>
                    <div><p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-1">The Gradiate Solution</p><p className="text-brand-700 dark:text-brand-400 text-sm font-medium leading-relaxed">{study.solution}</p></div>
                  </div>
                  <div className="border-t border-slate-100 dark:border-slate-800 pt-6 mt-auto">
                    <div className="grid grid-cols-2 gap-4">
                      {study.stats.map((stat, i) => (
                        <div key={i}><div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div><div className="text-xs text-slate-500 dark:text-slate-400 font-medium">{stat.label}</div></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Ready to transform your campus?</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-10">Join over 500 forward-thinking universities and colleges building the future of education with Gradiate.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-lg transition-all shadow-lg hover:-translate-y-1">Schedule a Live Demo</button>
            <button className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 font-bold rounded-lg transition-all">Contact Sales</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-black text-slate-300 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-slate-800 pb-12 mb-12">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6 text-center md:text-left">Strategic Partners & Technology Sponsors</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-8 md:gap-12 items-center grayscale dark:grayscale-0 opacity-70 dark:opacity-80 hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-2 font-bold text-xl text-slate-400 dark:text-white"><div className="w-8 h-8 rounded bg-slate-700 flex items-center justify-center text-white font-serif">C</div> CloudScale</div>
                <div className="font-mono font-bold text-lg text-slate-400 dark:text-white">DEV<span className="text-brand-500">OPS</span>.io</div>
                <div className="flex items-center gap-2 font-semibold text-lg text-slate-400 dark:text-white"><div className="w-6 h-6 border-2 border-slate-500 rounded-full dark:border-white"></div> SENTRY</div>
                <div className="font-serif italic font-bold text-xl text-slate-400 dark:text-white">EduGlobal</div>
                <div className="font-bold text-lg text-slate-400 dark:text-white tracking-tighter">DATA<span className="font-light">FLOW</span></div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4"><GraduationCap className="text-white h-6 w-6" /><span className="text-xl font-bold text-white">Gradiate</span></div>
              <p className="text-sm text-slate-400">Empowering the next generation of learners with the world's most comprehensive campus operating system.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-brand-400 transition-colors">Gradiate SIS</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Gradiate LMS</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Gradiate Finance</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-brand-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2"><ShieldCheck size={16} className="text-brand-400"/> Compliance</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center gap-2 hover:text-white transition-colors cursor-default"><span className="text-emerald-500">✓</span> ISO 27001 Certified</li>
                <li className="flex items-center gap-2 hover:text-white transition-colors cursor-default"><span className="text-emerald-500">✓</span> SOC2 Type II</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-brand-400 transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center md:text-left flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-slate-500">© 2024 Gradiate Inc. All rights reserved. Proudly built in South Africa 🇿🇦</p>
            <div className="flex gap-6 mt-4 md:mt-0 text-xs text-slate-500">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
      <AiAssistant />
    </div>
  );
};

export default App;