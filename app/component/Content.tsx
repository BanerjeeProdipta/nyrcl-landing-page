'use client';
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Content = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (containerRef.current && triggerRef.current) {
      const sections = gsap.utils.toArray('.horizontal-scroll');

      gsap.fromTo(
        containerRef.current,
        { x: 0 },
        {
          x: -100 * (sections.length - 1) + 'vw',
          ease: 'none',
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top top',
            end: () => `+=${containerRef.current?.offsetWidth}`,
            scrub: 1,
            pin: true,
            snap: 1 / (sections.length - 1),
          },
        }
      );

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, []);

  return (
    <div className="relative overflow-x-hidden box-border p-8 text-white">
      <section className="h-screen flex flex-col justify-center p-6 space-y-12">
        <h1 className="text-5xl max-w-3xl font-bold opacity-90 leading-normal">
          Welcome to the New York Recreational Cricket League
        </h1>
        <p>
          Join us to experience the thrill of cricket right in the heart of New
          York City!
        </p>
      </section>

      <div ref={triggerRef} className="flex h-screen overflow-x-hidden">
        <div ref={containerRef} className="flex">
          <section className="horizontal-scroll h-screen w-screen  text-center border-r flex flex-col items-center justify-center p-6">
            <h2 className="text-3xl mb-4">About the League</h2>
            <p className="max-w-xl">
              The New York Recreational Cricket League (NYRCL) is dedicated to
              promoting the sport of cricket among New Yorkers of all ages. We
              offer a friendly but competitive environment where players can
              improve their skills and enjoy the game.
            </p>
          </section>

          <section className="horizontal-scroll h-screen w-screen  text-center border-r flex flex-col items-center justify-center p-6">
            <h2 className="text-3xl mb-4">How to Join</h2>
            <p className="max-w-xl">
              Interested in playing? We welcome players of all skill levels! To
              join, simply fill out our online registration form on our website,
              or contact us at join@nyrcl.com for more details.
            </p>
          </section>

          <section className="horizontal-scroll h-screen w-screen  text-center border-r flex flex-col items-center justify-center p-6">
            <h2 className="text-3xl mb-4">League Fees</h2>
            <p className="max-w-xl">
              The registration fee for the league is $150 per player, which
              covers the entire season. This fee includes uniforms, equipment
              rental, and insurance.
            </p>
          </section>

          <section className="horizontal-scroll h-screen w-screen  text-center flex flex-col items-center justify-center p-6">
            <h2 className="text-3xl mb-4">Location of Games</h2>
            <p className="max-w-xl">
              All games are held at the iconic Central Park Cricket Fields,
              located near the north end of Central Park, easily accessible via
              public transportation.
            </p>
          </section>
        </div>
      </div>

      <section className="h-screen flex items-center justify-center p-6">
        <div className="p-6 w-1/2">
          <h2 className="text-3xl mb-4">Season Schedule</h2>
          <p className="mb-4">
            The NYRCL season runs from April through September, with games
            typically held on weekends. Here is the schedule for the upcoming
            season:
          </p>
        </div>
        <div className="flex-grow p-6">
          <ul className="space-y-4 pl-8">
            <li className="schedule-item p-8">Opening Day: April 15th</li>
            <li className="schedule-item p-8">
              Mid-Season Tournament: July 8th-9th
            </li>
            <li className="schedule-item p-8">Season Finals: September 20th</li>
            <li className="schedule-item p-8">
              Closing Ceremony: September 30th
            </li>
          </ul>
        </div>
      </section>

      <footer className="h-screen flex flex-col items-center justify-center text-white p-6">
        <h2 className="text-3xl mb-4">Contact Us: </h2>
        <p>Email: info@nyrcl.com | Phone: (555) 123-4567</p>
        <p>
          Follow us on our social media pages for updates and more information.
        </p>
      </footer>
    </div>
  );
};

export default Content;
