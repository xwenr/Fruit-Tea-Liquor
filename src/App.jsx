import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Home, Store, MessageSquare, ShoppingCart, User, Plus, MapPin,
  ChevronRight, Sparkles, Bike, Heart, Settings, Wallet, FileText,
  Map, Phone, Info, Flag, Gift, Bookmark
} from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────
const MALL_CATEGORIES = ['人气TOP', '灵感上新', '评价推荐', '果酒', '茶酒', '畅饮礼盒'];
const MALL_PRODUCTS = [
  { id: 1, name: '蜜桃乌龙酒', desc: '芒果·阳光玫瑰香', price: 87, img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&q=80' },
  { id: 2, name: '瓣瓣春蜜桃', desc: '水蜜桃·微醺果香', price: 99, img: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80' },
  { id: 3, name: '大红袍红柚', desc: '大红袍·红柚', price: 119, img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80' },
];

const fallbackImg = 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&q=80';
const handleImgError = (e) => { if (e.target.src !== fallbackImg) e.target.src = fallbackImg; };

// ─── Animation Variants ──────────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] } }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({ opacity: 1, transition: { duration: 0.5, delay: i * 0.1 } }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i = 0) => ({ opacity: 1, scale: 1, transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] } }),
};

const slideUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Fizz Bubbles (background decoration) ────────────────────────────
function FizzBubbles() {
  const bubbles = [
    { size: 6, left: '12%', delay: '0s', dur: 'animate-bubble-1', opacity: 0.35 },
    { size: 4, left: '28%', delay: '2s', dur: 'animate-bubble-2', opacity: 0.25 },
    { size: 8, left: '65%', delay: '1s', dur: 'animate-bubble-3', opacity: 0.2 },
    { size: 3, left: '80%', delay: '3s', dur: 'animate-bubble-4', opacity: 0.3 },
    { size: 5, left: '45%', delay: '4s', dur: 'animate-bubble-5', opacity: 0.22 },
    { size: 7, left: '90%', delay: '2s', dur: 'animate-bubble-6', opacity: 0.18 },
    { size: 4, left: '5%',  delay: '5s', dur: 'animate-bubble-3', opacity: 0.28 },
    { size: 3, left: '55%', delay: '1s', dur: 'animate-bubble-5', opacity: 0.2 },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {bubbles.map((b, i) => (
        <div
          key={i}
          className={`fizz-bubble ${b.dur}`}
          style={{ width: b.size, height: b.size, left: b.left, bottom: '-10%', opacity: b.opacity }}
        />
      ))}
    </div>
  );
}

// ─── Micro Line-art Illustrations ────────────────────────────────────
function LemonSlice({ className = '' }) {
  return (
    <svg viewBox="0 0 60 60" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="32" r="20" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
      <ellipse cx="30" cy="32" rx="14" ry="14" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <line x1="30" y1="18" x2="30" y2="46" stroke="currentColor" strokeWidth="0.4" opacity="0.15" />
      <line x1="17" y1="25" x2="43" y2="39" stroke="currentColor" strokeWidth="0.4" opacity="0.15" />
      <line x1="17" y1="39" x2="43" y2="25" stroke="currentColor" strokeWidth="0.4" opacity="0.15" />
      <path d="M30 12 C28 6 33 3 36 6" stroke="currentColor" strokeWidth="0.7" opacity="0.25" strokeLinecap="round" />
      <path d="M30 12 C32 7 27 4 25 7" stroke="currentColor" strokeWidth="0.5" opacity="0.18" strokeLinecap="round" />
    </svg>
  );
}

function IceCube({ className = '' }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M8 14 L20 8 L32 14 L32 28 L20 34 L8 28Z" stroke="currentColor" strokeWidth="0.7" opacity="0.2" strokeLinejoin="round" />
      <path d="M8 14 L20 20 L32 14" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
      <path d="M20 20 L20 34" stroke="currentColor" strokeWidth="0.5" opacity="0.12" />
      <path d="M12 16 L14 18" stroke="currentColor" strokeWidth="0.4" opacity="0.25" strokeLinecap="round" />
      <circle cx="15" cy="12" r="1" fill="currentColor" opacity="0.1" />
    </svg>
  );
}

// ─── Main App ────────────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [cartCount, setCartCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState(MALL_CATEGORIES[0]);

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleAddToCart = () => setCartCount(prev => prev + 1);

  // ─── HOME ────────────────────────────────────────────────────────
  const renderHome = () => (
    <motion.div
      className="h-full overflow-y-auto pb-24 scrollbar-hide bg-zesty relative"
      initial="hidden" animate="visible"
    >
      <FizzBubbles />

      {/* Editorial Header */}
      <motion.header className="px-8 pt-4 pb-6 relative z-10" variants={fadeInUp} custom={0}>
        <div className="flex justify-between items-start">
          <div>
            <span className="text-caption text-forest-light flex items-center mb-3 tracking-[0.12em]">
              <MapPin size={10} className="mr-1.5" /> 上海市 · 晴 · 26°C
            </span>
            <h1 className="text-display text-[32px] text-forest leading-none">
              微醺
            </h1>
            <h1 className="text-display text-[32px] text-forest leading-none mt-0.5">
              午后<span className="text-lime-fizz">.</span>
            </h1>
            <p className="text-editorial text-forest/40 text-[13px] mt-2">
              A sip of sunshine
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-11 h-11 rounded-2xl glass flex items-center justify-center text-forest mt-2"
          >
            <Search size={18} strokeWidth={1.8} />
          </motion.button>
        </div>
      </motion.header>

      {/* Hero — Editorial Layout */}
      <motion.section className="relative mb-6 z-10" variants={fadeInUp} custom={1}>
        <div className="px-6">
          {/* Image container */}
          <div className="relative w-full h-[340px] rounded-[32px] overflow-hidden shadow-glass-xl">
            <motion.img
              src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop"
              alt="初夏限定"
              className="w-full h-full object-cover"
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              onError={handleImgError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-forest/10 to-transparent" />
            <div className="absolute inset-0 rounded-[32px] ring-1 ring-white/10 ring-inset" />

            {/* Bottom action icons inside image */}
            <div className="absolute bottom-4 left-5 flex space-x-5 text-white/70">
              <Heart size={16} strokeWidth={1.5} />
              <Bookmark size={16} strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Overlapping info card — OUTSIDE the overflow-hidden container */}
        <motion.div
          className="mx-8 -mt-14 relative z-10 glass rounded-3xl p-5"
          variants={scaleIn} custom={2}
        >
          <div className="flex justify-between items-end">
            <div>
              <span className="inline-block px-2.5 py-1 bg-lime-fizz text-forest text-[9px] font-bold rounded-full mb-2.5 tracking-wide uppercase">
                初夏限定
              </span>
              <h2 className="text-display text-[22px] text-forest leading-tight">
                青柠海盐
              </h2>
              <h2 className="text-display text-[22px] text-forest leading-tight">
                苏打酒
              </h2>
              <p className="text-editorial text-forest/50 text-[12px] mt-1.5">
                清爽气泡，击退夏日炎热
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setActiveTab('mall')}
              className="w-12 h-12 rounded-2xl bg-lime-fizz text-forest flex items-center justify-center shadow-ambient flex-shrink-0"
            >
              <ChevronRight size={20} strokeWidth={2.5} />
            </motion.button>
          </div>
        </motion.div>

        {/* Line-art decoration */}
        <LemonSlice className="absolute top-3 right-10 w-12 h-12 text-white/30 animate-float-slow" />
      </motion.section>

      {/* Bento Navigation Grid */}
      <motion.section className="px-6 mb-8 mt-6 relative z-10" variants={fadeInUp} custom={3}>
        <div className="grid grid-cols-5 gap-3 h-[180px]">
          {/* Large card — 3 cols */}
          <motion.div
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveTab('mall')}
            className="col-span-3 glass-strong ice-edge rounded-[28px] p-5 relative overflow-hidden flex flex-col justify-between cursor-pointer"
          >
            <div className="relative z-10">
              <h3 className="text-display text-[18px] text-forest leading-tight">即刻<br/>送达</h3>
              <p className="text-[10px] text-forest/40 mt-1.5 font-light">同城30分钟内送达</p>
            </div>
            <div className="self-start px-3.5 py-1.5 bg-lime-fizz/60 text-forest text-[10px] font-semibold rounded-full flex items-center z-10 backdrop-blur-sm">
              去选酒 <ChevronRight size={10} className="ml-0.5" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-lime-fizz/20 rounded-full blur-2xl" />
            <div className="absolute bottom-0 right-0 w-[72px] h-[72px] rounded-tl-[28px] bg-lime-fizz/15 flex items-center justify-center">
              <Bike size={30} className="text-forest/50" strokeWidth={1.2} />
            </div>
            <IceCube className="absolute top-2 right-2 w-10 h-10 text-forest animate-float" />
          </motion.div>

          {/* Right stacked cards — 2 cols */}
          <div className="col-span-2 grid grid-rows-2 gap-3">
            <motion.div
              whileTap={{ scale: 0.96 }}
              className="glass-lime ice-edge rounded-[22px] p-3.5 flex flex-col justify-between cursor-pointer relative overflow-hidden"
            >
              <Sparkles size={14} className="text-forest/40" />
              <div>
                <h3 className="text-[12px] font-bold text-forest leading-tight">节日礼盒</h3>
                <p className="text-[9px] text-forest/35 mt-0.5 font-light">送礼佳选</p>
              </div>
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.96 }}
              className="glass-strong ice-edge rounded-[22px] p-3.5 flex flex-col justify-between cursor-pointer relative overflow-hidden"
            >
              <MessageSquare size={14} className="text-forest/40" />
              <div>
                <h3 className="text-[12px] font-bold text-forest leading-tight">社区福利</h3>
                <p className="text-[9px] text-forest/35 mt-0.5 font-light">签到领积分</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Editorial Picks */}
      <motion.section className="px-6 relative z-10" variants={fadeInUp} custom={4}>
        <div className="flex justify-between items-end mb-6">
          <div>
            <p className="text-caption text-forest/30 mb-1">CURATED FOR YOU</p>
            <h2 className="text-display text-[24px] text-forest">编辑精选</h2>
          </div>
          <span
            className="text-[11px] text-forest/40 flex items-center cursor-pointer font-medium"
            onClick={() => setActiveTab('mall')}
          >
            全部 <ChevronRight size={12} />
          </span>
        </div>

        <div className="space-y-4">
          {MALL_PRODUCTS.slice(0, 2).map((product, idx) => (
            <motion.div
              key={`home-${product.id}`}
              className="glass-strong ice-edge rounded-[24px] p-3.5 flex gap-4 items-center cursor-pointer"
              variants={fadeInUp} custom={5 + idx}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative">
                <img src={product.img} alt={product.name} className="w-[88px] h-[88px] rounded-[18px] object-cover" onError={handleImgError} />
                <div className="absolute inset-0 rounded-[18px] ring-1 ring-white/20 ring-inset" />
              </div>
              <div className="flex-1 py-1">
                <h3 className="text-[15px] font-bold text-forest tracking-tight">{product.name}</h3>
                <p className="text-editorial text-[11px] text-forest/35 mt-0.5 italic">{product.desc}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-display text-[18px] text-forest">
                    <span className="text-[11px] font-normal mr-0.5">¥</span>{product.price}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleAddToCart}
                    className="w-9 h-9 bg-forest text-lime-fizz rounded-xl flex items-center justify-center shadow-sm"
                  >
                    <Plus size={16} strokeWidth={2.5} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Editorial quote */}
        <motion.div className="mt-8 mb-4 text-center" variants={fadeIn} custom={7}>
          <LemonSlice className="w-10 h-10 mx-auto text-forest/30 mb-2" />
          <p className="text-editorial text-forest/25 text-[13px]">
            "Life is too short for bad drinks."
          </p>
        </motion.div>
      </motion.section>
    </motion.div>
  );

  // ─── MALL ────────────────────────────────────────────────────────
  const renderMall = () => (
    <motion.div
      className="h-full flex flex-col bg-white overflow-y-auto scrollbar-hide pb-24"
      initial="hidden" animate="visible"
    >
      {/* Header with editorial banner */}
      <motion.div className="px-6 pt-5 pb-5" variants={fadeInUp} custom={0}>
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-caption text-forest/30 mb-0.5">HOT DEALS</p>
            <h1 className="text-display text-[22px] text-forest">热销活动</h1>
          </div>
          <IceCube className="w-8 h-8 text-forest/20 animate-float" />
        </div>
        <div className="relative rounded-[22px] overflow-hidden h-[130px] shadow-glass">
          <img
            src="https://images.unsplash.com/photo-1470337458703-415120146cbc?w=800&q=80"
            alt="热销活动"
            className="w-full h-full object-cover"
            onError={handleImgError}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest/40 to-transparent" />
          <div className="absolute bottom-3 left-4">
            <span className="text-white/90 text-[11px] font-light">限时特惠</span>
            <p className="text-white text-[16px] font-bold tracking-tight">畅饮一夏</p>
          </div>
          <div className="absolute inset-0 rounded-[22px] ring-1 ring-white/10 ring-inset" />
        </div>
      </motion.div>

      {/* Split layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <motion.div
          className="w-[82px] bg-gradient-to-b from-gray-50/80 to-white h-full overflow-y-auto pb-32 scrollbar-hide flex flex-col pt-1"
          variants={fadeIn} custom={1}
        >
          <div className="py-3.5 px-2 text-center text-[11px] text-forest/30 font-medium">买过</div>
          {MALL_CATEGORIES.map((category) => (
            <div
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`py-3.5 px-2 text-center text-[11px] transition-all cursor-pointer relative ${
                activeCategory === category
                  ? 'text-forest font-bold bg-white'
                  : 'text-forest/35 hover:text-forest/60'
              }`}
            >
              {activeCategory === category && (
                <motion.div
                  layoutId="mall-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-lime-fizz rounded-r-full"
                />
              )}
              {category}
            </div>
          ))}
        </motion.div>

        {/* Product list */}
        <motion.div
          className="flex-1 h-full overflow-y-auto px-5 py-2 pb-40 scrollbar-hide relative bg-white"
          variants={fadeInUp} custom={2}
        >
          <div className="flex gap-2.5 mb-6">
            {[{ name: '低度蜜桃乌龙酒', price: 87 }, { name: '大红袍西柚酒', price: 119 }].map((item) => (
              <div key={item.name} className="flex-1 glass-lime ice-edge rounded-2xl p-3.5">
                <h4 className="text-[11px] text-forest/50 mb-1.5 font-medium">{item.name}</h4>
                <span className="text-display text-forest text-[16px]">
                  <span className="text-[10px] font-normal">¥</span> {item.price}
                </span>
              </div>
            ))}
          </div>

          <h2 className="text-[13px] font-bold text-forest mb-4 tracking-tight">{activeCategory}</h2>

          <div className="space-y-5">
            {MALL_PRODUCTS.map((product, idx) => (
              <motion.div
                key={product.id}
                className="flex gap-3.5"
                variants={fadeInUp} custom={3 + idx}
              >
                <div className="relative flex-shrink-0">
                  <img src={product.img} alt={product.name} className="w-[86px] h-[86px] rounded-2xl object-cover" onError={handleImgError} />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-black/5 ring-inset" />
                </div>
                <div className="flex-1 flex flex-col py-0.5">
                  <h3 className="text-[14px] text-forest font-semibold tracking-tight">{product.name}</h3>
                  <p className="text-[10px] mt-1.5 flex flex-wrap gap-1">
                    {product.desc.split('·').map(tag => (
                      <span key={tag} className="bg-lime-fizz/15 text-forest/40 px-2 py-0.5 rounded-full text-[9px] font-medium">{tag}</span>
                    ))}
                  </p>
                  <div className="flex justify-between items-end mt-auto">
                    <span className="text-display text-forest text-[17px]">
                      <span className="text-[11px] font-normal mr-0.5">¥</span>{product.price}
                    </span>
                    <motion.button
                      whileTap={{ scale: 0.88 }}
                      onClick={handleAddToCart}
                      className="bg-forest text-lime-fizz px-4 py-1.5 rounded-xl text-[11px] font-bold shadow-sm"
                    >
                      购入
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating cart bar */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.div
            className="absolute bottom-[88px] left-5 right-5 z-40"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="glass-strong ice-edge rounded-[28px] p-2.5 pl-5 flex items-center justify-between shadow-glass-lg">
              <div className="flex items-center">
                <div className="relative mr-4">
                  <ShoppingCart size={24} className="text-forest" strokeWidth={1.5} />
                  <span className="absolute -top-1.5 -right-2.5 bg-lime-fizz text-forest text-[9px] font-bold px-1.5 min-w-[16px] h-4 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                </div>
                <div>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-[11px] text-forest/50 font-medium">预计到手</span>
                    <span className="text-display text-[17px] text-forest">¥ {cartCount * 87}</span>
                  </div>
                  <span className="text-[9px] text-forest/30 font-light">已享受更低优惠，共减免 ¥ 26</span>
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="bg-forest text-lime-fizz text-[13px] font-bold px-7 py-3 rounded-2xl shadow-sm"
              >
                付款
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  // ─── COMMUNITY ───────────────────────────────────────────────────
  const renderCommunity = () => (
    <motion.div
      className="h-full overflow-y-auto pb-24 scrollbar-hide bg-[#F5F5F7] relative"
      initial="hidden" animate="visible"
    >
      {/* Header */}
      <motion.div className="pt-3 pb-3 px-6 sticky top-0 bg-[#F5F5F7]/90 backdrop-blur-xl z-20" variants={fadeIn}>
        <div className="glass-strong rounded-2xl flex items-center px-4 py-2.5 mb-4">
          <span className="text-forest/30 flex-1 text-[13px] font-light">搜索话题、用户...</span>
          <Search size={16} className="text-forest/30" strokeWidth={1.8} />
        </div>
        <div className="flex justify-center space-x-2.5">
          {[
            { label: '附近', emoji: '🐱', active: true },
            { label: '动态', icon: Flag, active: false },
            { label: '活动', icon: Gift, active: false },
          ].map((tab) => (
            <div
              key={tab.label}
              className={`px-5 py-2 rounded-full text-[12px] font-medium flex items-center transition-all ${
                tab.active
                  ? 'bg-forest text-lime-fizz shadow-sm'
                  : 'glass text-forest/40'
              }`}
            >
              {tab.emoji ? <span className="mr-1.5 text-sm">{tab.emoji}</span> : <tab.icon size={13} className="mr-1.5" />}
              {tab.label}
            </div>
          ))}
        </div>
      </motion.div>

      <div className="px-5 mt-3">
        {/* Hero image card */}
        <motion.div
          className="relative w-full rounded-[28px] overflow-hidden shadow-glass-lg"
          variants={scaleIn} custom={1}
        >
          <img
            src="https://images.unsplash.com/photo-1505075936514-68f763eb37fb?w=800&q=80"
            alt="Community Post"
            className="w-full h-[340px] object-cover"
            onError={handleImgError}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-5 flex items-center justify-between">
            <div className="flex space-x-6 text-white/85">
              {[
                { icon: Heart, count: '1.2k' },
                { icon: MessageSquare, count: '1.2k' },
                { icon: Bookmark, count: '1.2k' },
              ].map(({ icon: Icon, count }, idx) => (
                <div key={idx} className="flex items-center space-x-1.5">
                  <Icon size={16} strokeWidth={1.5} />
                  <span className="text-[11px] font-light">{count}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-0 rounded-[28px] ring-1 ring-white/10 ring-inset" />
        </motion.div>

        {/* Comments section */}
        <motion.div
          className="glass-strong rounded-[28px] p-6 mt-4 relative z-10"
          variants={slideUp}
        >
          <div className="w-10 h-1 bg-forest/10 rounded-full mx-auto mb-5" />
          <h3 className="text-display text-[16px] text-forest mb-5">评论 <span className="text-forest/30 font-light">1.2k</span></h3>

          <div className="space-y-5">
            {[
              { name: '李梦', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80', text: '好有氛围感~下午来上一杯，感觉所有烦恼都忘了', likes: 387, time: '9-10 15:25' },
              { name: '秦子宜', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80', text: '周末要不要一起去小酒馆喝这款果茶酒~好喝颜值又高，一起去呀！', likes: 243, time: '9-10 18:09' },
            ].map((comment, idx) => (
              <motion.div key={comment.name} className="flex space-x-3" variants={fadeInUp} custom={3 + idx}>
                <img src={comment.avatar} alt={comment.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-white" onError={handleImgError} />
                <div className="flex-1 border-b border-forest/5 pb-4">
                  <h4 className="text-[13px] font-bold text-forest">{comment.name}</h4>
                  <p className="text-[12px] text-forest/45 mt-1 leading-relaxed font-light">{comment.text}</p>
                  <div className="flex items-center justify-between mt-2.5 text-forest/25 text-[11px]">
                    <div className="flex space-x-4">
                      <span className="flex items-center"><Heart size={12} className="mr-1" /> {comment.likes}</span>
                      <span className="flex items-center"><MessageSquare size={12} className="mr-1" /></span>
                    </div>
                    <span className="font-light">{comment.time}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  // ─── CART (Orders) ───────────────────────────────────────────────
  const renderCart = () => (
    <motion.div
      className="h-full bg-gradient-to-b from-lime-mist/50 to-white flex flex-col"
      initial="hidden" animate="visible"
    >
      <motion.div
        className="pt-4 pb-3 px-6 flex items-center justify-center relative z-10"
        variants={fadeIn}
      >
        <h1 className="text-display text-[18px] text-forest">我的订单</h1>
        <Settings size={16} className="absolute right-6 text-forest/25" strokeWidth={1.5} />
      </motion.div>

      {/* Status tabs */}
      <motion.div
        className="flex items-center justify-between px-6 py-3 text-[11px] border-b border-forest/5"
        variants={fadeIn} custom={1}
      >
        {['全部', '待付款', '待发货', '待收货', '已完成'].map((tab, i) => (
          <span key={tab} className={i === 0 ? 'text-forest font-bold border-b-2 border-lime-fizz pb-1' : 'text-forest/30 font-medium'}>
            {tab}
          </span>
        ))}
      </motion.div>

      <div className="flex-1 overflow-y-auto p-5 scrollbar-hide">
        <motion.div
          className="glass-strong ice-edge rounded-[24px] p-5"
          variants={scaleIn} custom={2}
        >
          <div className="flex justify-between items-center border-b border-forest/5 pb-3 mb-3.5">
            <span className="text-[10px] text-forest/25 font-light tracking-wide">ZH202205021030042787</span>
            <span className="text-[10px] text-lime-fizz bg-forest px-2.5 py-0.5 rounded-full font-bold">已完成</span>
          </div>
          <div className="flex gap-3.5">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1551024601-bec78aea704b?w=200&q=80" className="w-16 h-16 rounded-[14px] object-cover" onError={handleImgError} alt="果茶酒" />
              <div className="absolute inset-0 rounded-[14px] ring-1 ring-white/20 ring-inset" />
            </div>
            <div className="flex-1">
              <h3 className="text-[13px] font-bold text-forest tracking-tight">大红袍红柚果茶酒</h3>
              <div className="flex justify-between items-end mt-3.5">
                <span className="text-display text-forest text-[15px]">
                  <span className="text-[9px] font-normal mr-0.5">¥</span>86.00
                </span>
                <span className="text-[10px] text-forest/25">×1</span>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="px-5 py-1.5 glass rounded-full text-[11px] text-forest/60 font-medium"
            >
              查看物流
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  // ─── MINE ────────────────────────────────────────────────────────
  const renderMine = () => (
    <motion.div
      className="h-full bg-zesty overflow-y-auto pb-24 scrollbar-hide relative"
      initial="hidden" animate="visible"
    >
      <FizzBubbles />

      {/* Profile header */}
      <motion.div className="pt-6 px-7 pb-5 relative z-10" variants={fadeInUp} custom={0}>
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80" className="w-[60px] h-[60px] rounded-[20px] object-cover shadow-glass" onError={handleImgError} alt="Avatar" />
              <div className="absolute inset-0 rounded-[20px] ring-2 ring-white/40 ring-inset" />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-lime-fizz rounded-full flex items-center justify-center shadow-sm">
                <Sparkles size={10} className="text-forest" />
              </div>
            </div>
            <div>
              <h1 className="text-display text-[18px] text-forest">牛MO王</h1>
              <p className="text-[10px] text-forest/30 flex items-center mt-1 font-light">
                <Phone size={9} className="mr-1" /> 138****6688
              </p>
            </div>
          </div>
          <Settings size={18} className="text-forest/30 mt-1" strokeWidth={1.5} />
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          className="mt-5 w-full glass ice-edge rounded-2xl py-3 flex items-center justify-center text-forest text-[11px] font-bold"
          variants={fadeInUp} custom={1}
        >
          <Sparkles size={13} className="mr-1.5 text-lime-fizz" /> 签到领积分
        </motion.button>
      </motion.div>

      <div className="px-5 space-y-3.5 relative z-10">
        {/* Stats */}
        <motion.div
          className="glass-strong ice-edge rounded-[24px] p-5 flex justify-around items-center"
          variants={scaleIn} custom={2}
        >
          {[
            { value: '9', label: '优惠券' },
            { value: '360', label: '积分' },
            { value: '865.50', label: '余额(元)' },
          ].map((stat, i, arr) => (
            <React.Fragment key={stat.label}>
              <div className="flex flex-col items-center">
                <span className="text-display text-[20px] text-forest">{stat.value}</span>
                <span className="text-[9px] text-forest/30 mt-1 font-light">{stat.label}</span>
              </div>
              {i < arr.length - 1 && <div className="w-[1px] h-8 bg-forest/5" />}
            </React.Fragment>
          ))}
        </motion.div>

        {/* Order center */}
        <motion.div
          className="glass-strong ice-edge rounded-[24px] p-5"
          variants={fadeInUp} custom={3}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[13px] font-bold text-forest">订单中心</h3>
            <span className="text-[10px] text-forest/25 flex items-center cursor-pointer font-medium" onClick={() => setActiveTab('cart')}>
              全部订单 <ChevronRight size={10} />
            </span>
          </div>
          <div className="grid grid-cols-5 gap-2">
            <IconItem icon={<Wallet size={20} />} label="待支付" />
            <IconItem icon={<Bike size={20} />} label="待收货" />
            <IconItem icon={<MessageSquare size={20} />} label="待评价" />
            <IconItem icon={<Settings size={20} />} label="售后" />
            <IconItem icon={<FileText size={20} />} label="我的订单" onClick={() => setActiveTab('cart')} />
          </div>
        </motion.div>

        {/* Services */}
        <motion.div
          className="glass-strong ice-edge rounded-[24px] p-5"
          variants={fadeInUp} custom={4}
        >
          <h3 className="text-[13px] font-bold text-forest mb-4">我的服务</h3>
          <div className="grid grid-cols-5 gap-y-5 gap-x-2">
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

        {/* Settings list */}
        <motion.div
          className="glass-strong ice-edge rounded-[24px] px-5 py-1 mb-6"
          variants={fadeInUp} custom={5}
        >
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
    <div className="min-h-screen bg-[#E8E8E8] flex items-center justify-center p-4">
      <div className="w-full max-w-[390px] h-[844px] bg-zesty rounded-[44px] shadow-glass-xl relative overflow-hidden flex flex-col font-sans ring-[6px] ring-gray-300/50">

        {/* Status bar */}
        <div className="h-[52px] w-full flex justify-between items-end px-7 pb-2 text-forest font-semibold text-[12px] z-50 absolute top-0 pointer-events-none">
          <span className="tracking-tight">9:41</span>
          <div className="flex space-x-1.5 items-center pb-0.5">
            <div className="w-[18px] h-[11px] border border-forest/40 rounded-[3px] relative">
              <div className="absolute right-0 top-0 bottom-0 w-3 bg-forest/40 rounded-[1.5px] m-[1px]" />
            </div>
          </div>
        </div>

        {/* Main content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className={`flex-1 overflow-hidden pt-[52px] relative ${activeTab === 'mall' ? 'bg-white' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === 'home' && renderHome()}
            {activeTab === 'mall' && renderMall()}
            {activeTab === 'community' && renderCommunity()}
            {activeTab === 'cart' && renderCart()}
            {activeTab === 'mine' && renderMine()}
          </motion.div>
        </AnimatePresence>

        {/* Bottom navigation */}
        <nav className="absolute bottom-0 w-full h-[80px] glass-strong px-7 pb-6 pt-2.5 flex justify-between items-center z-50 rounded-b-[38px]">
          <NavItem icon={<Home size={20} />} label="首页" isActive={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <NavItem icon={<Store size={20} />} label="商城" isActive={activeTab === 'mall'} onClick={() => setActiveTab('mall')} />
          <NavItem icon={<MessageSquare size={20} />} label="社区" isActive={activeTab === 'community'} onClick={() => setActiveTab('community')} />

          {/* Cart nav item with badge */}
          <div className="relative flex flex-col items-center cursor-pointer group" onClick={() => setActiveTab('cart')}>
            <motion.div
              className={`p-1.5 rounded-xl transition-all duration-300 ${
                activeTab === 'cart' ? 'bg-lime-fizz text-forest' : 'text-forest/30 group-hover:text-forest/60'
              }`}
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingCart size={20} strokeWidth={activeTab === 'cart' ? 2 : 1.5} />
              {cartCount > 0 && activeTab !== 'mall' && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-1.5 bg-forest text-lime-fizz text-[8px] font-bold h-3.5 min-w-[14px] px-1 flex items-center justify-center rounded-full"
                >
                  {cartCount > 99 ? '99+' : cartCount}
                </motion.span>
              )}
            </motion.div>
            <span className={`text-[9px] mt-1 transition-colors duration-300 font-medium ${
              activeTab === 'cart' ? 'text-forest' : 'text-forest/25'
            }`}>
              订单
            </span>
          </div>

          <NavItem icon={<User size={20} />} label="我的" isActive={activeTab === 'mine'} onClick={() => setActiveTab('mine')} />
        </nav>

        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[100px] h-[4px] bg-forest/10 rounded-full z-50 pointer-events-none" />
      </div>
    </div>
  );
}

// ─── Subcomponents ─────────────────────────────────────────────────
function NavItem({ icon, label, isActive, onClick }) {
  return (
    <div className="flex flex-col items-center cursor-pointer group" onClick={onClick}>
      <motion.div
        className={`p-1.5 rounded-xl transition-all duration-300 ${
          isActive ? 'bg-lime-fizz text-forest' : 'text-forest/30 group-hover:text-forest/60'
        }`}
        whileTap={{ scale: 0.9 }}
      >
        {React.cloneElement(icon, { strokeWidth: isActive ? 2 : 1.5 })}
      </motion.div>
      <span className={`text-[9px] mt-1 transition-colors duration-300 font-medium ${
        isActive ? 'text-forest' : 'text-forest/25'
      }`}>
        {label}
      </span>
    </div>
  );
}

function IconItem({ icon, label, onClick }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center cursor-pointer"
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      <div className="text-forest/40 mb-1.5">{icon}</div>
      <span className="text-[9px] text-forest/35 font-medium">{label}</span>
    </motion.div>
  );
}

function ListItem({ label, value, isLast }) {
  return (
    <div className={`flex justify-between items-center py-3.5 ${!isLast ? 'border-b border-forest/5' : ''} cursor-pointer`}>
      <span className="text-[12px] text-forest/60 font-medium">{label}</span>
      <div className="flex items-center text-forest/20">
        {value && <span className="text-[10px] mr-1.5 font-light">{value}</span>}
        <ChevronRight size={12} strokeWidth={1.5} />
      </div>
    </div>
  );
}
