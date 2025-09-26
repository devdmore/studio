
'use client';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';

const DynamicThreeJSScene = dynamic(() => import('./components/ThreeJSScene'), {
  ssr: false,
  loading: () => <div style={{ height: '100vh', width: '100%', backgroundColor: 'hsl(var(--background))' }} />,
});


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <Suspense fallback={<div style={{ height: '100vh', width: '100%', backgroundColor: 'hsl(var(--background))' }} />}>
          <DynamicThreeJSScene />
        </Suspense>
        <div style={{ height: '1000vh' }}> {/* This div creates the scrollable area */}
          {/* You can add non-3D content here if you want it to scroll over the canvas */}
        </div>
      </main>
      <Footer />
    </div>
  );
}

