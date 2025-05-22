
import React from 'react';
import { ExternalLink, CheckCircle } from 'lucide-react';
import { useCertificationsData } from '@/hooks/useSectionData';

export function CertificationsSection() {
  const certifications = useCertificationsData();

  return (
    <section id="certifications" className="py-20 md:py-28">
      <div className="container px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
          <span className="neon-text">Certifications</span> & Achievements
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <div 
              key={cert.id}
              className="glass-card rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-neon-glow animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4">
                <h3 className="text-lg font-medium">{cert.title}</h3>
                <p className="text-sm text-foreground/70">{cert.issuer}</p>
                <p className="text-xs text-primary mt-1">{cert.date}</p>
              </div>
              
              <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
                <div className="flex items-center text-green-400 text-sm">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Verified
                </div>
                
                <a 
                  href={cert.link} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm flex items-center text-primary hover:text-primary/80 focus-ring rounded px-2 py-1"
                >
                  View
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
