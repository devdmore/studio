'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Section, SectionTitle } from './Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { SkillsData } from '@/lib/portfolio-data';

export function Skills({ skills }: { skills: SkillsData }) {
  const chartData = [
    ...skills.advanced.map((skill) => ({
      name: skill,
      proficiency: 95,
      fill: 'var(--color-advanced)',
    })),
    ...skills.proficient.map((skill) => ({
      name: skill,
      proficiency: 80,
      fill: 'var(--color-proficient)',
    })),
    ...skills.knowledgeOf.map((skill) => ({
      name: skill,
      proficiency: 60,
      fill: 'var(--color-knowledge)',
    })),
    ...skills.experienceWith.map((skill) => ({
      name: skill,
      proficiency: 70,
      fill: 'var(--color-experience)',
    })),
  ].sort((a, b) => b.proficiency - a.proficiency);

  const chartConfig = {
    proficiency: {
      label: 'Proficiency',
    },
    advanced: {
      label: 'Advanced',
      color: 'hsl(var(--primary))',
    },
    proficient: {
      label: 'Proficient',
      color: 'hsl(var(--accent))',
    },
    knowledge: {
      label: 'Knowledge Of',
      color: 'hsl(var(--secondary-foreground) / 0.8)',
    },
    experience: {
      label: 'Experience With',
      color: 'hsl(var(--muted-foreground))',
    },
  };

  return (
    <Section id="skills">
      <SectionTitle>Skills</SectionTitle>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Card className="flex flex-col h-full bg-card/50 border-primary/20 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="text-primary">Technical Skills</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow space-y-6 text-foreground/80">
            <div>
              <h3 className="font-semibold text-lg mb-2 text-accent">
                Advanced
              </h3>
              <p>{skills.advanced.join(', ')}.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 text-accent">
                Proficient
              </h3>
              <p>{skills.proficient.join(', ')}.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 text-accent">
                Knowledge of
              </h3>
              <p>{skills.knowledgeOf.join(', ')}.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 text-accent">
                Experience with
              </h3>
              <p>{skills.experienceWith.join(', ')}.</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary">Proficiency Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="w-full h-[500px]">
              <BarChart
                accessibilityLayer
                data={chartData}
                layout="horizontal"
                margin={{ top: 10, right: 10, left: 10, bottom: 40 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="name"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                  height={80}
                  tickFormatter={(value) =>
                    value.length > 15 ? `${value.slice(0, 15)}...` : value
                  }
                  className="fill-foreground text-sm"
                />
                <YAxis dataKey="proficiency" type="number" hide />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="proficiency" layout="horizontal" radius={5} barSize={20} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
