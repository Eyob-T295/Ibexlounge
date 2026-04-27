import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Tv, Calendar } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface MatchData {
  id: string;
  home: string;
  away: string;
  time: string;
  league: string;
  order: number;
}

export default function LiveSports() {
  const [dbMatches, setDbMatches] = useState<MatchData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      const { data } = await supabase
        .from('matches')
        .select('*')
        .order('order', { ascending: true });
      
      if (data) {
        setDbMatches(data);
      }
      setLoading(false);
    };

    fetchMatches();
  }, []);

  const SAMPLE_MATCHES: MatchData[] = [
    { id: 's1', home: 'Arsenal', away: 'Man City', time: 'SAT 17:30', league: 'Premier League', order: 0 },
    { id: 's2', home: 'Real Madrid', away: 'Bayern', time: 'WED 20:00', league: 'Champions League', order: 1 },
    { id: 's3', home: 'Liverpool', away: 'Chelsea', time: 'SUN 16:30', league: 'Premier League', order: 2 },
    { id: 's4', home: 'Milan', away: 'Inter', time: 'MON 19:45', league: 'Serie A', order: 3 },
    { id: 's5', home: 'Dortmund', away: 'PSG', time: 'TUE 20:00', league: 'Champions League', order: 4 },
    { id: 's6', home: 'Man United', away: 'Newcastle', time: 'WED 20:00', league: 'Premier League', order: 5 },
  ];

  const matches = dbMatches.length > 0 ? dbMatches : SAMPLE_MATCHES;

  return (
    <section id="sports" className="py-32 bg-[#050505] relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-gold-bright/5 blur-[120px] rounded-full translate-y-1/2 translate-x-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-start">

          {/* Left Column: Vision & Identity */}
          <div className="lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-primary shadow-[0_0_8px_var(--color-primary)]" />
                <span className="text-xs font-black uppercase tracking-[0.5em] text-primary">Live Experience</span>
              </div>

              <h2 className="text-6xl md:text-8xl font-heading font-black text-white leading-[0.9] uppercase tracking-tighter">
                <span className="text-gold-gradient italic block pt-2">Match</span>
                Day.
              </h2>

              <p className="text-zinc-400 text-lg max-w-md leading-relaxed font-light">
                Witness every legendary moment in unparalleled luxury. From the roar of the Premier League to the intensity of Champions League nights, experience the game on our massive 4K screens.
              </p>

              <div className="flex flex-col gap-6 pt-6">
                {[
                  { icon: Tv, label: '4K ULTRA HD SCREENS', sub: 'Every angle covered in crystal clarity' },
                  { icon: Trophy, label: 'PREMIUM ATMOSPHERE', sub: 'The best seat in London for every match' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 group items-start">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                      <item.icon size={22} />
                    </div>
                    <div>
                      <div className="text-[10px] font-black tracking-[0.2em] text-white uppercase">{item.label}</div>
                      <div className="text-xs text-zinc-500 mt-1">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Decorative Watermark */}
              <div className="pt-12 select-none pointer-events-none opacity-[0.02]">
                <span className="text-[12rem] font-black uppercase tracking-tighter leading-none block -ml-4">SPORT</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: The Fixtures List */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-between mb-8"
            >
              <h3 className="text-sm font-black tracking-[0.3em] text-zinc-500 uppercase flex items-center gap-3">
                <Calendar size={14} className="text-primary" />
                Upcoming Fixtures
              </h3>
              <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                <span className="text-[9px] font-black text-primary uppercase tracking-widest animate-pulse">Live Soon</span>
              </div>
            </motion.div>

            <div className="space-y-4">
              {matches.map((match, idx) => (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="group relative bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-primary/30 rounded-2xl p-6 transition-all duration-500 overflow-hidden"
                >
                  {/* Subtle Background Glow on Hover */}
                  <div className="absolute top-0 right-0 w-32 h-full bg-primary/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
                    {/* Time & League */}
                    <div className="flex sm:flex-col items-center justify-center min-w-[70px] py-2 sm:border-r border-white/10 gap-2 sm:gap-0">
                      <span className="text-[10px] font-black text-primary uppercase tracking-tighter">{match.time.split(' ')[0]}</span>
                      <span className="text-base sm:text-lg font-black text-white">{match.time.split(' ')[1] || ''}</span>
                    </div>

                    {/* Match Info */}
                    <div className="flex-1 w-full">
                      <div className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-1">{match.league}</div>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.15 + 0.3 }}
                        className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm md:text-base font-black text-white uppercase tracking-wider"
                      >
                        <span className="group-hover:text-primary transition-colors">{match.home}</span>
                        <span className="text-secondary italic text-[10px] font-serif lowercase">vs</span>
                        <span className="group-hover:text-primary transition-colors">{match.away}</span>
                      </motion.div>
                    </div>

                    {/* Action */}
                    <div className="absolute top-6 right-6 sm:relative sm:top-0 sm:right-0">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all duration-500">
                        <Trophy size={14} className="sm:w-4 sm:h-4" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
