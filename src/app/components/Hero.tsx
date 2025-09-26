import { Mail, MapPin, Phone } from 'lucide-react';
import type { PersonalData } from '@/lib/portfolio-data';

export function Hero({ data }: { data: PersonalData }) {
  return (
    <div className="py-24 sm:py-32 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl font-headline">
        {data.name}
      </h1>
      <p className="mt-6 text-xl leading-8 text-primary font-medium">
        {data.title}
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 text-muted-foreground">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span>{data.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4" />
          <a href={`tel:${data.phone}`} className="hover:text-primary">
            {data.phone}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          <a href={`mailto:${data.email}`} className="hover:text-primary">
            {data.email}
          </a>
        </div>
      </div>
    </div>
  );
}
