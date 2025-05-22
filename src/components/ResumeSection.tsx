
import React from 'react';
import { Download } from 'lucide-react';
import { useResumeData } from '@/hooks/useSectionData';

export function ResumeSection() {
  const resumeContent = useResumeData();

  return (
    <section id="resume" className="py-20 md:py-28">
      <div className="container px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          My <span className="neon-text">Resume</span>
        </h2>
        
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-10">
          {resumeContent.displayText}
        </p>
        
        <a
          href={resumeContent.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-medium transition-all hover:-translate-y-1 hover:shadow-neon-glow focus-ring"
        >
          <Download className="w-5 h-5" />
          View Resume
        </a>
      </div>
    </section>
  );
}
