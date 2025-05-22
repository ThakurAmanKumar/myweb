
import React from 'react';
import { ArrowUp } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-10 border-t border-white/10">
      <div className="container px-4">
        <div className="flex flex-col items-center">
          <a 
            href="#home"
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors mb-6"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </a>
          
          <div className="mb-4">
            <a href="#home" className="text-xl font-bold neon-text">
              AKT.
            </a>
          </div>
          
          <p className="text-center text-sm text-foreground/60">
            &copy; {new Date().getFullYear()} Aman Kumar Thakur. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
