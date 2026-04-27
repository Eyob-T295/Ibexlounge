import { useState, useRef, forwardRef, ReactNode, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import HTMLPageFlip from 'react-pageflip';
import { BookOpen, Coffee, Utensils, Zap, ChevronLeft, ChevronRight, Star, Heart, GlassWater, Trophy } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface PageProps {
  children: ReactNode;
  number?: number;
  className?: string;
}

const Page = forwardRef<HTMLDivElement, PageProps>((props, ref) => {
  return (
    <div className={`demoPage bg-[#FDFBF7] relative shadow-2xl overflow-hidden border-zinc-200/50 ${props.className}`} ref={ref}>
      {/* Paper Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>

      {/* Binding Shadow */}
      <div className="absolute inset-y-0 left-0 w-8 md:w-12 bg-gradient-to-r from-black/20 to-transparent pointer-events-none z-10"></div>
      <div className="absolute inset-y-0 left-0 w-px bg-black/10 z-20"></div>

      <div className="h-full w-full p-6 md:p-16 flex flex-col relative z-0">
        {props.children}

        {props.number && (
          <div className="absolute bottom-4 left-0 right-0 text-center font-serif italic text-zinc-400 text-[10px] md:text-xs tracking-widest">
            — {props.number} —
          </div>
        )}
      </div>
    </div>
  );
});

Page.displayName = 'Page';

interface MenuItemProps {
  name: string;
  desc: string;
  price: string;
  image?: string;
  signature?: boolean;
  popular?: boolean;
  key?: string;
}

const MenuItem = ({ name, desc, price, image, signature, popular }: MenuItemProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover="hover"
    className="w-full mb-10 group cursor-default"
  >
    <div className="flex gap-4 items-start">
      {image && (
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg border border-zinc-200">
          <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
        </div>
      )}
      <div className="flex-grow">
        <div className="flex justify-between items-baseline mb-1">
          <h4 className="font-heading font-black text-zinc-900 group relative flex items-center gap-2">
            {name.toUpperCase()}
            {signature && <Star size={12} className="text-primary fill-primary" />}
            {popular && <Heart size={12} className="text-secondary fill-secondary" />}
            <motion.span
              variants={{ hover: { width: '100%' } }}
              initial={{ width: 0 }}
              className="absolute -bottom-0.5 left-0 h-0.5 bg-primary/30"
            />
          </h4>
          <span className="font-bold text-primary font-mono text-sm">
            {price}
          </span>
        </div>
        <p className="text-zinc-500 text-[10px] md:text-xs font-medium leading-tight max-w-[200px]">
          {desc}
        </p>
      </div>
    </div>
  </motion.div>
);

const DrinkItem = ({ name, desc, price }: any) => (
  <div className="flex justify-between items-baseline mb-4 border-b border-zinc-100 pb-2 hover:bg-zinc-50/50 transition-colors px-1">
    <div className="min-w-0 pr-4">
      <h5 className="font-bold text-zinc-900 text-[10px] md:text-xs tracking-tight truncate">{name.toUpperCase()}</h5>
      <p className="text-[8px] md:text-[10px] text-zinc-400 italic font-serif leading-none mt-1">{desc}</p>
    </div>
    <span className="font-mono text-primary text-[10px] md:text-xs font-bold whitespace-nowrap shrink-0">{price}</span>
  </div>
);

export default function Menu() {
  const bookRef = useRef<any>(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [dbItems, setDbItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchMenu();
  }, []);

  const staticDrinks = [
    { name: "Budweiser", desc: "Beer bottle", price: "£4.00", category: "drinks" },
    { name: "Stella Artois", desc: "Beer bottle", price: "£4.00", category: "drinks" },
    { name: "Heineken", desc: "Beer bottle", price: "£4.00", category: "drinks" },
    { name: "Peroni", desc: "Beer bottle", price: "£4.50", category: "drinks" },
    { name: "Moretti", desc: "Beer bottle", price: "£4.50", category: "drinks" },
    { name: "Asmara", desc: "Eritrean beer", price: "£4.50", category: "drinks" },
    { name: "Habesha", desc: "Ethiopian beer", price: "£4.50", category: "drinks" },
    { name: "Walia", desc: "Ethiopian beer", price: "£4.50", category: "drinks" },
    { name: "Stella Artois Pint", desc: "Draft beer", price: "£6.50", category: "drinks" },
    { name: "Peroni Pint", desc: "Draft beer", price: "£6.90", category: "drinks" },
    { name: "Asahi Pint", desc: "Draft beer", price: "£7.10", category: "drinks" },
    { name: "Guinness Pint", desc: "Draft stout", price: "£6.80", category: "drinks" },
    { name: "Johnnie Walker Black Label", desc: "Whiskey", price: "£4.00 / £7.00", category: "drinks" },
    { name: "Johnnie Walker Gold Label", desc: "Whiskey", price: "£4.00 / £7.00", category: "drinks" },
    { name: "Chivas Regal", desc: "Whiskey", price: "£4.00 / £7.00", category: "drinks" },
    { name: "Jameson", desc: "Irish whiskey", price: "£4.00 / £7.00", category: "drinks" },
    { name: "Southern Comfort", desc: "Liqueur", price: "£4.00 / £7.00", category: "drinks" },
    { name: "Jack Daniel’s", desc: "Tennessee whiskey", price: "£4.00 / £7.00", category: "drinks" },
    { name: "Amaretto", desc: "Liqueur", price: "£4.00 / £7.00", category: "drinks" },
    { name: "Bells", desc: "Whiskey", price: "£4.00 / £7.00", category: "drinks" },
    { name: "Courvoisier", desc: "Cognac", price: "£4.00 / £7.00", category: "drinks" },
    { name: "Martell", desc: "Cognac", price: "£4.00 / £7.00", category: "drinks" },
    { name: "Rémy Martin", desc: "Cognac", price: "£4.00 / £7.00", category: "drinks" },
    { name: "Gordon’s Gin", desc: "Gin", price: "£4.00 / £7.00", category: "drinks" },
    { name: "Tequila", desc: "Shot", price: "£3.00", category: "drinks" },
    { name: "Areke (Asmara)", desc: "Traditional spirit", price: "£3.00", category: "drinks" },
    { name: "House Wine (Glass)", desc: "Wine", price: "£5.00", category: "drinks" },
    { name: "House Wine (Bottle)", desc: "Wine", price: "£15.00", category: "drinks" },
    { name: "Mojito", desc: "Classic cocktail", price: "£9.49", category: "drinks" },
    { name: "Espresso Martini", desc: "Coffee cocktail", price: "£10.49", category: "drinks" },
    { name: "Pornstar Martini", desc: "Passionfruit cocktail", price: "£10.99", category: "drinks" },
    { name: "Aperol Spritz", desc: "Refreshing aperitif", price: "£10.99", category: "drinks" },
    { name: "Negroni", desc: "Classic Italian cocktail", price: "£10.49", category: "drinks" },
    { name: "Old Fashioned", desc: "Whiskey cocktail", price: "£10.49", category: "drinks" },
    { name: "Margarita", desc: "Tequila cocktail", price: "£9.99", category: "drinks" },
    { name: "Daiquiri", desc: "Rum cocktail", price: "£9.49", category: "drinks" },
    { name: "Cosmopolitan", desc: "Vodka cocktail", price: "£9.49", category: "drinks" },
    { name: "Moscow Mule", desc: "Vodka & ginger beer", price: "£9.49", category: "drinks" },
    { name: "Long Island Iced Tea", desc: "Strong mixed cocktail", price: "£11.49", category: "drinks" },
    { name: "Whiskey Sour", desc: "Whiskey cocktail", price: "£10.49", category: "drinks" },
    { name: "French Martini", desc: "Vodka & pineapple", price: "£10.49", category: "drinks" },
    { name: "Tom Collins", desc: "Gin cocktail", price: "£9.49", category: "drinks" },
    { name: "Sex on the Beach", desc: "Fruity cocktail", price: "£9.49", category: "drinks" },
    { name: "Bellini", desc: "Peach & prosecco", price: "£8.99", category: "drinks" }
  ];

  const menuData = useMemo(() => {
    const data = { beer: [] as any[], spirits: [] as any[], cocktails: [] as any[] };

    const items = dbItems.length
      ? dbItems
      : staticDrinks;

    items.forEach(item => {
      // Logic to categorize based on static names or tags if available
      // For now, using simple indices from staticDrinks as a baseline
      const name = item.name.toLowerCase();
      if (name.includes('beer') || name.includes('pint') || name.includes('bottle') ||
        ['budweiser', 'stella', 'heineken', 'peroni', 'moretti', 'asmara', 'habesha', 'walia', 'asahi', 'guinness'].some(v => name.includes(v))) {
        data.beer.push(item);
      } else if (['cocktail', 'mojito', 'martini', 'spritz', 'negroni', 'fashioned', 'margarita', 'daiquiri', 'cosmopolitan', 'mule', 'tea', 'sour', 'beach', 'bellini'].some(v => name.includes(v))) {
        data.cocktails.push(item);
      } else {
        data.spirits.push(item);
      }
    });

    return data;
  }, [dbItems, staticDrinks]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const flipTo = (index: number) => {
    if (bookRef.current) {
      // Adjustment for portrait vs landscape flipping
      const target = isMobile ? index : index;
      bookRef.current.pageFlip().flip(index);
    }
  };

  return (
    <section id="menu" className="py-16 md:py-24 bg-zinc-950 relative overflow-hidden">
      {/* Atmospheric Background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

      {/* Decorative Ornaments */}
      <div className="absolute top-20 left-10 opacity-10 animate-pulse">
        <Star size={120} className="text-white rotate-12" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-10 animate-bounce">
        <GlassWater size={100} className="text-white -rotate-12" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-primary font-serif italic text-2xl mb-4 block tracking-tight"
          >
            The Beverage Almanac
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-9xl font-heading font-black leading-none tracking-tighter mb-6 text-white"
          >
            THE <span className="text-gold-gradient drop-shadow-gold-lg text-shadow-gold">BAR</span> MENU.
          </motion.h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-base md:text-lg">
            Immerse yourself in our handcrafted selection. <span className="text-primary font-bold">Click the edges or swipe</span> to turn the pages and discover
            the secrets of the Ibex cellar.
          </p>
        </div>

        <div className="flex flex-col xl:flex-row-reverse items-center justify-center gap-12 xl:gap-16">
          {/* Bookmark Tabs - Now on Right */}
          <div className="hidden xl:flex flex-col gap-4">
            {[
              { name: 'Introduction', icon: <BookOpen size={18} />, page: 0 },
              { name: 'Beers', icon: <Coffee size={18} />, page: 2 },
              { name: 'Spirits', icon: <Zap size={18} />, page: 4 },
              { name: 'Cocktails', icon: <Star size={18} />, page: 6 }
            ].map((tab) => (
              <button
                key={tab.name}
                onClick={() => flipTo(tab.page)}
                className="group flex items-center justify-end gap-4 px-8 py-6 bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-r-3xl hover:bg-primary transition-all text-right shadow-2xl"
              >
                <span className="font-black text-xs uppercase tracking-[0.3em] text-zinc-400 group-hover:text-white">
                  {tab.name}
                </span>
                <span className="text-zinc-500 group-hover:text-white transition-colors">
                  {tab.icon}
                </span>
              </button>
            ))}
          </div>

          {/* THE BIGGER BOOK */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative w-full max-w-[650px] xl:max-w-none"
          >
            {/* Visual Frame / Desk Shadow */}
            <div className="absolute -inset-4 md:-inset-10 bg-black/40 blur-2xl md:blur-3xl rounded-[40px] md:rounded-[100px] -z-10" />
            <div className="absolute -inset-2 md:-inset-6 bg-zinc-900 border border-white/5 rounded-[30px] md:rounded-[60px] shadow-[20px_20px_50px_rgba(0,0,0,0.8)] md:shadow-[40px_40px_100px_rgba(0,0,0,1)]" />

            <div className="relative overflow-hidden lg:overflow-visible rounded-2xl md:rounded-none">
              <HTMLPageFlip
                width={isMobile ? 350 : 450}
                height={isMobile ? 550 : 620}
                size="stretch"
                minWidth={300}
                maxWidth={500}
                minHeight={450}
                maxHeight={700}
                maxShadowOpacity={0.4}
                showCover={true}
                mobileScrollSupport={true}
                onFlip={(e) => setPageNumber(e.data)}
                className="menu-book-large mx-auto"
                ref={bookRef}
                style={{ margin: '0 auto' }}
                startPage={0}
                drawShadow={true}
                flippingTime={1000}
                usePortrait={isMobile}
                startZIndex={0}
                autoSize={true}
                clickEventForward={true}
                useMouseEvents={true}
                swipeDistance={30}
                showPageCorners={true}
                disableFlipByClick={false}
              >
                {/* COVER PAGE */}
                <div className="bg-zinc-950 flex flex-col items-center justify-center p-8 md:p-16 text-center text-white border-l-8 border-zinc-900/50 shadow-[inset_-10px_0_30px_rgba(0,0,0,0.5)] rounded-r-2xl overflow-hidden h-full group/cover cursor-pointer">
                  {/* Gold Foil Pattern Overlay */}
                  <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/oriental-tiles.png')]"></div>

                  {/* Interaction Cues */}
                  <div className="absolute top-1/2 right-4 -translate-y-1/2 z-20 pointer-events-none">
                    <motion.div
                      animate={{ x: [0, 10, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="w-12 h-12 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center backdrop-blur-md"
                    >
                      <ChevronRight className="text-primary" size={24} />
                    </motion.div>
                  </div>

                  <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 opacity-0 group-hover/cover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="px-6 py-2 bg-primary text-black font-black text-[10px] tracking-[0.4em] rounded-full shadow-gold-glow animate-bounce">
                      FLIP TO OPEN
                    </div>
                  </div>

                  <div className="relative z-10 w-full">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                      className="w-32 h-32 md:w-48 md:h-48 rounded-full border border-primary/20 flex items-center justify-center mb-8 md:mb-12 relative mx-auto"
                    >
                      <div className="absolute inset-2 rounded-full border-2 border-primary/10 border-dashed" />
                      <img
                        src="/ibexlogo.png"
                        alt="Ibex Logo"
                        className="w-full h-full object-contain filter drop-shadow-gold"
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>

                    <h1 className="text-6xl font-heading font-black text-white tracking-tight mb-4">
                      <span className="text-gold-gradient drop-shadow-gold">IBEX</span>
                    </h1>
                    <div className="flex items-center gap-2 md:gap-4 justify-center mb-4 md:mb-6">
                      <div className="h-px bg-gold-classic/40 w-8 md:w-12" />
                      <span className="text-gold-gradient drop-shadow-gold font-serif italic text-xl md:text-2xl whitespace-nowrap">Lounge & Dining</span>
                      <div className="h-px bg-gold-classic/40 w-8 md:w-12" />
                    </div>

                    <p className="text-zinc-500 uppercase tracking-[0.5em] text-[8px] md:text-[10px] mb-12 md:mb-20">Volume I • Edition 2026</p>

                    <div className="inline-flex items-center gap-3 px-4 md:px-6 py-2 md:py-3 border border-white/5 rounded-full bg-white/5 text-zinc-400 text-[8px] md:text-[10px] uppercase font-bold tracking-widest mx-auto">
                      <Zap size={14} className="text-primary" />
                      The House of Celebration
                    </div>
                  </div>
                </div>

                {/* PAGE 1: MIXOLOGY INTRO */}
                <div className="bg-zinc-100 flex items-center justify-center relative overflow-hidden h-full">
                  <img
                    src="https://images.unsplash.com/photo-1547595628-c61a29f496f0?q=100&w=1200"
                    className="absolute inset-0 w-full h-full object-cover scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                  <div className="relative z-10 p-6 md:p-12 text-center text-white border border-white/20 bg-black/20 backdrop-blur-xl rounded-2xl md:rounded-3xl mx-6 md:mx-12">
                    <span className="text-primary font-serif italic text-base md:text-xl mb-2 md:4 block underline underline-offset-8">Mixology</span>
                    <h3 className="text-2xl md:text-4xl font-heading font-black mb-4 md:mb-6 tracking-tighter leading-tight">THE ART OF <br />CELEBRATION.</h3>
                    <p className="text-zinc-300 text-[10px] md:text-sm leading-relaxed font-medium">
                      "Wine is constant proof that God loves us and loves to see us happy."
                      <br /><br />
                      — Benjamin Franklin
                    </p>
                  </div>
                </div>

                {/* PAGE 2: BEERS */}
                <Page number={1}>
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Coffee className="text-primary" size={20} />
                      </div>
                      <div className="h-px bg-zinc-200 flex-grow" />
                      <h3 className="text-3xl font-heading font-black text-zinc-900 tracking-tighter">
                        <span className="text-gold-gradient drop-shadow-gold italic">BEER &</span> PINTS
                      </h3>
                    </div>

                    <div className="flex-1 space-y-1">
                      {menuData.beer.slice(0, 10).map(item => <DrinkItem key={item.name} {...item} />)}
                    </div>

                    <div className="mt-4 pt-4 border-t border-zinc-100">
                      <div className="p-3 bg-primary/5 rounded-xl border-l-4 border-primary flex items-center gap-3">
                        <Trophy className="text-primary shrink-0" size={16} />
                        <p className="text-[9px] uppercase tracking-widest font-black text-zinc-800">
                          Live Sports on all screens while you drink
                        </p>
                      </div>
                    </div>
                  </div>
                </Page>

                {/* PAGE 3: BEER IMAGE 2 */}
                <div className="relative group overflow-hidden h-full">
                  <img
                    src="https://images.unsplash.com/photo-1571767454098-246b94fbcf70?q=80&w=800"
                    className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" />
                  <div className="absolute top-6 left-6 right-6 p-4 border border-white/20 backdrop-blur-md rounded-xl bg-black/20 text-white">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2 text-primary">Imported Selection</p>
                    <h4 className="text-xl font-heading font-black tracking-tighter">THE AFRICAN LAGER</h4>
                  </div>
                </div>

                {/* PAGE 4: SPIRITS */}
                <Page number={2}>
                  <div className="flex flex-col h-full">
                    <div className="mb-6 text-center">
                      <h3 className="text-3xl font-heading font-black text-zinc-900 tracking-tighter mb-1">
                        <span className="text-gold-gradient">SPIRITS &</span> COGNACS
                      </h3>
                      <p className="text-zinc-400 text-[10px] uppercase tracking-[0.2em] font-bold">Premium Selection</p>
                    </div>

                    <div className="grid grid-cols-1 gap-1">
                      {menuData.spirits.slice(0, 14).map(item => <DrinkItem key={item.name} {...item} />)}
                    </div>
                  </div>
                </Page>

                {/* PAGE 5: SPIRIT IMAGE */}
                <div className="relative bg-zinc-900 p-4 md:p-6 flex items-center justify-center h-full">
                  <div className="absolute inset-0 opacity-30">
                    <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
                  </div>
                  <div className="relative z-10 w-full h-[80%] rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                    <img src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=800" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/60 backdrop-blur-md rounded-xl border border-white/10">
                      <div className="text-primary text-[10px] font-black uppercase tracking-widest mb-1">Premium Lounge</div>
                      <div className="text-white text-xs font-serif italic">Watch live football with your favorite spirit.</div>
                    </div>
                  </div>
                </div>

                {/* PAGE 6: MORE COGNACS & WINES */}
                <Page number={3}>
                  <div className="h-full flex flex-col">
                    <div className="text-[10px] font-black text-primary border-l-2 border-primary pl-2 mb-6 uppercase tracking-[0.2em]">Exquisite Spirits</div>
                    <div className="flex-1 space-y-1">
                      {menuData.spirits.slice(14, 28).map(item => <DrinkItem key={item.name} {...item} />)}
                    </div>

                    <div className="mt-6 p-4 bg-zinc-900 text-white rounded-2xl flex items-center gap-4">
                      <Trophy className="text-primary" size={20} />
                      <p className="text-[9px] uppercase tracking-widest font-black leading-tight">All major sports events broadcasted live in 4K.</p>
                    </div>
                  </div>
                </Page>

                {/* PAGE 7: COCKTAILS */}
                <Page number={4}>
                  <div className="h-full flex-col flex">
                    <div className="mb-6">
                      <span className="text-gold-gradient font-serif italic text-base block mb-1">Liquid Gold</span>
                      <h3 className="text-2xl font-heading font-black text-zinc-900 tracking-tighter mb-4 pb-2 border-b border-zinc-200">
                        <span className="text-gold-gradient drop-shadow-gold italic">SIGNATURE</span> COCKTAILS
                      </h3>
                    </div>
                    <div className="flex-1 space-y-1">
                      {menuData.cocktails.slice(0, 12).map(item => <DrinkItem key={item.name} {...item} />)}
                    </div>
                  </div>
                </Page>

                {/* PAGE 8: COCKTAILS IMAGERY & NOTES */}
                <Page number={5}>
                  <div className="h-full flex flex-col">
                    <div className="w-full h-32 rounded-xl overflow-hidden mb-6">
                      <img src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="text-[10px] font-black text-primary border-l-2 border-primary pl-2 mb-4 uppercase tracking-[0.2em]">Mixology Art</div>
                    <div className="flex-1 space-y-1">
                      {menuData.cocktails.slice(12, 18).map(item => <DrinkItem key={item.name} {...item} />)}
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-zinc-100 p-3 flex flex-col items-center justify-center text-center">
                        <Coffee className="text-primary mb-1" size={16} />
                        <span className="text-zinc-900 font-black text-[8px] tracking-widest uppercase mb-0.5">Coffee</span>
                        <p className="text-zinc-400 text-[7px]">Dark Roast</p>
                      </div>
                      <div className="rounded-xl bg-zinc-100 p-3 flex flex-col items-center justify-center text-center">
                        <Zap className="text-primary mb-1" size={16} />
                        <span className="text-zinc-900 font-black text-[8px] tracking-widest uppercase mb-0.5">Tej Wine</span>
                        <p className="text-zinc-400 text-[7px]">Honey Wine</p>
                      </div>
                    </div>
                  </div>
                </Page>

                {/* BACK COVER */}
                <div className="bg-zinc-950 flex flex-col items-center justify-center p-8 md:p-16 text-center text-white border-r-8 border-zinc-900/50 shadow-[inset_10px_0_30px_rgba(0,0,0,0.5)] rounded-l-2xl h-full">
                  <div className="opacity-10 grayscale-0 hover:grayscale transition-all duration-1000 mb-8 md:mb-12 animate-pulse w-32 h-32">
                    <img
                      src="/ibexlogo.png"
                      alt="Ibex Logo"
                      className="w-full h-full object-contain filter drop-shadow-gold"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h5 className="text-xl md:text-2xl font-heading font-black mb-2">IBEX LOUNGE</h5>
                  <p className="text-primary font-serif italic text-base md:text-lg opacity-80 mb-8 md:mb-12">The Spirit of Celebration</p>

                  <div className="w-12 md:w-16 h-px bg-white/10 mb-8 md:mb-12" />

                  <div className="space-y-2 md:space-y-4">
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-zinc-600">3347 Holloway Road, London</p>
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-zinc-600">www.ibexlounge.co.uk</p>
                  </div>
                </div>
              </HTMLPageFlip>
            </div>

            {/* Manual Controls for Mobile / Enhanced Visuals */}
            <div className="flex justify-between items-center mt-12 md:mt-16 w-full max-w-[550px] mx-auto xl:hidden px-4 md:px-0">
              <button
                onClick={() => bookRef.current?.pageFlip().flipPrev()}
                className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all shadow-2xl"
              >
                <ChevronLeft size={isMobile ? 24 : 32} />
              </button>
              <div className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-zinc-500">
                {isMobile ? `Page ${pageNumber + 1}` : 'Flip to Behold'}
              </div>
              <button
                onClick={() => bookRef.current?.pageFlip().flipNext()}
                className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all shadow-2xl"
              >
                <ChevronRight size={isMobile ? 24 : 32} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating Interactive Elements around the sections */}
        <div className="mt-24 md:mt-40 text-center relative px-6 md:px-0">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-block relative"
          >
            <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full" />
            <button className="group relative px-16 py-6 bg-white text-zinc-950 font-black text-xs tracking-[0.5em] rounded-full border border-white transition-all uppercase overflow-hidden">
              <span className="relative z-10 group-hover:text-white transition-colors">Download Digital Ledger</span>
              <motion.div
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 bg-primary"
              />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
