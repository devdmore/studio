'use client';

import { useState } from 'react';
import type { PortfolioData } from '@/lib/portfolio-data';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Summary } from './Summary';
import { Skills } from './Skills';
import { WorkHistory } from './WorkHistory';
import { Projects } from './Projects';
import { Education } from './Education';
import { ContactForm } from './ContactForm';

export function AIPersonalization({ data }: { data: PortfolioData }) {
  const [viewMode, setViewMode] = useState<'recruiter' | 'peer'>('recruiter');

  const sections = {
    summary: <Summary key="summary" summary={data.summary} />,
    skills: <Skills key="skills" skills={data.skills} />,
    workHistory: (
      <WorkHistory key="workHistory" workHistory={data.workHistory} />
    ),
    projects: <Projects key="projects" projects={data.projects} />,
    education: <Education key="education" education={data.education} />,
    contact: <ContactForm key="contact" />,
  };

  const recruiterOrder = [
    sections.summary,
    sections.workHistory,
    sections.skills,
    sections.projects,
    sections.education,
    sections.contact,
  ];

  const peerOrder = [
    sections.skills,
    sections.projects,
    sections.workHistory,
    sections.summary,
    sections.education,
    sections.contact,
  ];

  return (
    <>
      <div className="my-12 flex items-center justify-center space-x-3 rounded-lg border border-primary/20 bg-card p-4 shadow-lg shadow-primary/10">
        <Label htmlFor="view-mode-toggle" className="text-foreground/80">Recruiter View</Label>
        <Switch
          id="view-mode-toggle"
          checked={viewMode === 'peer'}
          onCheckedChange={(checked) =>
            setViewMode(checked ? 'peer' : 'recruiter')
          }
          aria-label="Toggle between Recruiter and Peer view"
        />
        <Label htmlFor="view-mode-toggle" className="text-accent">Peer View</Label>
      </div>

      <div className="space-y-16 md:space-y-24">
        {viewMode === 'recruiter' ? recruiterOrder : peerOrder}
      </div>
    </>
  );
}
