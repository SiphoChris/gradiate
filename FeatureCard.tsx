import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ModuleFeature } from './types';

interface FeatureCardProps {
  feature: ModuleFeature;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  const Icon = feature.icon;

  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:shadow-none border border-slate-100 dark:border-slate-800 hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] hover:border-brand-200/50 dark:hover:border-brand-800/50 transition-all duration-500 ease-out overflow-hidden flex flex-col h-full hover:-translate-y-2">
      
      {/* Background Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-brand-50/40 dark:to-brand-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Top Decoration Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-400 to-brand-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-out" />

      {/* Header */}
      <div className="relative flex items-start justify-between mb-6 z-10">
        <div className="relative group-hover:scale-110 transition-transform duration-500 ease-out">
          {/* Icon Glow Effect */}
          <div className="absolute inset-0 bg-brand-400 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full" />
          
          <div className="relative w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center border border-slate-100 dark:border-slate-800 group-hover:bg-brand-600 dark:group-hover:bg-brand-500 group-hover:text-white group-hover:border-transparent transition-all duration-300 shadow-sm">
            <Icon size={28} strokeWidth={1.5} />
          </div>
        </div>
        
        <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-800 group-hover:bg-white dark:group-hover:bg-slate-700 group-hover:text-brand-600 dark:group-hover:text-brand-300 group-hover:border-brand-100 dark:group-hover:border-brand-800 transition-colors duration-300 shadow-sm">
          {feature.category}
        </span>
      </div>
      
      {/* Body */}
      <div className="relative z-10 flex-grow">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors duration-300">
          {feature.name}
        </h3>
        
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300">
          {feature.description}
        </p>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-auto pt-5 border-t border-slate-50 dark:border-slate-800 group-hover:border-slate-100 dark:group-hover:border-slate-700 transition-colors duration-300">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-slate-400 dark:text-slate-500 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-300">
            Explore Module
          </span>
          <div className="w-8 h-8 rounded-full bg-brand-50 dark:bg-brand-900/40 flex items-center justify-center text-brand-600 dark:text-brand-400 opacity-0 transform translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shadow-sm">
             <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;