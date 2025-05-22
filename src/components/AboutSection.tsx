
import React from 'react';
import { CalendarDays, Award, BookOpen } from 'lucide-react';
import { useAboutData } from '@/hooks/useSectionData';

export function AboutSection() {
  const { aboutContent, skills, timeline } = useAboutData();

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  // Convert to array of categories
  const skillCategories = Object.keys(skillsByCategory).map(name => ({
    name,
    skills: skillsByCategory[name]
  }));

  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container px-4">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          <div className="lg:w-2/5">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              About <span className="neon-text">Me</span>
            </h2>
            
            <div className="glass-card rounded-xl p-6 mb-8">
              <p className="text-lg mb-4">
                {aboutContent.description}
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Experience Timeline</h3>
              <div className="relative pl-8 border-l border-primary/30">
                {timeline.map((item, index) => {
                  // Determine which icon to use
                  let icon;
                  if (item.title.toLowerCase().includes('internship')) {
                    icon = <Award className="w-5 h-5" />;
                  } else if (item.title.toLowerCase().includes('b.tech') || 
                            item.title.toLowerCase().includes('education')) {
                    icon = <BookOpen className="w-5 h-5" />;
                  } else {
                    icon = <CalendarDays className="w-5 h-5" />;
                  }

                  return (
                    <div key={item.id} className="mb-8 relative animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                      <div className="absolute -left-[25px] p-1.5 rounded-full bg-secondary border-2 border-primary flex items-center justify-center">
                        {icon}
                      </div>
                      <h4 className="text-sm text-primary mb-1 inline-block text-center bg-background/80 px-2 py-0.5 rounded">{item.year}</h4>
                      <h3 className="text-lg font-medium mt-1">{item.title}</h3>
                      <p className="mt-1 text-foreground/70">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="lg:w-3/5">
            <h3 className="text-xl font-semibold mb-6">Technical Skills</h3>
            
            <div className="space-y-8">
              {skillCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="glass-card rounded-xl p-6 animate-fade-in" style={{ animationDelay: `${categoryIndex * 0.15}s` }}>
                  <h4 className="text-lg font-medium mb-4">{category.name}</h4>
                  
                  <div className="space-y-5">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skill.id}>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-foreground/70">{skill.level}%</span>
                        </div>
                        <div className="h-2 w-full bg-secondary/50 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-skill-bar rounded-full animate-pulse-glow"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
