import { Section, SectionTitle } from './Section';
import { ProjectCard } from './ProjectCard';
import type { Project } from '@/lib/portfolio-data';

export function Projects({ projects }: { projects: Project[] }) {
  return (
    <Section id="projects">
      <SectionTitle>Key Projects</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </Section>
  );
}
