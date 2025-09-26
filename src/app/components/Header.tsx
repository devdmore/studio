'use client';

import { Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { portfolioData } from '@/lib/portfolio-data';

const navLinks = [
  { href: '#summary', label: 'Summary' },
  { href: '#skills', label: 'Skills' },
  { href: '#work-history', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-sm border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold text-primary font-headline"
          >
            {portfolioData.personal.name}
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <Link href="#" aria-label="GitHub">
              <Github className="h-5 w-5 text-foreground/80 hover:text-primary" />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 text-foreground/80 hover:text-primary" />
            </Link>
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-5 w-5 text-foreground/80 hover:text-primary" />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
