import { GraduationCap } from 'lucide-react';
import { Section, SectionTitle } from './Section';
import type { EducationItem } from '@/lib/portfolio-data';

export function Education({ education }: { education: EducationItem[] }) {
  return (
    <Section id="education">
      <SectionTitle>Education</SectionTitle>
      <div className="max-w-3xl mx-auto space-y-8">
        {education.map((edu, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="mt-1">
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-accent">{edu.degree}</h3>
              <p className="font-semibold text-foreground/80">
                {edu.institution}
              </p>
              <p className="text-sm text-foreground/60">{edu.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
