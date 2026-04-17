import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Home, Store, MessageSquare, ShoppingCart, User, Plus, MapPin,
  ChevronRight, Sparkles, Bike, Heart, Settings, Wallet, FileText,
  Map, Phone, Info, Flag, Gift, Bookmark, Star, ArrowRight, Clock,
  Droplets, Flame, TrendingUp, Eye
} from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────
const MALL_CATEGORIES = ['人气TOP', '灵感上新', '评价推荐', '果酒', '茶酒', '畅饮礼盒'];
const MALL_PRODUCTS = [
  { id: 1, name: '蜜桃乌龙酒', desc: '芒果·阳光玫瑰香', price: 87, vol: '330ml', abv: '3.5°', img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&q=80' },
  { id: 2, name: '瓣瓣春蜜桃', desc: '水蜜桃·微醺果香', price: 99, vol: '500ml', abv: '4.0°', img: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80' },
  { id: 3, name: '大红袍红柚', desc: '大红袍·红柚清甜', price: 119, vol: '330ml', abv: '3.8°', img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80' },
];

const fallbackImg = 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&q=80';
const handleImgError = (e) => { if (e.target.src !== fallbackImg) e.target.src = fallbackImg; };

// ─── Animation Variants ──────────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({ opacity: 1, transition: { duration: 0.5, delay: i * 0.08 } }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }
  }),
};

const slideUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Fizz Bubbles ────────────────────────────────────────────────────
function FizzBubbles({ density = 'normal' }) {
  const configs = {
    normal: [
      { size: 5, left: '10%', dur: 'animate-bubble-1', opacity: 0.3 },
      { size: 3, left: '22%', dur: 'animate-bubble-2', opacity: 0.2 },
      { size: 7, left: '38%', dur: 'animate-bubble-3', opacity: 0.15 },
      { size: 4, left: '55%', dur: 'animate-bubble-4', opacity: 0.25 },
      { size: 6, left: '68%', dur: 'animate-bubble-5', opacity: 0.18 },
      { size: 3, left: '82%', dur: 'animate-bubble-6', opacity: 0.22 },
      { size: 8, left: '92%', dur: 'animate-bubble-7', opacity: 0.12 },
      { size: 2, left: '5%',  dur: 'animate-bubble-8', opacity: 0.28 },
      { size: 4, left: '48%', dur: 'animate-bubble-3', opacity: 0.16 },
      { size: 3, left: '75%', dur: 'animate-bubble-1', opacity: 0.2 },
    ],
    sparse: [
      { size: 4, left: '15%', dur: 'animate-bubble-2', opacity: 0.15 },
      { size: 6, left: '50%', dur: 'animate-bubble-4', opacity: 0.1 },
      { size: 3, left: '80%', dur: 'animate-bubble-6', opacity: 0.12 },
    ],
  };
  const bubbles = configs[density] || configs.normal;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {bubbles.map((b, i) => (
        <div key={i} className={`fizz-bubble ${b.dur}`} style={{ width: b.size, height: b.size, left: b.left, bottom: '-10%', opacity: b.opacity }} />
      ))}
    </div>
  );
}

// ─── SVG Micro Illustrations ─────────────────────────────────────────
function LemonSlice({ className = '' }) {
  return (
    <svg viewBox="0 0 60 60" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="32" r="20" stroke="currentColor" strokeWidth="0.7" opacity="0.25" />
      <ellipse cx="30" cy="32" rx="14" ry="14" stroke="currentColor" strokeWidth="0.5" opacity="0.18" />
      <line x1="30" y1="18" x2="30" y2="46" stroke="currentColor" strokeWidth="0.35" opacity="0.12" />
      <line x1="17" y1="25" x2="43" y2="39" stroke="currentColor" strokeWidth="0.35" opacity="0.12" />
      <line x1="17" y1="39" x2="43" y2="25" stroke="currentColor" strokeWidth="0.35" opacity="0.12" />
      <path d="M30 12 C28 6 33 3 36 6" stroke="currentColor" strokeWidth="0.6" opacity="0.2" strokeLinecap="round" />
      <path d="M30 12 C32 7 27 4 25 7" stroke="currentColor" strokeWidth="0.4" opacity="0.15" strokeLinecap="round" />
    </svg>
  );
}

function IceCube({ className = '' }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M8 14 L20 8 L32 14 L32 28 L20 34 L8 28Z" stroke="currentColor" strokeWidth="0.6" opacity="0.18" strokeLinejoin="round" />
      <path d="M8 14 L20 20 L32 14" stroke="currentColor" strokeWidth="0.4" opacity="0.12" />
      <path d="M20 20 L20 34" stroke="currentColor" strokeWidth="0.4" opacity="0.1" />
      <path d="M12 16 L14 18" stroke="currentColor" strokeWidth="0.35" opacity="0.2" strokeLinecap="round" />
      <circle cx="15" cy="12" r="0.8" fill="currentColor" opacity="0.08" />
    </svg>
  );
}

function SplashDrop({ className = '' }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M16 4 C16 4 8 14 8 20 C8 24.4 11.6 28 16 28 C20.4 28 24 24.4 24 20 C24 14 16 4 16 4Z" stroke="currentColor" strokeWidth="0.5" opacity="0.15" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 20 Q14 17 16 20" stroke="currentColor" strokeWidth="0.3" opacity="0.1" strokeLinecap="round" />
    </svg>
  );
}

