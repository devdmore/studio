import { cn } from '@/lib/utils';
import type React from 'react';

export function Section({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn('scroll-mt-20 py-8 md:py-16', className)}>
      {children}
    </section>
  );
}

export function SectionTitle({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      className={cn(
        'text-3xl font-bold tracking-tight text-primary sm:text-4xl mb-12 text-center font-headline',
        className
      )}
    >
      {children}
    </h2>
  );
}
