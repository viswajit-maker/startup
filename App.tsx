/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Hero from './components/Hero';
import TickerBar from './components/TickerBar';
import Nav from './components/Nav';
import Services from './components/Services';
import TechStack from './components/TechStack';
import Process from './components/Process';
import Projects from './components/Projects';
import Team from './components/Team';
import Pricing from './components/Pricing';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export default function App() {
  return (
    <main id="home" className="min-h-screen w-full relative bg-[var(--color-base)] text-[var(--color-ink)] selection:bg-[var(--color-blue)] selection:text-white">
      <Nav />
      <Hero />
      <TickerBar />
      <Services />
      <TechStack />
      <Projects />
      <Process />
      <Team />
      <Pricing />
      <CTASection />
      <Footer />
    </main>
  );
}
