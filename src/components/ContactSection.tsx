
import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';
import { useContactData } from '@/hooks/useSectionData';

export function ContactSection() {
  const { contactInfo, emailConfig } = useContactData();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Using EmailJS to send emails with user's config or fallback to provided values
    emailjs.sendForm(
      emailConfig.serviceId || 'service_6r6avmc',
      emailConfig.templateId || 'template_ypkhjk6',
      formRef.current!,
      emailConfig.publicKey || 'JhX_UZgTWQtz7medU'
    )
    .then((result) => {
      console.log('Email sent successfully:', result.text);
      toast({
        title: "Success",
        description: "Message sent successfully!",
        variant: "default",
      });
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      setIsSubmitting(false);
    }, (error) => {
      console.error('EmailJS error:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    });
  };

  // Find contact information from stored data or use defaults
  const getContactInfoByType = (type: string) => {
    const info = contactInfo.find(item => item.type.toLowerCase() === type.toLowerCase());
    return info?.value || '';
  };

  const email = getContactInfoByType('email') || 'aman.thakur@example.com';
  const phone = getContactInfoByType('phone') || '+91 98765 43210';
  const location = getContactInfoByType('location') || 'New Delhi, India';
  const github = getContactInfoByType('github') || 'https://github.com/ThakurAmanKumar';
  const linkedin = getContactInfoByType('linkedin') || 'https://www.linkedin.com/in/amankumarthakur1';
  const website = getContactInfoByType('website') || 'https://amankumarthakur.com.np/';

  return (
    <section id="contact" className="py-20 md:py-28 bg-secondary/20">
      <div className="container px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
          Get in <span className="neon-text">Touch</span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="glass-card rounded-xl p-8">
            <h3 className="text-2xl font-medium mb-6">Let's Talk</h3>
            <p className="text-foreground/80 mb-8">
              Feel free to reach out for collaborations, opportunities, or just a friendly chat about technology and innovation.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-foreground/70 mt-1">{email}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <p className="text-foreground/70 mt-1">{phone}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium">Location</h4>
                  <p className="text-foreground/70 mt-1">{location}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10 flex gap-4">
              <a 
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-foreground/70 hover:text-foreground focus-ring"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.84 21.489C9.34 21.581 9.52 21.276 9.52 21.014C9.52 20.775 9.512 20.024 9.508 19.153C6.726 19.796 6.139 17.776 6.139 17.776C5.684 16.562 5.022 16.258 5.022 16.258C4.127 15.606 5.088 15.619 5.088 15.619C6.081 15.689 6.608 16.679 6.608 16.679C7.5 18.261 8.936 17.824 9.54 17.571C9.631 16.898 9.889 16.461 10.175 16.218C7.954 15.972 5.62 15.079 5.62 11.257C5.62 10.127 6.01 9.206 6.628 8.489C6.526 8.24 6.183 7.282 6.728 5.967C6.728 5.967 7.566 5.701 9.496 6.937C10.295 6.713 11.155 6.601 12.005 6.597C12.855 6.601 13.715 6.713 14.515 6.937C16.444 5.701 17.281 5.967 17.281 5.967C17.827 7.282 17.484 8.24 17.382 8.489C18.001 9.206 18.389 10.127 18.389 11.257C18.389 15.089 16.052 15.968 13.824 16.21C14.18 16.51 14.498 17.103 14.498 18.008C14.498 19.3 14.488 20.687 14.488 21.014C14.488 21.279 14.664 21.587 15.174 21.487C19.145 20.161 22.007 16.416 22.007 12C22.007 6.477 17.53 2 12.007 2H12Z" fill="currentColor"/>
                </svg>
              </a>
              <a 
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-foreground/70 hover:text-foreground focus-ring"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452H16.893V14.883C16.893 13.555 16.866 11.846 15.041 11.846C13.188 11.846 12.905 13.291 12.905 14.785V20.452H9.351V9H12.765V10.561H12.811C13.288 9.661 14.448 8.711 16.181 8.711C19.782 8.711 20.448 11.081 20.448 14.166V20.452H20.447ZM5.337 7.433C4.193 7.433 3.274 6.507 3.274 5.368C3.274 4.23 4.194 3.305 5.337 3.305C6.477 3.305 7.401 4.23 7.401 5.368C7.401 6.507 6.476 7.433 5.337 7.433ZM7.119 20.452H3.555V9H7.119V20.452Z" fill="currentColor"/>
                </svg>
              </a>
              <a 
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-foreground/70 hover:text-foreground focus-ring"
                aria-label="Portfolio"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.05 19.44 4 16.08 4 12C4 11.38 4.08 10.79 4.21 10.21L9 15V16C9 17.1 9.9 18 11 18V19.93ZM17.9 17.39C17.64 16.58 16.9 16 16 16H15V13C15 12.45 14.55 12 14 12H8V10H10C10.55 10 11 9.55 11 9V7H13C14.1 7 15 6.1 15 5V4.59C17.93 5.78 20 8.65 20 12C20 14.08 19.2 15.97 17.9 17.39Z" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <form ref={formRef} onSubmit={handleSubmit} className="glass-card rounded-xl p-8">
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary focus:ring-0 focus-ring text-foreground placeholder:text-foreground/50"
                  placeholder="Your name"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary focus:ring-0 focus-ring text-foreground placeholder:text-foreground/50"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary focus:ring-0 focus-ring text-foreground placeholder:text-foreground/50 resize-none"
                  placeholder="Write your message here..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium transition-all hover:-translate-y-1 focus-ring disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
