
import React, { useEffect, useState } from 'react';
import { CommandDialog } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Command, Download, Home, Mail, User, BookOpen, Award, Github, Lock } from "lucide-react";
import AdminLogin from "@/components/AdminLogin";

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export function NavigationBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        e.preventDefault();
        setOpen((prevOpen) => !prevOpen);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navItems: NavItem[] = [
    { name: 'Home', href: '#home', icon: <Home className="h-4 w-4" /> },
    { name: 'About', href: '#about', icon: <User className="h-4 w-4" /> },
    { name: 'Projects', href: '#projects', icon: <Github className="h-4 w-4" /> },
    { name: 'Certifications', href: '#certifications', icon: <Award className="h-4 w-4" /> },
    { name: 'Contact', href: '#contact', icon: <Mail className="h-4 w-4" /> },
    { name: 'Resume', href: '#resume', icon: <Download className="h-4 w-4" /> },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "py-3 backdrop-blur-md bg-background/80 shadow-md"
            : "py-6 bg-transparent"
        )}
      >
        <div className="container flex items-center justify-between">
          <a 
            href="#home" 
            className="text-xl font-bold neon-text"
          >
            AKT.
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-white/5 focus-ring"
              >
                {item.name}
              </a>
            ))}
            <button
              onClick={() => setOpen(true)}
              className="ml-2 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-secondary text-foreground/80 hover:text-foreground border border-white/10 focus-ring"
            >
              <Command className="h-4 w-4" />
              <span className="hidden sm:inline">Command</span>
              <kbd className="ml-1 text-xs bg-muted px-1.5 py-0.5 rounded">⌘K</kbd>
            </button>
          </nav>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/5 focus-ring"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Command className="h-5 w-5" />
          </button>
        </div>
      </header>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="p-2 overflow-hidden">
          <div className="p-2 text-sm text-muted-foreground">
            Navigate to
          </div>
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm hover:bg-white/5 cursor-pointer focus-ring"
            >
              {item.icon}
              {item.name}
            </a>
          ))}
          <div className="mt-2 pt-2 border-t border-border/30">
            <button
              onClick={() => {
                setOpen(false);
                setShowAdminLogin(true);
              }}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm hover:bg-white/5 cursor-pointer focus-ring text-left"
            >
              <Lock className="h-4 w-4" />
              AT Login
            </button>
          </div>
        </div>
      </CommandDialog>

      <AdminLogin 
        isOpen={showAdminLogin} 
        onClose={() => setShowAdminLogin(false)} 
      />
    </>
  );
}
