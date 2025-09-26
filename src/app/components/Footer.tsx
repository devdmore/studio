import { Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-background border-t border-border mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="#" aria-label="GitHub">
            <Github className="h-6 w-6 text-foreground/80 hover:text-primary" />
          </Link>
          <Link href="#" aria-label="LinkedIn">
            <Linkedin className="h-6 w-6 text-foreground/80 hover:text-primary" />
          </Link>
          <Link href="#" aria-label="Twitter">
            <Twitter className="h-6 w-6 text-foreground/80 hover:text-primary" />
          </Link>
        </div>
        <p className="text-sm text-foreground/60 mt-4 sm:mt-0">
          &copy; {new Date().getFullYear()} Devendra More. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
