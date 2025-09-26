import { Briefcase } from 'lucide-react';
import { Section, SectionTitle } from './Section';
import type { WorkExperience } from '@/lib/portfolio-data';

export function WorkHistory({ workHistory }: { workHistory: WorkExperience[] }) {
  return (
    <Section id="work-history">
      <SectionTitle>Work History</SectionTitle>
      <div className="relative max-w-3xl mx-auto">
        <div
          className="absolute left-0 top-0 h-full w-0.5 bg-border ml-3"
          aria-hidden="true"
        ></div>
        <div className="space-y-12">
          {workHistory.map((job, index) => (
            <div key={index} className="relative pl-10">
              <div className="absolute left-0 top-1 w-6 h-6 bg-background border-2 border-primary rounded-full flex items-center justify-center">
                <Briefcase className="w-3 h-3 text-primary" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-xl font-bold text-primary font-headline">
                  {job.title}
                </h3>
                <p className="text-sm text-foreground/60 mt-1 sm:mt-0">
                  {job.duration}
                </p>
              </div>
              <p className="font-semibold text-accent mb-4">{job.company}</p>
              <ul className="list-disc list-outside space-y-2 text-foreground/80 marker:text-primary pl-5">
                {job.responsibilities.map((resp, i) => (
                  <li key={i}>{resp}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
