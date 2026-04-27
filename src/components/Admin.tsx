import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Trophy, Calendar, Utensils, LogOut, Plus, Trash2, Edit2, Check, X, ShieldCheck, Upload, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ADMIN_EMAILS = [
  'eyobtefera295@gmail.com',
  // Add other authorized emails here
];

function ImageUpload({ onUpload, currentUrl }: { onUpload: (url: string) => void, currentUrl: string }) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 800000) {
      alert("Image is too large. Please select a file under 800KB for direct upload, or use an image URL.");
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      onUpload(base64String);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input 
          placeholder="Image URL" 
          value={currentUrl.startsWith('data:') ? 'Local file uploaded' : currentUrl} 
          onChange={e => onUpload(e.target.value)}
          className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary outline-none"
        />
        <label className="bg-white/5 border border-white/10 rounded-xl px-4 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
          {isUploading ? <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" /> : <Upload size={16} />}
        </label>
      </div>
      <p className="text-[10px] text-zinc-500 uppercase tracking-widest px-2">Paste URL or upload (&lt; 800KB)</p>
    </div>
  );
}

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'matches' | 'menu' | 'gallery'>('matches');
  
  // Email Auth State
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/admin'
      }
    });
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: authEmail,
        password: authPassword,
      });
      if (error) throw error;
    } catch (err: any) {
      setAuthError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => await supabase.auth.signOut();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || user.email === null || !ADMIN_EMAILS.includes(user.email)) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-zinc-900/50 backdrop-blur-xl border border-white/10 p-12 rounded-[40px] shadow-2xl relative z-10"
        >
          <div className="w-28 h-28 md:w-32 md:h-32 bg-black rounded-3xl flex items-center justify-center mx-auto mb-10 border border-white/5 shadow-gold-glow p-4">
            <img src="/ibexlogo.png" alt="Ibex Logo" className="w-full h-full object-contain filter drop-shadow-gold" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-heading font-black mb-4 text-white tracking-tighter uppercase leading-none">
            Ibex Lounge <br/>
            <span className="text-gold-gradient text-xl md:text-2xl tracking-[0.2em] mt-2 inline-block">Admin Only</span>
          </h1>

          <p className="text-zinc-400 mb-8 text-sm font-medium leading-relaxed">
            This portal is for authorized personnel only. Please sign in with the administrator account to continue.
          </p>
          
          <form onSubmit={handleEmailAuth} className="space-y-4 mb-6">
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-2">Email Address</label>
              <input 
                type="email" 
                required
                value={authEmail}
                onChange={e => setAuthEmail(e.target.value)}
                placeholder="admin@ibexlounge.com"
                className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl px-6 text-sm focus:border-primary outline-none transition-colors text-white"
              />
            </div>
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-2">Password</label>
              <input 
                type="password" 
                required
                value={authPassword}
                onChange={e => setAuthPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl px-6 text-sm focus:border-primary outline-none transition-colors text-white"
              />
            </div>

            {authError && (
              <p className="text-red-500 text-[10px] font-black uppercase tracking-widest text-center px-2">
                Error: {authError}
              </p>
            )}

            <button 
              type="submit"
              disabled={authLoading}
              className="w-full py-4 bg-white text-black font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-primary transition-all active:scale-95 disabled:opacity-50"
            >
              {authLoading ? 'Processing...' : 'Sign In'}
            </button>
          </form>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest"><span className="bg-[#0c0c0c] px-4 text-zinc-600 font-black italic">or continue with</span></div>
          </div>
          
          <button 
            onClick={loginWithGoogle}
            className="w-full py-4 bg-[#4285F4] text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:scale-[1.02] transition-transform active:scale-95 shadow-lg shadow-blue-500/20 mb-4 flex items-center justify-center gap-3"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Google OAuth
          </button>
          
          <a 
            href="/"
            className="block w-full py-4 bg-white/5 text-white/50 font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-white/10 hover:text-white transition-all text-center"
          >
            Back to Website
          </a>
          
          {!loading && user && user.email !== null && !ADMIN_EMAILS.includes(user.email) && (
            <p className="mt-6 text-red-500 text-xs font-bold uppercase tracking-widest">
              Access Denied: {user.email}
            </p>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans">
      {/* Sidebar / Header */}
      <nav className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-10 h-10 rounded-xl bg-gold-texture p-[2px]">
              <div className="w-full h-full bg-black rounded-xl flex items-center justify-center p-2">
                <img src="/ibexlogo.png" alt="Ibex" className="w-full h-full object-contain" />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-black text-white tracking-widest uppercase">Ibex Lounge</h1>
              <div className="flex items-center gap-2 text-[10px] text-primary font-bold uppercase tracking-[0.2em]">
                <ShieldCheck size={12} /> Administrator Portal
              </div>
            </div>
          </div>

          <button 
            onClick={logout}
            className="p-3 bg-white/5 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-all border border-white/5 group"
          >
            <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-12">
          {[
            { id: 'matches', label: 'Live Sports', icon: <Trophy size={16} /> },
            { id: 'menu', label: 'Bar Menu', icon: <Utensils size={16} /> },
            { id: 'gallery', label: 'Gallery', icon: <ImageIcon size={16} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all border ${
                activeTab === tab.id 
                  ? 'bg-primary text-black border-primary shadow-gold-glow' 
                  : 'bg-white/5 text-zinc-500 border-white/5 hover:bg-white/10 hover:text-white'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Views */}
        <AnimatePresence mode="wait">
          {activeTab === 'matches' && <MatchManager key="matches" />}
          {activeTab === 'menu' && <MenuManager key="menu" />}
          {activeTab === 'gallery' && <GalleryManager key="gallery" />}
        </AnimatePresence>
      </main>
    </div>
  );
}

function MatchManager() {
  const [dbMatches, setDbMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMatch, setNewMatch] = useState({ home: '', away: '', time: '', league: '', order: 0 });

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

  useEffect(() => {
    fetchMatches();
  }, []);

  const addMatch = async () => {
    if (!newMatch.home || !newMatch.away || !newMatch.time) return;
    await supabase.from('matches').insert([{ ...newMatch, order: Number(newMatch.order) }]);
    setNewMatch({ home: '', away: '', time: '', league: '', order: dbMatches.length });
    fetchMatches();
  };

  const deleteMatch = async (id: string) => {
    await supabase.from('matches').delete().eq('id', id);
    fetchMatches();
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <div className="bg-zinc-900/50 border border-white/5 rounded-3xl md:rounded-[32px] p-6 md:p-8 mb-8">
        <h3 className="text-xl font-heading font-black mb-8 text-white uppercase tracking-tight">Add New Match</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          <input 
            placeholder="Home Team" 
            value={newMatch.home} 
            onChange={e => setNewMatch({...newMatch, home: e.target.value})}
            className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary outline-none"
          />
          <input 
            placeholder="Away Team" 
            value={newMatch.away} 
            onChange={e => setNewMatch({...newMatch, away: e.target.value})}
            className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary outline-none"
          />
          <input 
            placeholder="Time (e.g. Sun 16:30)" 
            value={newMatch.time} 
            onChange={e => setNewMatch({...newMatch, time: e.target.value})}
            className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary outline-none"
          />
          <input 
            placeholder="League" 
            value={newMatch.league} 
            onChange={e => setNewMatch({...newMatch, league: e.target.value})}
            className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary outline-none"
          />
          <button onClick={addMatch} className="bg-primary text-black font-black py-3 rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2 text-xs uppercase tracking-widest sm:col-span-2 md:col-span-1">
            <Plus size={16} /> Add Match
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-20 text-zinc-500">Loading fixtures...</div>
        ) : dbMatches.map(match => (
          <div key={match.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white/[0.02] border border-white/5 p-6 rounded-2xl hover:bg-white/[0.05] transition-colors gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-8">
              <div className="text-primary font-black uppercase text-xs">{match.time}</div>
              <div className="font-bold text-white uppercase tracking-wider text-sm md:text-base">
                {match.home} <span className="text-zinc-600 italic px-2 lowercase">vs</span> {match.away}
              </div>
              <div className="text-[10px] bg-white/5 px-3 py-1 rounded-full uppercase font-black text-zinc-500 w-fit">{match.league}</div>
            </div>
            <button onClick={() => deleteMatch(match.id)} className="text-zinc-600 hover:text-red-500 transition-colors self-end sm:self-center">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function MenuManager() {
  const [dbItems, setDbItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState({ name: '', desc: '', price: '', category: 'habesha', image: '', signature: false, popular: false, order: 0 });

  const fetchMenu = async () => {
    const { data } = await supabase
      .from('menu')
      .select('*')
      .order('order', { ascending: true });
    if (data) {
      setDbItems(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const addMenuItem = async () => {
    if (!newItem.name || !newItem.price) return;
    await supabase.from('menu').insert([{ ...newItem, order: Number(newItem.order) }]);
    setNewItem({ name: '', desc: '', price: '', category: newItem.category, image: '', signature: false, popular: false, order: dbItems.length });
    fetchMenu();
  };

  const deleteMenuItem = async (id: string) => {
    await supabase.from('menu').delete().eq('id', id);
    fetchMenu();
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
       <div className="bg-zinc-900/50 border border-white/5 rounded-3xl md:rounded-[32px] p-6 md:p-8 mb-8">
        <h3 className="text-xl font-heading font-black mb-8 text-white uppercase tracking-tight">Add Menu Item</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <input placeholder="Name" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary outline-none" />
          <input placeholder="Price (e.g. £12.50)" value={newItem.price} onChange={e => setNewItem({...newItem, price: e.target.value})} className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary outline-none" />
          <select 
            value={newItem.category} 
            onChange={e => setNewItem({...newItem, category: e.target.value as any})}
            className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary outline-none appearance-none"
          >
            <option value="habesha">The Wat (Mains)</option>
            <option value="beer">Beers</option>
            <option value="spirits">Spirits</option>
            <option value="cocktails">Cocktails</option>
          </select>
          <ImageUpload 
            currentUrl={newItem.image} 
            onUpload={(url) => setNewItem({...newItem, image: url})} 
          />
        </div>
        <input placeholder="Full Description" value={newItem.desc} onChange={e => setNewItem({...newItem, desc: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary outline-none mb-4" />
        <div className="flex flex-wrap gap-6 mb-8">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div 
              onClick={() => setNewItem({...newItem, signature: !newItem.signature})}
              className={`w-5 h-5 rounded border ${newItem.signature ? 'bg-primary border-primary' : 'border-white/10 group-hover:border-primary/50'} transition-all flex items-center justify-center`}
            >
              {newItem.signature && <Check size={12} className="text-black" />}
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">Signature Item</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div 
              onClick={() => setNewItem({...newItem, popular: !newItem.popular})}
              className={`w-5 h-5 rounded border ${newItem.popular ? 'bg-secondary border-secondary' : 'border-white/10 group-hover:border-secondary/50'} transition-all flex items-center justify-center`}
            >
              {newItem.popular && <Check size={12} className="text-black" />}
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">Popular Choice</span>
          </label>
        </div>
        <button onClick={addMenuItem} className="w-full py-4 bg-primary text-black font-black rounded-xl hover:scale-[1.01] transition-transform flex items-center justify-center gap-2 text-xs uppercase tracking-widest shadow-gold-glow">
          <Plus size={16} /> Add to Menu
        </button>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-20 text-zinc-500">Loading menu...</div>
        ) : dbItems.map(item => (
          <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white/[0.02] border border-white/5 p-4 sm:p-6 rounded-2xl gap-4">
            <div className="flex items-start sm:items-center gap-4 sm:gap-6">
              <div className="w-12 h-12 bg-white/5 rounded-xl overflow-hidden border border-white/5 flex-shrink-0">
                {item.image ? <img src={item.image} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" /> : <Utensils className="p-3 text-zinc-700" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <h4 className="font-black text-white uppercase text-xs sm:text-sm tracking-tight truncate max-w-[150px] sm:max-w-none">{item.name}</h4>
                  <span className="text-xs font-black text-primary font-mono">{item.price}</span>
                  <span className="text-[8px] bg-white/5 px-2 py-0.5 rounded uppercase text-zinc-500 font-black">{item.category}</span>
                </div>
                <p className="text-[10px] sm:text-xs text-zinc-500 mt-1 line-clamp-1 max-w-lg">{item.desc}</p>
              </div>
            </div>
            <button onClick={() => deleteMenuItem(item.id)} className="text-zinc-600 hover:text-red-500 transition-colors self-end sm:self-center">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function GalleryManager() {
  const [dbImages, setDbImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newImage, setNewImage] = useState({ src: '', alt: '', order: 0 });

  const fetchGallery = async () => {
    const { data } = await supabase
      .from('gallery')
      .select('*')
      .order('order', { ascending: true });
    if (data) {
      setDbImages(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const addImage = async () => {
    if (!newImage.src || !newImage.alt) return;
    await supabase.from('gallery').insert([{ ...newImage, order: Number(newImage.order) }]);
    setNewImage({ src: '', alt: '', order: dbImages.length });
    fetchGallery();
  };

  const deleteImage = async (id: string) => {
    await supabase.from('gallery').delete().eq('id', id);
    fetchGallery();
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <div className="bg-zinc-900/50 border border-white/5 rounded-3xl md:rounded-[32px] p-6 md:p-8 mb-8">
        <h3 className="text-xl font-heading font-black mb-8 text-white uppercase tracking-tight">Add Gallery Image</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <ImageUpload 
            currentUrl={newImage.src} 
            onUpload={(url) => setNewImage({...newImage, src: url})} 
          />
          <input placeholder="Alt Text (e.g. Lounge Atmosphere)" value={newImage.alt} onChange={e => setNewImage({...newImage, alt: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary outline-none" />
        </div>
        <button onClick={addImage} className="w-full py-4 bg-primary text-black font-black rounded-xl hover:scale-[1.01] transition-transform flex items-center justify-center gap-2 text-xs uppercase tracking-widest shadow-gold-glow">
          <Plus size={16} /> Add to Gallery
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {loading ? (
          <div className="text-center py-20 text-zinc-500 col-span-full">Loading gallery...</div>
        ) : dbImages.map(image => (
          <div key={image.id} className="group relative aspect-square bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
            <img src={image.src} className="w-full h-full object-cover" alt={image.alt} referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button 
                onClick={() => deleteImage(image.id)}
                className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