function SectionNum({ num }) {
  return (
    <span className="text-[64px] text-ink/[0.04] font-serif font-black leading-none absolute -left-1 -top-4 select-none pointer-events-none">
      {String(num).padStart(2, '0')}
    </span>
  );
}

// ─── Main App ────────────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [cartCount, setCartCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState(MALL_CATEGORIES[0]);

  useEffect(() => { const t = setTimeout(() => setIsLoaded(true), 100); return () => clearTimeout(t); }, []);
  const handleAddToCart = () => setCartCount(prev => prev + 1);

  // ─── HOME ────────────────────────────────────────────────────────
  const renderHome = () => (
    <motion.div className="h-full overflow-y-auto pb-24 scrollbar-hide bg-zesty relative" initial="hidden" animate="visible">
      <FizzBubbles />

      <motion.header className="px-7 pt-5 pb-3 relative z-10" variants={fadeInUp} custom={0}>
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-caption text-ink/45 tracking-[0.14em]">LEMON SODA WEEKLY</span>
              <span className="w-1 h-1 rounded-full bg-ink/15" />
              <span className="text-caption text-ink/40 tracking-[0.1em] flex items-center">
                <MapPin size={8} className="mr-1" /> 上海
              </span>
            </div>
            <h1 className="text-display text-[42px] text-ink leading-[0.9] tracking-[-0.05em]">微醺</h1>
            <h1 className="text-display text-[42px] text-ink leading-[0.9] tracking-[-0.05em] mt-1">
              午后<span className="text-lime-fizz">.</span>
            </h1>
            <p className="text-editorial text-ink/45 text-[14px] mt-3 max-w-[200px]">
              A sip of sunshine,<br/>a taste of summer
            </p>
          </div>
          <div className="flex flex-col items-end gap-3 mt-1">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.92 }}
              className="w-12 h-12 rounded-[18px] glass-premium flex items-center justify-center text-ink/55">
              <Search size={18} strokeWidth={1.6} />
            </motion.button>
            <span className="text-[11px] text-ink/40 font-light">26°C · 晴</span>
          </div>
        </div>
      </motion.header>

      {/* Hero */}
      <motion.section className="relative mb-4 z-10" variants={fadeInUp} custom={1}>
        <div className="px-5">
          <div className="relative w-full h-[360px] rounded-[28px] overflow-hidden shadow-deep texture-grain">
            <motion.img src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop" alt="初夏限定"
              className="w-full h-full object-cover" initial={{ scale: 1.12 }} animate={{ scale: 1 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }} onError={handleImgError} />
            <div className="absolute inset-0 overlay-editorial" />
            <div className="absolute inset-0 rounded-[28px] ring-1 ring-white/[0.08] ring-inset" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                <span className="inline-flex items-center px-3 py-1 bg-brand/80 text-ink/70 text-[10px] font-bold rounded-full mb-3 tracking-[0.08em] uppercase backdrop-blur-sm">
                  <Flame size={10} className="mr-1.5" /> 初夏限定
                </span>
                <h2 className="text-display text-[28px] text-white leading-[1.05] tracking-[-0.04em]">青柠海盐</h2>
                <h2 className="text-display text-[28px] text-white leading-[1.05] tracking-[-0.04em]">苏打酒<span className="text-lime-fizz/80">.</span></h2>
                <p className="text-editorial text-white/70 text-[13px] mt-2 max-w-[220px]">清爽气泡，击退夏日的每一度炎热</p>
              </motion.div>
            </div>
            <LemonSlice className="absolute top-4 right-5 w-14 h-14 text-white/20 animate-float-gentle" />
            <SplashDrop className="absolute top-16 right-2 w-6 h-6 text-white/15 animate-float-slow" />
            <div className="absolute top-4 left-5 flex items-center gap-2">
              <div className="glass-dark rounded-full px-2.5 py-1.5 flex items-center gap-1.5">
                <Eye size={10} className="text-white/70" />
                <span className="text-[10px] text-white/65 font-medium">2.4k</span>
              </div>
            </div>
          </div>
        </div>

        <motion.div className="mx-7 -mt-10 relative z-10 glass-premium ice-edge rounded-[22px] p-5" variants={scaleIn} custom={2}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {['🍋', '🧊', '🫧'].map((e, i) => (
                  <span key={i} className="w-8 h-8 rounded-full bg-lime-fizz/30 flex items-center justify-center text-[14px] ring-2 ring-white/60">{e}</span>
                ))}
              </div>
              <div>
                <p className="text-[14px] font-bold text-ink tracking-tight">立即探索</p>
                <p className="text-[11px] text-ink/50 mt-0.5">3款新品已上线</p>
              </div>
            </div>
            <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.92 }} onClick={() => setActiveTab('mall')}
              className="w-11 h-11 rounded-[14px] bg-brand/60 text-ink/75 flex items-center justify-center shadow-soft">
              <ArrowRight size={18} strokeWidth={2.2} />
            </motion.button>
          </div>
        </motion.div>
      </motion.section>

      {/* Bento Grid */}
      <motion.section className="px-5 mb-6 mt-8 relative z-10" variants={fadeInUp} custom={3}>
        <div className="relative pl-1 mb-5">
          <SectionNum num={1} />
          <p className="text-caption text-ink/45 mb-1 relative">QUICK ACCESS</p>
          <h2 className="text-display-cn text-[20px] text-ink relative">快速入口</h2>
        </div>
        <div className="grid grid-cols-7 gap-2.5 h-[170px]">
          <motion.div whileTap={{ scale: 0.97 }} onClick={() => setActiveTab('mall')}
            className="col-span-4 glass-premium ice-edge rounded-[22px] p-4 relative overflow-hidden flex flex-col justify-between cursor-pointer group">
            <div className="relative z-10">
              <div className="w-8 h-8 rounded-xl bg-brand/20 flex items-center justify-center mb-2">
                <Bike size={16} className="text-ink/45" strokeWidth={1.5} />
              </div>
              <h3 className="text-display text-[18px] text-ink leading-[1.1] tracking-[-0.03em]">即刻<br/>送达</h3>
            </div>
            <div className="flex items-center gap-1.5 z-10">
              <span className="text-[11px] text-ink/50 font-medium">同城30分钟</span>
              <ArrowRight size={10} className="text-ink/35 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-lime-fizz/15 rounded-full blur-2xl" />
            <IceCube className="absolute top-3 right-3 w-10 h-10 text-brand/25 animate-float-gentle" />
          </motion.div>
          <div className="col-span-3 grid grid-rows-2 gap-2.5">
            <motion.div whileTap={{ scale: 0.95 }} className="glass-lime ice-edge rounded-[18px] p-3 flex flex-col justify-between cursor-pointer relative overflow-hidden group">
              <div className="w-6 h-6 rounded-lg bg-brand/25 flex items-center justify-center"><Gift size={12} className="text-ink/45" /></div>
              <div>
                <h3 className="text-[12px] font-bold text-ink leading-tight tracking-tight">节日礼盒</h3>
                <p className="text-[10px] text-ink/45 mt-0.5">送礼佳选</p>
              </div>
            </motion.div>
            <motion.div whileTap={{ scale: 0.95 }} className="glass-strong ice-edge rounded-[18px] p-3 flex flex-col justify-between cursor-pointer relative overflow-hidden group">
              <div className="w-6 h-6 rounded-lg bg-brand/20 flex items-center justify-center"><Sparkles size={12} className="text-ink/45" /></div>
              <div>
                <h3 className="text-[12px] font-bold text-ink leading-tight tracking-tight">社区福利</h3>
                <p className="text-[10px] text-ink/45 mt-0.5">签到领积分</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Featured Story */}
      <motion.section className="px-5 mb-6 relative z-10" variants={fadeInUp} custom={4}>
        <div className="relative pl-1 mb-5">
          <SectionNum num={2} />
          <p className="text-caption text-ink/45 mb-1 relative">FEATURED STORY</p>
          <h2 className="text-display-cn text-[20px] text-ink relative">本期专题</h2>
        </div>
        <motion.div className="glass-premium ice-edge rounded-[24px] p-5 relative overflow-hidden" variants={scaleIn} custom={5}>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-5 h-[2px] bg-lime-fizz rounded-full" />
                <span className="text-[10px] text-ink/45 font-semibold tracking-[0.1em] uppercase">Vol.23</span>
              </div>
              <h3 className="text-display-cn text-[17px] text-ink leading-[1.25] mb-2">夏日微醺<br/>果酒指南</h3>
              <p className="text-editorial-cn text-[12px] text-ink/55 leading-[1.7] mb-4">从果园到杯中，探索低度果酒的风味旅程。每一口都是阳光的味道。</p>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-ink/40 font-light flex items-center"><Clock size={10} className="mr-1" /> 5 min read</span>
                <span className="w-1 h-1 rounded-full bg-ink/12" />
                <span className="text-[10px] text-ink/40 font-light flex items-center"><Heart size={10} className="mr-1" /> 892</span>
              </div>
            </div>
            <div className="w-[100px] h-[130px] rounded-[16px] overflow-hidden flex-shrink-0 shadow-soft relative">
              <img src="https://images.unsplash.com/photo-1536935338788-846bb9981813?w=300&q=80" alt="果酒专题" className="w-full h-full object-cover" onError={handleImgError} />
              <div className="absolute inset-0 rounded-[16px] ring-1 ring-black/[0.04] ring-inset" />
            </div>
          </div>
          <LemonSlice className="absolute -top-2 -right-2 w-16 h-16 text-brand/[0.12] animate-spin-slow" />
        </motion.div>
      </motion.section>

      {/* Curated Picks */}
      <motion.section className="px-5 relative z-10" variants={fadeInUp} custom={5}>
        <div className="relative pl-1 mb-5">
          <SectionNum num={3} />
          <div className="flex justify-between items-end relative">
            <div>
              <p className="text-caption text-ink/45 mb-1">CURATED FOR YOU</p>
              <h2 className="text-display-cn text-[20px] text-ink">编辑精选</h2>
            </div>
            <motion.span className="text-[11px] text-ink/50 flex items-center cursor-pointer font-medium pb-1" whileTap={{ scale: 0.95 }} onClick={() => setActiveTab('mall')}>
              查看全部 <ChevronRight size={12} className="ml-0.5" />
            </motion.span>
          </div>
        </div>
        <div className="space-y-3.5">
          {MALL_PRODUCTS.slice(0, 2).map((product, idx) => (
            <motion.div key={`home-${product.id}`} className="glass-premium ice-edge rounded-[22px] p-4 flex gap-4 items-stretch cursor-pointer group"
              variants={fadeInUp} custom={6 + idx} whileTap={{ scale: 0.98 }}>
              <div className="relative flex-shrink-0">
                <img src={product.img} alt={product.name} className="w-[92px] h-[92px] rounded-[16px] object-cover" onError={handleImgError} />
                <div className="absolute inset-0 rounded-[16px] ring-1 ring-black/[0.05] ring-inset" />
                <div className="absolute -bottom-1 -right-1 bg-white/80 backdrop-blur-sm rounded-lg px-1.5 py-0.5 text-[9px] text-ink/50 font-semibold shadow-soft">{product.abv}</div>
              </div>
              <div className="flex-1 flex flex-col py-0.5">
                <div className="flex items-start justify-between">
                  <h3 className="text-[15px] font-bold text-ink tracking-[-0.02em]">{product.name}</h3>
                  <span className="text-[10px] text-ink/40 font-light">{product.vol}</span>
                </div>
                <p className="text-editorial text-[12px] text-ink/50 mt-1 not-italic">{product.desc}</p>
                <div className="flex justify-between items-end mt-auto pt-2">
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-[11px] text-ink/50 font-light">¥</span>
                    <span className="text-display text-[20px] text-ink">{product.price}</span>
                  </div>
                  <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.88 }} onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}
                    className="w-9 h-9 bg-brand/60 text-ink/75 rounded-[12px] flex items-center justify-center shadow-soft">
                    <Plus size={15} strokeWidth={2.5} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="mt-8 mb-3" variants={fadeIn} custom={8}>
          <div className="glass rounded-[20px] p-6 relative overflow-hidden">
            <div className="flex items-start gap-4">
              <div className="text-[32px] text-ink/[0.06] font-serif font-black leading-none select-none">"</div>
              <div className="flex-1 pt-1">
                <p className="text-quote-cn text-[14px] text-ink/60 leading-[1.9]">生活太短，不能将就饮品。</p>
                <p className="text-editorial text-ink/40 text-[12px] mt-2">Life is too short for bad drinks.</p>
              </div>
            </div>
            <LemonSlice className="absolute -bottom-3 -right-3 w-20 h-20 text-brand/[0.1]" />
          </div>
        </motion.div>

        <motion.div className="mt-4 mb-6" variants={fadeInUp} custom={9}>
          <div className="flex gap-2">
            {[
              { icon: Droplets, value: '67', unit: '种', label: '风味' },
              { icon: Star, value: '4.9', unit: '', label: '评分' },
              { icon: TrendingUp, value: '12k', unit: '+', label: '酒友' },
            ].map((stat, i) => (
              <div key={i} className="flex-1 glass rounded-[16px] p-3 text-center">
                <stat.icon size={14} className="mx-auto text-brand/70 mb-1.5" strokeWidth={1.5} />
                <div className="text-display text-[16px] text-ink">{stat.value}<span className="text-[10px] text-ink/45 font-normal">{stat.unit}</span></div>
                <span className="text-[10px] text-ink/40 font-medium">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.section>
    </motion.div>
  );

  // ─── MALL ────────────────────────────────────────────────────────
  const renderMall = () => (
    <motion.div className="h-full flex flex-col bg-white overflow-y-auto scrollbar-hide pb-24" initial="hidden" animate="visible">
      <motion.div className="px-6 pt-5 pb-4" variants={fadeInUp} custom={0}>
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-caption text-ink/45 mb-1">SHOP & EXPLORE</p>
            <h1 className="text-display text-[26px] text-ink tracking-[-0.04em]">热销甄选</h1>
          </div>
          <IceCube className="w-8 h-8 text-brand/30 animate-float-gentle" />
        </div>
        <div className="relative rounded-[20px] overflow-hidden h-[120px] shadow-elevated">
          <img src="https://images.unsplash.com/photo-1470337458703-415120146cbc?w=800&q=80" alt="热销活动" className="w-full h-full object-cover" onError={handleImgError} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/15 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <span className="text-caption text-white/65 tracking-[0.1em]">LIMITED TIME</span>
            <p className="text-display text-white text-[18px] tracking-[-0.03em] mt-0.5">畅饮一夏</p>
          </div>
          <div className="absolute top-3 right-3 glass-dark rounded-full px-2.5 py-1 text-[10px] text-white/85 font-semibold">-20%</div>
          <div className="absolute inset-0 rounded-[20px] ring-1 ring-white/[0.06] ring-inset" />
        </div>
      </motion.div>

      <div className="flex-1 flex overflow-hidden">
        <motion.div className="w-[78px] bg-gradient-to-b from-sage-50 to-white h-full overflow-y-auto pb-32 scrollbar-hide flex flex-col pt-0.5" variants={fadeIn} custom={1}>
          <div className="py-3 px-2 text-center text-[11px] text-ink/40 font-medium tracking-wide">买过</div>
          {MALL_CATEGORIES.map((category) => (
            <div key={category} onClick={() => setActiveCategory(category)}
              className={`py-3 px-2 text-center text-[11px] transition-all cursor-pointer relative ${activeCategory === category ? 'text-ink font-bold bg-white' : 'text-ink/45 hover:text-ink/65'}`}>
              {activeCategory === category && <motion.div layoutId="mall-indicator" className="absolute left-0 top-1/2 -translate-y-1/2 w-[2.5px] h-5 bg-lime-fizz rounded-r-full" />}
              {category}
            </div>
          ))}
        </motion.div>

        <motion.div className="flex-1 h-full overflow-y-auto px-4 py-2 pb-40 scrollbar-hide relative bg-white" variants={fadeInUp} custom={2}>
          <div className="flex gap-2 mb-5">
            {[{ name: '低度蜜桃乌龙酒', price: 87, badge: '畅销' }, { name: '大红袍西柚酒', price: 119, badge: '新品' }].map((item) => (
              <div key={item.name} className="flex-1 glass-lime ice-edge rounded-[16px] p-3 relative">
                <span className="absolute top-2 right-2 text-[8px] bg-brand/25 text-ink/55 px-1.5 py-0.5 rounded-full font-semibold">{item.badge}</span>
                <h4 className="text-[11px] text-ink/60 mb-2 font-medium tracking-tight pr-8">{item.name}</h4>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-[10px] text-ink/45 font-light">¥</span>
                  <span className="text-display text-ink text-[17px]">{item.price}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-[14px] font-bold text-ink tracking-tight">{activeCategory}</h2>
            <span className="text-[10px] text-ink/35 font-light">{MALL_PRODUCTS.length} items</span>
          </div>

          <div className="space-y-4">
            {MALL_PRODUCTS.map((product, idx) => (
              <motion.div key={product.id} className="flex gap-3.5 pb-4 border-b border-ink/[0.06] last:border-0" variants={fadeInUp} custom={3 + idx}>
                <div className="relative flex-shrink-0">
                  <img src={product.img} alt={product.name} className="w-[82px] h-[82px] rounded-[14px] object-cover" onError={handleImgError} />
                  <div className="absolute inset-0 rounded-[14px] ring-1 ring-black/[0.04] ring-inset" />
                </div>
                <div className="flex-1 flex flex-col py-0.5">
                  <h3 className="text-[14px] text-ink font-bold tracking-[-0.01em]">{product.name}</h3>
                  <p className="text-[10px] mt-1.5 flex flex-wrap gap-1">
                    {product.desc.split('·').map(tag => (
                      <span key={tag} className="bg-ink/[0.04] text-ink/50 px-2 py-0.5 rounded-full text-[10px] font-medium">{tag.trim()}</span>
                    ))}
                    <span className="bg-brand/25 text-ink/55 px-2 py-0.5 rounded-full text-[10px] font-medium">{product.abv}</span>
                  </p>
                  <div className="flex justify-between items-end mt-auto pt-1.5">
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-[10px] text-ink/45">¥</span>
                      <span className="text-display text-ink text-[17px]">{product.price}</span>
                    </div>
                    <motion.button whileTap={{ scale: 0.88 }} onClick={handleAddToCart}
                      className="bg-brand/60 text-ink/75 px-4 py-1.5 rounded-[10px] text-[11px] font-bold shadow-soft">购入</motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {cartCount > 0 && (
          <motion.div className="absolute bottom-[88px] left-4 right-4 z-40"
            initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
            <div className="glass-frost ice-edge rounded-[22px] p-2.5 pl-5 flex items-center justify-between shadow-deep">
              <div className="flex items-center">
                <div className="relative mr-3.5">
                  <ShoppingCart size={22} className="text-ink" strokeWidth={1.5} />
                  <span className="absolute -top-1.5 -right-2.5 bg-brand/75 text-ink/70 text-[9px] font-bold px-1.5 min-w-[14px] h-3.5 flex items-center justify-center rounded-full">{cartCount}</span>
                </div>
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[11px] text-ink/55 font-medium">预计到手</span>
                    <span className="text-display text-[17px] text-ink">¥{cartCount * 87}</span>
                  </div>
                  <span className="text-[10px] text-ink/40 font-light">已享受更低优惠，共减免 ¥26</span>
                </div>
              </div>
              <motion.button whileTap={{ scale: 0.95 }} className="bg-brand/65 text-ink/80 text-[13px] font-bold px-6 py-2.5 rounded-[14px] shadow-soft">付款</motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  // ─── COMMUNITY ───────────────────────────────────────────────────
  const renderCommunity = () => (
    <motion.div className="h-full overflow-y-auto pb-24 scrollbar-hide bg-magazine relative" initial="hidden" animate="visible">
      <motion.div className="pt-3 pb-2 px-5 sticky top-0 bg-white/80 backdrop-blur-2xl z-20 border-b border-ink/[0.05]" variants={fadeIn}>
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-display text-[20px] text-ink tracking-[-0.03em]">社区</h1>
          <motion.div whileTap={{ scale: 0.95 }} className="w-9 h-9 glass rounded-xl flex items-center justify-center">
            <Search size={15} className="text-ink/45" strokeWidth={1.6} />
          </motion.div>
        </div>
        <div className="flex gap-2 pb-2">
          {[{ label: '推荐', active: true }, { label: '附近', active: false }, { label: '活动', active: false }].map((tab) => (
            <span key={tab.label} className={`px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all ${tab.active ? 'bg-brand/55 text-ink/75 shadow-sm' : 'text-ink/45 hover:text-ink/60'}`}>{tab.label}</span>
          ))}
        </div>
      </motion.div>

      <div className="px-5 mt-3">
        <motion.div className="relative w-full rounded-[24px] overflow-hidden shadow-deep mb-4" variants={scaleIn} custom={1}>
          <img src="https://images.unsplash.com/photo-1505075936514-68f763eb37fb?w=800&q=80" alt="Community Post" className="w-full h-[320px] object-cover" onError={handleImgError} />
          <div className="absolute inset-0 overlay-editorial" />
          <div className="absolute top-4 left-4">
            <div className="glass-dark rounded-full px-3 py-1 flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full overflow-hidden">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" alt="" className="w-full h-full object-cover" onError={handleImgError} />
              </div>
              <span className="text-[11px] text-white/90 font-medium">李梦</span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="text-display text-white text-[18px] tracking-[-0.02em] mb-1.5">周末微醺时光</h3>
            <p className="text-editorial text-white/65 text-[12px] mb-3">午后阳光与一杯青柠苏打的故事</p>
            <div className="flex items-center gap-5 text-white/70">
              {[{ icon: Heart, count: '1.2k' }, { icon: MessageSquare, count: '328' }, { icon: Bookmark, count: '' }].map(({ icon: Icon, count }, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  <Icon size={14} strokeWidth={1.5} />
                  {count && <span className="text-[11px] font-light">{count}</span>}
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-0 rounded-[24px] ring-1 ring-white/[0.06] ring-inset" />
        </motion.div>

        <div className="grid grid-cols-2 gap-2.5 mb-4">
          {[
            { img: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400&q=80', title: '果酒品鉴笔记', user: '秦子宜', h: 'h-[180px]', likes: '892' },
            { img: 'https://images.unsplash.com/photo-1470337458703-415120146cbc?w=400&q=80', title: '夏日特调配方', user: '陈小溪', h: 'h-[210px]', likes: '654' },
          ].map((post, idx) => (
            <motion.div key={idx} className="rounded-[18px] overflow-hidden shadow-soft relative group cursor-pointer" variants={fadeInUp} custom={2 + idx} whileTap={{ scale: 0.97 }}>
              <img src={post.img} alt={post.title} className={`w-full ${post.h} object-cover`} onError={handleImgError} />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent">
                <h4 className="text-[12px] text-white font-bold tracking-tight">{post.title}</h4>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] text-white/70 font-light">{post.user}</span>
                  <span className="text-[10px] text-white/60 flex items-center"><Heart size={10} className="mr-0.5" />{post.likes}</span>
                </div>
              </div>
              <div className="absolute inset-0 rounded-[18px] ring-1 ring-black/[0.04] ring-inset" />
            </motion.div>
          ))}
        </div>

        <motion.div className="glass-premium rounded-[22px] p-5 mb-4" variants={slideUp}>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-[15px] font-bold text-ink tracking-tight">热门评论</h3>
            <span className="text-[11px] text-ink/35 font-light">328</span>
          </div>
          <div className="space-y-4">
            {[
              { name: '李梦', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80', text: '好有氛围感~下午来上一杯，感觉所有烦恼都忘了', likes: 387, time: '2h ago' },
              { name: '秦子宜', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80', text: '周末要不要一起去小酒馆喝这款果茶酒~好喝颜值又高', likes: 243, time: '5h ago' },
            ].map((comment, idx) => (
              <motion.div key={comment.name} className="flex gap-2.5" variants={fadeInUp} custom={4 + idx}>
                <img src={comment.avatar} alt={comment.name} className="w-8 h-8 rounded-[10px] object-cover ring-1 ring-ink/[0.06]" onError={handleImgError} />
                <div className="flex-1 pb-3.5 border-b border-ink/[0.05] last:border-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[13px] font-bold text-ink tracking-tight">{comment.name}</h4>
                    <span className="text-[10px] text-ink/35 font-light">{comment.time}</span>
                  </div>
                  <p className="text-editorial-cn text-[12px] text-ink/55 mt-1 leading-[1.65]">{comment.text}</p>
                  <div className="flex items-center gap-3 mt-2 text-ink/40">
                    <span className="flex items-center text-[11px]"><Heart size={12} className="mr-1" />{comment.likes}</span>
                    <span className="flex items-center text-[11px]"><MessageSquare size={12} className="mr-1" /></span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  // ─── CART ────────────────────────────────────────────────────────
  const renderCart = () => (
    <motion.div className="h-full bg-magazine flex flex-col" initial="hidden" animate="visible">
      <motion.div className="pt-5 pb-3 px-6 flex items-center justify-between" variants={fadeIn}>
        <div />
        <h1 className="text-display text-[18px] text-ink tracking-[-0.02em]">我的订单</h1>
        <Settings size={16} className="text-ink/35" strokeWidth={1.5} />
      </motion.div>
      <motion.div className="flex items-center justify-between px-6 py-3 text-[12px]" variants={fadeIn} custom={1}>
        {['全部', '待付款', '待发货', '待收货', '已完成'].map((tab, i) => (
          <span key={tab} className={`pb-2 relative ${i === 0 ? 'text-ink font-bold' : 'text-ink/45 font-medium'}`}>
            {tab}
            {i === 0 && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-lime-fizz rounded-full" />}
          </span>
        ))}
      </motion.div>
      <div className="flex-1 overflow-y-auto p-5 pb-24 scrollbar-hide">
        <motion.div className="glass-premium ice-edge rounded-[22px] p-5 mb-3" variants={scaleIn} custom={2}>
          <div className="flex justify-between items-center border-b border-ink/[0.06] pb-3 mb-3.5">
            <span className="text-[10px] text-ink/40 font-light tracking-[0.02em]">ZH202205021030042787</span>
            <span className="text-[10px] text-ink/70 bg-brand/50 px-2.5 py-0.5 rounded-full font-bold tracking-wide">已完成</span>
          </div>
          <div className="flex gap-3.5">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1551024601-bec78aea704b?w=200&q=80" className="w-[68px] h-[68px] rounded-[14px] object-cover" onError={handleImgError} alt="果茶酒" />
              <div className="absolute inset-0 rounded-[14px] ring-1 ring-black/[0.04] ring-inset" />
            </div>
            <div className="flex-1 flex flex-col">
              <h3 className="text-[14px] font-bold text-ink tracking-tight">大红袍红柚果茶酒</h3>
              <p className="text-[11px] text-ink/50 mt-0.5">330ml · 3.8°</p>
              <div className="flex justify-between items-end mt-auto">
                <div className="flex items-baseline gap-0.5">
                  <span className="text-[10px] text-ink/45">¥</span>
                  <span className="text-display text-ink text-[16px]">86.00</span>
                </div>
                <span className="text-[11px] text-ink/40">×1</span>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4 gap-2">
            <motion.button whileTap={{ scale: 0.95 }} className="px-4 py-1.5 glass rounded-full text-[11px] text-ink/55 font-semibold">查看物流</motion.button>
            <motion.button whileTap={{ scale: 0.95 }} className="px-4 py-1.5 bg-ink/[0.06] rounded-full text-[11px] text-ink/60 font-semibold">再来一单</motion.button>
          </div>
        </motion.div>
        <motion.div className="text-center mt-8" variants={fadeIn} custom={3}>
          <LemonSlice className="w-12 h-12 mx-auto text-brand/35 mb-3" />
          <p className="text-editorial-cn text-[13px] text-ink/40">更多订单，等你探索</p>
        </motion.div>
      </div>
    </motion.div>
  );

  // ─── MINE ────────────────────────────────────────────────────────
  const renderMine = () => (
    <motion.div className="h-full bg-zesty overflow-y-auto pb-24 scrollbar-hide relative" initial="hidden" animate="visible">
      <FizzBubbles density="sparse" />
      <motion.div className="pt-6 px-6 pb-4 relative z-10" variants={fadeInUp} custom={0}>
        <div className="flex justify-between items-start mb-5">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80" className="w-[56px] h-[56px] rounded-[18px] object-cover shadow-elevated" onError={handleImgError} alt="Avatar" />
              <div className="absolute inset-0 rounded-[18px] ring-1 ring-white/30 ring-inset" />
              <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-lime-fizz rounded-full flex items-center justify-center shadow-sm ring-2 ring-white/60">
                <Sparkles size={9} className="text-ink/60" />
              </div>
            </div>
            <div>
              <h1 className="text-display text-[19px] text-ink tracking-[-0.02em]">牛MO王</h1>
              <p className="text-[11px] text-ink/50 flex items-center mt-1 tracking-wide"><Phone size={10} className="mr-1" /> 138****6688</p>
            </div>
          </div>
          <Settings size={17} className="text-ink/35 mt-2" strokeWidth={1.5} />
        </div>
        <motion.button whileTap={{ scale: 0.97 }}
          className="w-full glass-premium ice-edge rounded-[16px] py-3 flex items-center justify-center text-ink text-[13px] font-bold" variants={fadeInUp} custom={1}>
          <Sparkles size={14} className="mr-1.5 text-lime-deep" /> 签到领积分
        </motion.button>
      </motion.div>

      <div className="px-5 space-y-3 relative z-10">
        <motion.div className="glass-premium ice-edge rounded-[20px] p-5 flex justify-around items-center" variants={scaleIn} custom={2}>
          {[{ value: '9', label: '优惠券' }, { value: '360', label: '积分' }, { value: '865', label: '余额(元)' }].map((stat, i, arr) => (
            <React.Fragment key={stat.label}>
              <div className="flex flex-col items-center">
                <span className="text-display text-[22px] text-ink">{stat.value}</span>
                <span className="text-[10px] text-ink/50 mt-1.5 font-medium">{stat.label}</span>
              </div>
              {i < arr.length - 1 && <div className="w-px h-8 bg-ink/[0.06]" />}
            </React.Fragment>
          ))}
        </motion.div>

        <motion.div className="glass-premium ice-edge rounded-[20px] p-5" variants={fadeInUp} custom={3}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[14px] font-bold text-ink tracking-tight">订单中心</h3>
            <span className="text-[11px] text-ink/45 flex items-center cursor-pointer font-medium" onClick={() => setActiveTab('cart')}>全部订单 <ChevronRight size={11} className="ml-0.5" /></span>
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            <IconItem icon={<Wallet size={20} />} label="待支付" />
            <IconItem icon={<Bike size={20} />} label="待收货" />
            <IconItem icon={<MessageSquare size={20} />} label="待评价" />
            <IconItem icon={<Settings size={20} />} label="售后" />
            <IconItem icon={<FileText size={20} />} label="全部" onClick={() => setActiveTab('cart')} />
          </div>
        </motion.div>

        <motion.div className="glass-premium ice-edge rounded-[20px] p-5" variants={fadeInUp} custom={4}>
          <h3 className="text-[14px] font-bold text-ink mb-4 tracking-tight">我的服务</h3>
          <div className="grid grid-cols-5 gap-y-4 gap-x-1.5">
            <IconItem icon={<User size={20} />} label="会员" />
            <IconItem icon={<Heart size={20} />} label="收藏" />
            <IconItem icon={<MapPin size={20} />} label="地址" />
            <IconItem icon={<Phone size={20} />} label="客服" />
            <IconItem icon={<FileText size={20} />} label="发票" />
            <IconItem icon={<MessageSquare size={20} />} label="建议" />
            <IconItem icon={<Store size={20} />} label="采购" />
            <IconItem icon={<Heart size={20} />} label="招募" />
            <IconItem icon={<Info size={20} />} label="规则" />
            <IconItem icon={<Map size={20} />} label="门店" />
          </div>
        </motion.div>

        <motion.div className="glass-premium ice-edge rounded-[20px] px-5 py-0.5 mb-6" variants={fadeInUp} custom={5}>
          <ListItem label="往期活动" />
          <ListItem label="常见问题" />
          <ListItem label="我要评分" />
          <ListItem label="清除缓存" value="876MB" />
          <ListItem label="关于" value="v2.36" isLast />
        </motion.div>
      </div>
    </motion.div>
  );

  // ─── Shell ───────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#E0E0E0] flex items-center justify-center p-4">
      <div className="w-full max-w-[390px] h-[844px] bg-zesty rounded-[48px] shadow-glass-2xl relative overflow-hidden flex flex-col font-sans ring-[8px] ring-black/[0.08]">
        <div className="h-[52px] w-full flex justify-between items-end px-8 pb-2 text-ink font-semibold text-[12px] z-50 absolute top-0 pointer-events-none">
          <span className="tracking-tight font-bold">9:41</span>
          <div className="flex space-x-1.5 items-center pb-0.5">
            <div className="flex gap-[3px] items-end">
              {[3, 5, 7, 9].map((h, i) => (<div key={i} className="w-[3px] rounded-full bg-ink/50" style={{ height: h }} />))}
            </div>
            <span className="text-[9px] text-ink/50 font-semibold ml-1">5G</span>
            <div className="w-[22px] h-[11px] border-[1.5px] border-ink/40 rounded-[3px] relative ml-1">
              <div className="absolute inset-[1.5px] right-[3px] bg-ink/40 rounded-[1px]" />
              <div className="absolute -right-[3px] top-[2.5px] w-[1.5px] h-[5px] bg-ink/35 rounded-r-full" />
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} className={`flex-1 overflow-hidden pt-[52px] relative ${activeTab === 'mall' ? 'bg-white' : ''}`}
            initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
            {activeTab === 'home' && renderHome()}
            {activeTab === 'mall' && renderMall()}
            {activeTab === 'community' && renderCommunity()}
            {activeTab === 'cart' && renderCart()}
            {activeTab === 'mine' && renderMine()}
          </motion.div>
        </AnimatePresence>

        <nav className="absolute bottom-0 w-full h-[78px] glass-frost px-6 pb-6 pt-2 flex justify-between items-center z-50 rounded-b-[42px] border-t border-white/[0.15]">
          <NavItem icon={<Home size={20} />} label="首页" isActive={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <NavItem icon={<Store size={20} />} label="商城" isActive={activeTab === 'mall'} onClick={() => setActiveTab('mall')} />
          <NavItem icon={<MessageSquare size={20} />} label="社区" isActive={activeTab === 'community'} onClick={() => setActiveTab('community')} />
          <div className="relative flex flex-col items-center cursor-pointer group" onClick={() => setActiveTab('cart')}>
            <motion.div className={`p-1.5 rounded-xl transition-all duration-300 ${activeTab === 'cart' ? 'bg-brand/50 text-ink/70 shadow-sm' : 'text-ink/40 group-hover:text-ink/60'}`} whileTap={{ scale: 0.88 }}>
              <ShoppingCart size={20} strokeWidth={activeTab === 'cart' ? 2 : 1.5} />
              {cartCount > 0 && activeTab !== 'mall' && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-0.5 -right-1.5 bg-brand/75 text-ink/70 text-[8px] font-bold h-3.5 min-w-[14px] px-1 flex items-center justify-center rounded-full shadow-sm">{cartCount > 99 ? '99+' : cartCount}</motion.span>
              )}
            </motion.div>
            <span className={`text-[10px] mt-1 transition-colors duration-300 font-semibold ${activeTab === 'cart' ? 'text-ink' : 'text-ink/40'}`}>订单</span>
          </div>
          <NavItem icon={<User size={20} />} label="我的" isActive={activeTab === 'mine'} onClick={() => setActiveTab('mine')} />
        </nav>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[100px] h-[4px] bg-ink/[0.07] rounded-full z-50 pointer-events-none" />
      </div>
    </div>
  );
}

// ─── Subcomponents ─────────────────────────────────────────────────
function NavItem({ icon, label, isActive, onClick }) {
  return (
    <div className="flex flex-col items-center cursor-pointer group" onClick={onClick}>
      <motion.div className={`p-1.5 rounded-xl transition-all duration-300 ${isActive ? 'bg-brand/50 text-ink/70 shadow-sm' : 'text-ink/40 group-hover:text-ink/60'}`} whileTap={{ scale: 0.88 }}>
        {React.cloneElement(icon, { strokeWidth: isActive ? 2 : 1.5 })}
      </motion.div>
      <span className={`text-[10px] mt-1 transition-colors duration-300 font-semibold ${isActive ? 'text-ink' : 'text-ink/40'}`}>{label}</span>
    </div>
  );
}

function IconItem({ icon, label, onClick }) {
  return (
    <motion.div className="flex flex-col items-center justify-center cursor-pointer" whileTap={{ scale: 0.88 }} onClick={onClick}>
      <div className="w-10 h-10 rounded-[12px] bg-ink/[0.04] flex items-center justify-center text-ink/45 mb-1.5">{icon}</div>
      <span className="text-[10px] text-ink/55 font-medium">{label}</span>
    </motion.div>
  );
}

function ListItem({ label, value, isLast }) {
  return (
    <div className={`flex justify-between items-center py-3.5 ${!isLast ? 'border-b border-ink/[0.06]' : ''} cursor-pointer group`}>
      <span className="text-[13px] text-ink/80 font-medium group-hover:text-ink transition-colors">{label}</span>
      <div className="flex items-center text-ink/35">
        {value && <span className="text-[11px] mr-1.5">{value}</span>}
        <ChevronRight size={13} strokeWidth={1.5} />
      </div>
    </div>
  );
}
