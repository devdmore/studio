import { Section, SectionTitle } from './Section';

export function Summary({ summary }: { summary: string[] }) {
  return (
    <Section id="summary">
      <SectionTitle>Summary</SectionTitle>
      <div className="max-w-3xl mx-auto space-y-4 text-center text-lg text-foreground/80">
        {summary.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </Section>
  );
}
