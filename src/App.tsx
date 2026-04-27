import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import LiveSports from './components/LiveSports';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import SmoothScroll from './components/SmoothScroll';
import Admin from './components/Admin';
import { motion, useScroll, useSpring } from 'motion/react';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={
          <SmoothScroll>
            <div className="min-h-screen bg-background text-zinc-200 font-sans selection:bg-primary selection:text-white">
              {/* Progress Bar */}
              <motion.div
                className="fixed top-0 left-0 right-0 h-[2px] bg-gold-gradient origin-left z-[100] drop-shadow-gold"
                style={{ scaleX }}
              />
              
              <Navbar />
              <main>
                <Hero />
                <About />
                <Menu />
                <LiveSports />
                <Gallery />
              </main>
              <Footer />
            </div>
          </SmoothScroll>
        } />
      </Routes>
    </Router>
  );
}
