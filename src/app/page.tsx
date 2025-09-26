import { Header } from '@/app/components/Header';
import { Hero } from '@/app/components/Hero';
import { AIPersonalization } from '@/app/components/AIPersonalization';
import { Footer } from '@/app/components/Footer';
import { portfolioData } from '@/lib/portfolio-data';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container mx-auto flex-grow px-4 sm:px-6 lg:px-8">
        <Hero data={portfolioData.personal} />
        <AIPersonalization data={portfolioData} />
      </main>
      <Footer />
    </div>
  );
}
