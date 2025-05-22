
import React, { useState } from 'react';
import { Github, ExternalLink, Code } from 'lucide-react';
import { useProjectsData } from '@/hooks/useSectionData';

export function ProjectsSection() {
  const projects = useProjectsData();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="py-20 md:py-28 bg-secondary/20">
      <div className="container px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
          My <span className="neon-text">Projects</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-neon-glow"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative h-52 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
                  style={{
                    transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/90"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-4 flex justify-between items-end">
                  <h3 className="text-xl font-medium">{project.title}</h3>
                  
                  <div className="flex space-x-2">
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus-ring"
                        aria-label={`GitHub repository for ${project.title}`}
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {project.demo && (
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus-ring"
                        aria-label={`Live demo for ${project.title}`}
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-foreground/80 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex} 
                      className="px-2 py-1 text-xs rounded-full bg-primary/10 border border-primary/20 text-primary/90"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="https://github.com/ThakurAmanKumar" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-foreground/90 font-medium border border-white/10 transition-all hover:-translate-y-1 focus-ring"
          >
            <Code className="w-5 h-5" />
            View More Projects
          </a>
        </div>
      </div>
    </section>
  );
}
