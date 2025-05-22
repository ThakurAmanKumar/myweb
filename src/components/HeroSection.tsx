
import React from 'react';
import { ArrowDown } from 'lucide-react';
import { useHeroData } from '@/hooks/useSectionData';

export function HeroSection() {
  const heroContent = useHeroData();
  
  return (
    <section id="home" className="min-h-screen hero-grid flex flex-col justify-center items-center pt-20 pb-10 relative overflow-hidden">
      <div className="container px-4 flex flex-col items-center text-center z-10">
        <div className="mb-8 relative">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-primary glass-card flex items-center justify-center overflow-hidden animate-float">
            {/* Profile image */}
            <img 
              src={heroContent.profileImage || "/lovable-uploads/5c21ee8d-a99c-4a3a-8120-0e2e7c973c21.png"} 
              alt={heroContent.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/400x400/1A1F2C/FFFFFF?text=AK';
              }}
            />
          </div>
          <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-green-500 border-2 border-background"></div>
        </div>
        
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
          <span className="block">Hi, I'm {heroContent.name}</span>
          <span className="text-xl md:text-2xl lg:text-3xl text-primary/90 font-normal">{heroContent.jobTitle}</span>
        </h1>
        
        <p className="max-w-2xl text-lg md:text-xl text-foreground/80 mb-8">
          Student of <span className="neon-text font-semibold">Computer Science Engineering</span> Specializing in AI, ML.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <a 
            href="#about" 
            className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium transition-all hover:-translate-y-1 hover:shadow-neon-glow focus-ring"
          >
            Discover More
          </a>
          <a 
            href="#contact" 
            className="px-6 py-3 rounded-lg bg-secondary text-foreground/90 font-medium border border-white/10 transition-all hover:-translate-y-1 focus-ring"
          >
            Get In Touch
          </a>
        </div>
      </div>
      
      <a 
        href="#about"
        className="absolute bottom-8 animate-bounce p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
        aria-label="Scroll down"
      >
        <ArrowDown className="w-5 h-5" />
      </a>
      
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-70"></div>
    </section>
  );
}
