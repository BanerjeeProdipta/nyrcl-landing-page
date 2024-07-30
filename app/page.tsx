import React from 'react';
import Scene from './component/BallScene';
import Content from './component/Content';

const Home: React.FC = () => {
  return (
    <main className="relative bg-gray-100 min-h-screen">
      <div className="fixed inset-0 pointer-events-none z-0">
        <Scene />
      </div>
      <Content />
    </main>
  );
};

export default Home;
