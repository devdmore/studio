import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import type { Project } from '@/lib/portfolio-data';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="bg-card/50 border-primary/20 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
      <CardHeader>
        <CardTitle className="text-primary">{project.title}</CardTitle>
        <CardDescription className="text-foreground/70 h-12">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="bg-accent/20 text-accent"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      {project.link && (
        <CardFooter>
          <Link
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-primary hover:underline"
          >
            View Project <ArrowUpRight className="w-4 h-4" />
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}
