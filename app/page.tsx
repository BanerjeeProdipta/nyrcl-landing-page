import React from 'react';
import Content from './component/Content';
import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('./component/BallScene'), {
  ssr: false,
});

const Home: React.FC = () => {
  return (
    <main className="relative min-h-screen text-white">
      <div className="fixed inset-0 pointer-events-none z-0">
        <Scene />
      </div>
      <Content />
    </main>
  );
};

export default Home;
