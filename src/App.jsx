import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Home, Store, MessageSquare, ShoppingCart, User, Plus, MapPin,
  ChevronRight, Sparkles, Bike, Heart, Settings, Wallet, FileText,
  Map, Phone, Info, Gift, Bookmark, Star, ArrowRight, Clock,
  Droplets, Flame, TrendingUp, Eye, Package
} from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────
const MALL_CATEGORIES = ['人气TOP', '灵感上新', '评价推荐', '果酒', '茶酒', '畅饮礼盒'];
const MALL_PRODUCTS = [
  {
    id: 1, name: '蜜桃乌龙酒', desc: '水蜜桃·乌龙茶香', price: 87, vol: '330ml', abv: '3.5°',
    badge: '畅销', category: '人气TOP',
    img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&q=80',
  },
  {
    id: 2, name: '青柠海盐苏打', desc: '青柠·海盐·细腻气泡', price: 89, vol: '330ml', abv: '3.2°',
    badge: '新品', category: '灵感上新',
    img: 'https://images.unsplash.com/photo-1470337458703-415120146cbc?w=400&q=80',
  },
  {
    id: 3, name: '大红袍红柚', desc: '大红袍·红柚清甜', price: 119, vol: '330ml', abv: '3.8°',
    badge: '', category: '果酒',
    img: 'https://images.unsplash.com/photo-1633933349443-80b61967bafc?w=400&q=80',
  },
  {
    id: 4, name: '荔枝玫瑰果酒', desc: '新鲜荔枝·玫瑰花香', price: 109, vol: '500ml', abv: '4.2°',
    badge: '上新', category: '灵感上新',
    img: 'https://images.unsplash.com/photo-1633933329834-44543f91720f?w=400&q=80',
  },
  {
    id: 5, name: '杨梅白桃酒', desc: '东山杨梅·白桃清爽', price: 99, vol: '330ml', abv: '3.5°',
    badge: '好评', category: '评价推荐',
    img: 'https://images.unsplash.com/photo-1587223962930-cb7f31384c19?w=400&q=80',
  },
  {
    id: 6, name: '芒果凤梨气泡', desc: '芒果·菠萝·椰子风情', price: 78, vol: '330ml', abv: '3.0°',
    badge: '', category: '果酒',
    img: 'https://images.unsplash.com/photo-1550426735-c33c7ce414ff?w=400&q=80',
  },
  {
    id: 7, name: '蓝莓接骨木花', desc: '蓝莓·接骨木花·微醺', price: 129, vol: '500ml', abv: '4.5°',
    badge: '精选', category: '茶酒',
    img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80',
  },
  {
    id: 8, name: '初夏果酒礼盒', desc: '6瓶精选·高端礼盒装', price: 299, vol: '330ml×6', abv: '混合',
    badge: '礼盒', category: '畅饮礼盒',
    img: 'https://images.unsplash.com/photo-1644592873443-93a3265178b6?w=400&q=80',
  },
];

const ORDER_LIST = [
  {
    orderId: 'ZH202406151030042787',
    status: '已完成', statusColor: 'bg-sage-200/60 text-forest-light',
    img: 'https://images.unsplash.com/photo-1633933349443-80b61967bafc?w=200&q=80',
    name: '大红袍红柚果茶酒', spec: '330ml · 3.8°', price: '119.00', qty: 1,
  },
  {
    orderId: 'ZH202406081645088234',
    status: '待收货', statusColor: 'bg-peach-100 text-peach-500',
    img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=200&q=80',
    name: '蜜桃乌龙酒', spec: '330ml · 3.5°', price: '87.00', qty: 2,
  },
  {
    orderId: 'ZH202405271120067901',
    status: '已完成', statusColor: 'bg-sage-200/60 text-forest-light',
    img: 'https://images.unsplash.com/photo-1644592873443-93a3265178b6?w=200&q=80',
    name: '初夏果酒礼盒', spec: '330ml×6 · 混合度数', price: '299.00', qty: 1,
  },
];

const fallbackImg = 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&q=80';
const handleImgError = (e) => { if (e.target.src !== fallbackImg) e.target.src = fallbackImg; };

const BADGE_STYLES = {
  '畅销': 'bg-brand/25 text-forest-light',
  '新品': 'bg-peach-100 text-peach-500',
  '上新': 'bg-peach-50 text-peach-400',
  '好评': 'bg-lemon-light/70 text-lemon-gold',
  '精选': 'bg-sage-100 text-sage-400',
  '礼盒': 'bg-peach-100 text-peach-500',
};
const getBadgeStyle = (badge) => BADGE_STYLES[badge] || 'bg-brand/25 text-ink/55';

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
  const [activeCategory, setActiveCategory] = useState(MALL_CATEGORIES[0]);
  const [communityTab, setCommunityTab] = useState('推荐');
  const [orderTab, setOrderTab] = useState('全部');
  const handleAddToCart = () => setCartCount(prev => prev + 1);

  // ─── HOME ────────────────────────────────────────────────────────
  const renderHome = () => (
    <motion.div className="h-full overflow-y-auto pb-24 scrollbar-hide bg-zesty relative" initial="hidden" animate="visible">
      <FizzBubbles />

      <motion.header className="px-6 pt-3 pb-1 relative z-10" variants={fadeInUp} custom={0}>
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-caption text-ink/45 tracking-[0.14em]">LEMON SODA WEEKLY</span>
              <span className="w-1 h-1 rounded-full bg-ink/15" />
              <span className="text-caption text-ink/40 tracking-[0.1em] flex items-center">
                <MapPin size={8} className="mr-1" /> 上海
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <h1 className="text-display-cn text-[28px] text-ink leading-none tracking-[-0.02em]">微醺午后</h1>
              <span className="text-lime-fizz text-[28px] font-bold leading-none">.</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-ink/40 font-light">26°C · 晴</span>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.92 }}
              className="w-10 h-10 rounded-xl glass-premium flex items-center justify-center text-ink/55"
              aria-label="搜索">
              <Search size={16} strokeWidth={1.6} />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Hero */}
      <motion.section className="relative mb-2 z-10" variants={fadeInUp} custom={1}>
        <div className="px-5">
          <div className="relative w-full h-[190px] rounded-2xl overflow-hidden shadow-deep texture-grain">
            <motion.img src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop" alt="初夏限定"
              className="w-full h-full object-cover" initial={{ scale: 1.08 }} animate={{ scale: 1 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }} onError={handleImgError} />
            <div className="absolute inset-0 overlay-editorial" />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-white/[0.08] ring-inset" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                <span className="inline-flex items-center px-2.5 py-0.5 bg-brand/80 text-ink/70 text-[9px] font-bold rounded-full mb-2 tracking-[0.08em] uppercase backdrop-blur-sm">
                  <Flame size={9} className="mr-1" /> 初夏限定
                </span>
                <h2 className="text-display text-[22px] text-white leading-[1.05] tracking-[-0.04em]">青柠海盐苏打酒<span className="text-lime-fizz/80">.</span></h2>
                <p className="text-editorial text-white/65 text-[11px] mt-1 not-italic">清爽气泡，击退夏日的每一度炎热</p>
              </motion.div>
            </div>
            <LemonSlice className="absolute top-3 right-4 w-10 h-10 text-white/15 animate-float-gentle" />
            <div className="absolute top-3 left-4 flex items-center gap-2">
              <div className="glass-dark rounded-full px-2 py-1 flex items-center gap-1">
                <Eye size={9} className="text-white/70" />
                <span className="text-[9px] text-white/65 font-medium">2.4k</span>
              </div>
            </div>
          </div>
        </div>

        <motion.div className="mx-6 -mt-7 relative z-10 glass-premium ice-edge rounded-2xl p-3.5" variants={scaleIn} custom={2}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-1.5">
                {['🍋', '🧊', '🫧'].map((e, i) => (
                  <span key={i} className="w-7 h-7 rounded-full bg-lime-fizz/30 flex items-center justify-center text-[12px] ring-2 ring-white/60">{e}</span>
                ))}
              </div>
              <div>
                <p className="text-[13px] font-bold text-ink tracking-tight">立即探索</p>
                <p className="text-[10px] text-ink/50 mt-0.5">3款新品已上线</p>
              </div>
            </div>
            <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.92 }} onClick={() => setActiveTab('mall')}
              className="w-10 h-10 rounded-xl bg-brand/60 text-ink/75 flex items-center justify-center shadow-soft"
              aria-label="探索商城">
              <ArrowRight size={16} strokeWidth={2.2} />
            </motion.button>
          </div>
        </motion.div>
      </motion.section>

      {/* Bento Grid */}
      <motion.section className="px-5 mb-6 mt-5 relative z-10" variants={fadeInUp} custom={3}>
        <div className="relative pl-1 mb-5">
          <SectionNum num={1} />
          <p className="text-caption text-ink/45 mb-1 relative">QUICK ACCESS</p>
          <h2 className="text-display-cn text-[20px] text-ink relative">快速入口</h2>
        </div>
        <div className="grid grid-cols-7 gap-2.5 h-[170px]">
          <motion.div whileTap={{ scale: 0.97 }} onClick={() => setActiveTab('mall')}
            className="col-span-4 glass-premium ice-edge rounded-[20px] p-4 relative overflow-hidden flex flex-col justify-between cursor-pointer group">
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
            <motion.div whileTap={{ scale: 0.95 }} className="glass-lime ice-edge rounded-2xl p-3 flex flex-col justify-between cursor-pointer relative overflow-hidden group">
              <div className="w-6 h-6 rounded-lg bg-peach-100 flex items-center justify-center"><Gift size={12} className="text-peach-400" /></div>
              <div>
                <h3 className="text-[12px] font-bold text-ink leading-tight tracking-tight">节日礼盒</h3>
                <p className="text-[10px] text-ink/45 mt-0.5">甄选好礼</p>
              </div>
            </motion.div>
            <motion.div whileTap={{ scale: 0.95 }} className="glass-strong ice-edge rounded-2xl p-3 flex flex-col justify-between cursor-pointer relative overflow-hidden group">
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
        <motion.div className="glass-premium ice-edge rounded-3xl p-5 relative overflow-hidden" variants={scaleIn} custom={5}>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-5 h-[2px] bg-peach-300 rounded-full" />
                <span className="text-[10px] text-peach-500 font-semibold tracking-[0.1em] uppercase">Vol.23</span>
              </div>
              <h3 className="text-display-cn text-[17px] text-ink leading-[1.25] mb-2">夏日微醺<br/>果酒指南</h3>
              <p className="text-editorial-cn text-[13px] text-ink/55 leading-[1.7] mb-4">从果园到杯中，探索低度果酒的风味旅程。每一口都是阳光的味道。</p>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-ink/40 font-light flex items-center"><Clock size={10} className="mr-1" /> 5 min read</span>
                <span className="w-1 h-1 rounded-full bg-ink/12" />
                <span className="text-[10px] text-ink/40 font-light flex items-center"><Heart size={10} className="mr-1" /> 892</span>
              </div>
            </div>
            <div className="w-[100px] h-[130px] rounded-2xl overflow-hidden flex-shrink-0 shadow-soft relative">
              <img src="https://images.unsplash.com/photo-1749747878437-ebe18d7c075c?w=300&q=80" alt="果酒专题" className="w-full h-full object-cover" onError={handleImgError} />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-black/[0.04] ring-inset" />
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
            <motion.div key={`home-${product.id}`} className="glass-premium ice-edge rounded-[20px] p-4 flex gap-4 items-stretch cursor-pointer group"
              variants={fadeInUp} custom={6 + idx} whileHover={{ y: -2, transition: { duration: 0.25 } }} whileTap={{ scale: 0.98 }}>
              <div className="relative flex-shrink-0">
                <img src={product.img} alt={product.name} className="w-[92px] h-[92px] rounded-2xl object-cover" onError={handleImgError} />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-black/[0.05] ring-inset" />
                <div className="absolute -bottom-1 -right-1 bg-peach-50/90 backdrop-blur-sm rounded-lg px-1.5 py-0.5 text-[9px] text-peach-500 font-semibold shadow-soft">{product.abv}</div>
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
                    className="w-9 h-9 bg-brand/60 text-ink/75 rounded-xl flex items-center justify-center shadow-soft"
                    aria-label={`加入购物车：${product.name}`}>
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
              { icon: Droplets, value: '67', unit: '种', label: '风味', color: 'text-forest-light' },
              { icon: Star, value: '4.9', unit: '', label: '评分', color: 'text-lemon-gold' },
              { icon: TrendingUp, value: '12k', unit: '+', label: '酒友', color: 'text-peach-400' },
            ].map((stat, i) => (
              <div key={i} className="flex-1 glass rounded-2xl p-3 text-center">
                <stat.icon size={14} className={`mx-auto ${stat.color} mb-1.5`} strokeWidth={1.5} />
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
          <img src="https://images.unsplash.com/photo-1748674758581-2afc6adebc19?w=800&q=80" alt="热销活动" className="w-full h-full object-cover" onError={handleImgError} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/15 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <span className="text-caption text-white/65 tracking-[0.1em]">LIMITED TIME</span>
            <p className="text-display text-white text-[18px] tracking-[-0.03em] mt-0.5">畅饮一夏</p>
          </div>
          <div className="absolute top-3 right-3 bg-peach-400 rounded-full px-2.5 py-1 text-[10px] text-white font-semibold">-20%</div>
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
            {MALL_PRODUCTS.filter(p => p.badge).slice(0, 2).map((item) => (
              <div key={item.name} className="flex-1 glass-lime ice-edge rounded-2xl p-3 relative overflow-hidden">
                <span className={`absolute top-2 right-2 text-[8px] ${getBadgeStyle(item.badge)} px-1.5 py-0.5 rounded-full font-semibold`}>{item.badge}</span>
                <h4 className="text-[11px] text-ink/60 mb-2 font-medium tracking-tight pr-8">{item.name}</h4>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-[10px] text-ink/45 font-light">¥</span>
                  <span className="text-display text-ink text-[17px]">{item.price}</span>
                </div>
                <p className="text-[9px] text-ink/35 mt-1">{item.abv} · {item.vol}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-[14px] font-bold text-ink tracking-tight">{activeCategory}</h2>
            <span className="text-[10px] text-ink/35 font-light">{MALL_PRODUCTS.filter(p => !activeCategory || activeCategory === '人气TOP' || p.category === activeCategory).length} 款</span>
          </div>

          <div className="space-y-4">
            {MALL_PRODUCTS.filter(p => activeCategory === '人气TOP' || p.category === activeCategory).map((product, idx) => (
              <motion.div key={product.id} className="flex gap-3.5 pb-4 border-b border-ink/[0.06] last:border-0" variants={fadeInUp} custom={3 + idx}>
                <div className="relative flex-shrink-0">
                  <img src={product.img} alt={product.name} className="w-[82px] h-[82px] rounded-xl object-cover" onError={handleImgError} />
                  <div className="absolute inset-0 rounded-xl ring-1 ring-black/[0.04] ring-inset" />
                </div>
                <div className="flex-1 flex flex-col py-0.5">
                  <h3 className="text-[15px] text-ink font-bold tracking-[-0.01em]">{product.name}</h3>
                  <p className="text-[10px] mt-1.5 flex flex-wrap gap-1">
                    {product.desc.split('·').map(tag => (
                      <span key={tag} className="bg-ink/[0.04] text-ink/50 px-2 py-0.5 rounded-full text-[10px] font-medium">{tag.trim()}</span>
                    ))}
                    <span className="bg-peach-50 text-peach-400 px-2 py-0.5 rounded-full text-[10px] font-medium">{product.abv}</span>
                  </p>
                  <div className="flex justify-between items-end mt-auto pt-1.5">
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-[10px] text-ink/45">¥</span>
                      <span className="text-display text-ink text-[17px]">{product.price}</span>
                    </div>
                    <motion.button whileTap={{ scale: 0.88 }} onClick={handleAddToCart}
                      className="bg-brand/60 text-ink/75 px-4 py-1.5 rounded-xl text-[11px] font-bold shadow-soft"
                      aria-label={`加购 ${product.name}`}>加购</motion.button>
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
            <div className="glass-frost ice-edge rounded-[20px] p-2.5 pl-5 flex items-center justify-between shadow-deep">
              <div className="flex items-center">
                <div className="relative mr-3.5">
                  <ShoppingCart size={22} className="text-ink" strokeWidth={1.5} />
                  <motion.span key={`mall-badge-${cartCount}`} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -top-1.5 -right-2.5 bg-brand/75 text-ink/70 text-[9px] font-bold px-1.5 min-w-[14px] h-3.5 flex items-center justify-center rounded-full">{cartCount}</motion.span>
                </div>
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[11px] text-ink/55 font-medium">合计</span>
                    <motion.span key={`total-${cartCount}`} initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="text-display text-[17px] text-ink">¥{cartCount * 87}</motion.span>
                  </div>
                  <span className="text-[10px] text-ink/40 font-light">已为你省下 ¥26</span>
                </div>
              </div>
              <motion.button whileTap={{ scale: 0.95 }} className="bg-brand/65 text-ink/80 text-[13px] font-bold px-6 py-2.5 rounded-xl shadow-soft" aria-label="去结算">去结算</motion.button>
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
          <motion.button whileTap={{ scale: 0.95 }} className="w-9 h-9 glass rounded-xl flex items-center justify-center" aria-label="搜索社区">
            <Search size={15} className="text-ink/45" strokeWidth={1.6} />
          </motion.button>
        </div>
        <div className="flex gap-2 pb-2">
          {['推荐', '附近', '活动'].map((tab) => (
            <span key={tab} onClick={() => setCommunityTab(tab)}
              className={`px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all cursor-pointer ${communityTab === tab ? 'bg-brand/55 text-ink/75 shadow-sm' : 'text-ink/45 hover:text-ink/60'}`}>{tab}</span>
          ))}
        </div>
      </motion.div>

      <div className="px-5 mt-3">
        <motion.div className="relative w-full rounded-3xl overflow-hidden shadow-deep mb-4" variants={scaleIn} custom={1}>
          <img src="https://images.unsplash.com/photo-1742973479780-59ef667a6a46?w=800&q=80" alt="Community Post" className="w-full h-[320px] object-cover" onError={handleImgError} />
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
            <p className="text-editorial text-white/65 text-[13px] mb-3">午后阳光与一杯青柠苏打的故事</p>
            <div className="flex items-center gap-5 text-white/70">
              {[{ icon: Heart, count: '1.2k' }, { icon: MessageSquare, count: '328' }, { icon: Bookmark, count: '' }].map(({ icon: Icon, count }, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  <Icon size={14} strokeWidth={1.5} />
                  {count && <span className="text-[11px] font-light">{count}</span>}
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-0 rounded-3xl ring-1 ring-white/[0.06] ring-inset" />
        </motion.div>

        <div className="grid grid-cols-2 gap-2.5 mb-4">
          {[
            { img: 'https://images.unsplash.com/photo-1470337458703-415120146cbc?w=400&q=80', title: '果酒品鉴笔记', user: '秦子宜', h: 'h-[180px]', likes: '892' },
            { img: 'https://images.unsplash.com/photo-1685700947293-1a4e62e095b5?w=400&q=80', title: '夏日特调配方', user: '陈小溪', h: 'h-[210px]', likes: '654' },
          ].map((post, idx) => (
            <motion.div key={idx} className="rounded-2xl overflow-hidden shadow-soft relative group cursor-pointer" variants={fadeInUp} custom={2 + idx} whileHover={{ y: -3, transition: { duration: 0.25 } }} whileTap={{ scale: 0.97 }}>
              <img src={post.img} alt={post.title} className={`w-full ${post.h} object-cover`} onError={handleImgError} />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent">
                <h4 className="text-[12px] text-white font-bold tracking-tight">{post.title}</h4>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] text-white/70 font-light">{post.user}</span>
                  <span className="text-[10px] text-white/60 flex items-center"><Heart size={10} className="mr-0.5" />{post.likes}</span>
                </div>
              </div>
              <div className="absolute inset-0 rounded-2xl ring-1 ring-black/[0.04] ring-inset" />
            </motion.div>
          ))}
        </div>

        <motion.div className="glass-premium rounded-[20px] p-5 mb-4" variants={slideUp}>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-[15px] font-bold text-ink tracking-tight">热门评论</h3>
            <span className="text-[11px] text-ink/35 font-light">328 条</span>
          </div>
          <div className="space-y-4">
            {[
              { name: '李梦', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80', text: '好有氛围感~下午来上一杯，感觉所有烦恼都忘了', likes: 387, time: '2小时前' },
              { name: '秦子宜', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80', text: '周末要不要一起去小酒馆喝这款果茶酒~好喝颜值又高', likes: 243, time: '5小时前' },
            ].map((comment, idx) => (
              <motion.div key={comment.name} className="flex gap-2.5" variants={fadeInUp} custom={4 + idx}>
                <img src={comment.avatar} alt={comment.name} className="w-8 h-8 rounded-[10px] object-cover ring-1 ring-ink/[0.06]" onError={handleImgError} />
                <div className="flex-1 pb-3.5 border-b border-ink/[0.05] last:border-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[13px] font-bold text-ink tracking-tight">{comment.name}</h4>
                    <span className="text-[10px] text-ink/35 font-light">{comment.time}</span>
                  </div>
                  <p className="text-editorial-cn text-[13px] text-ink/55 mt-1 leading-[1.65]">{comment.text}</p>
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
        <div className="w-4" aria-hidden="true" />
        <h1 className="text-display text-[18px] text-ink tracking-[-0.02em]">我的订单</h1>
        <Settings size={16} className="text-ink/35" strokeWidth={1.5} />
      </motion.div>
      <motion.div className="flex items-center justify-between px-6 py-3 text-[12px]" variants={fadeIn} custom={1}>
        {['全部', '待付款', '待发货', '待收货', '已完成'].map((tab) => (
          <span key={tab} onClick={() => setOrderTab(tab)}
            className={`pb-2 relative cursor-pointer transition-colors ${orderTab === tab ? 'text-ink font-bold' : 'text-ink/45 font-medium hover:text-ink/60'}`}>
            {tab}
            {orderTab === tab && <motion.span layoutId="order-tab-indicator" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-forest-light rounded-full" />}
          </span>
        ))}
      </motion.div>
      <div className="flex-1 overflow-y-auto p-5 pb-24 scrollbar-hide">
        <AnimatePresence mode="wait">
          {ORDER_LIST.filter(o => orderTab === '全部' || o.status === orderTab).length > 0 ? (
            <motion.div key={orderTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}>
              {ORDER_LIST.filter(o => orderTab === '全部' || o.status === orderTab).map((order, oi) => (
                <motion.div key={order.orderId} className="glass-premium ice-edge rounded-[20px] p-5 mb-3" variants={scaleIn} custom={2 + oi}>
                  <div className="flex justify-between items-center border-b border-ink/[0.06] pb-3 mb-3.5">
                    <span className="text-[10px] text-ink/40 font-light tracking-[0.02em]">{order.orderId}</span>
                    <span className={`text-[10px] ${order.statusColor} px-2.5 py-0.5 rounded-full font-bold tracking-wide`}>{order.status}</span>
                  </div>
                  <div className="flex gap-3.5">
                    <div className="relative">
                      <img src={order.img} className="w-[68px] h-[68px] rounded-xl object-cover" onError={handleImgError} alt={order.name} />
                      <div className="absolute inset-0 rounded-xl ring-1 ring-black/[0.04] ring-inset" />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <h3 className="text-[15px] font-bold text-ink tracking-tight">{order.name}</h3>
                      <p className="text-[11px] text-ink/50 mt-0.5">{order.spec}</p>
                      <div className="flex justify-between items-end mt-auto">
                        <div className="flex items-baseline gap-0.5">
                          <span className="text-[10px] text-ink/45">¥</span>
                          <span className="text-display text-ink text-[16px]">{order.price}</span>
                        </div>
                        <span className="text-[11px] text-ink/40">×{order.qty}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4 gap-2">
                    <motion.button whileTap={{ scale: 0.95 }} className="px-4 py-1.5 glass rounded-full text-[11px] text-ink/55 font-semibold">查看物流</motion.button>
                    <motion.button whileTap={{ scale: 0.95 }} className="px-4 py-1.5 bg-ink/[0.06] rounded-full text-[11px] text-ink/60 font-semibold">再来一单</motion.button>
                  </div>
                </motion.div>
              ))}
              <motion.div className="text-center mt-6 mb-4" variants={fadeIn} custom={5}>
                <LemonSlice className="w-12 h-12 mx-auto text-brand/35 mb-3" />
                <p className="text-editorial-cn text-[13px] text-ink/40">没有更多订单了</p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div key={`empty-${orderTab}`} className="flex flex-col items-center justify-center py-20"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
              <Package size={40} className="text-ink/[0.12] mb-4" strokeWidth={1} />
              <p className="text-[14px] text-ink/45 font-medium mb-1">暂无{orderTab}订单</p>
              <p className="text-[12px] text-ink/30">去商城逛逛，发现好味道</p>
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => setActiveTab('mall')}
                className="mt-5 px-5 py-2 bg-brand/50 text-ink/65 text-[12px] font-bold rounded-xl">
                去逛逛
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
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
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80" className="w-[56px] h-[56px] rounded-2xl object-cover shadow-elevated" onError={handleImgError} alt="Avatar" />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-white/30 ring-inset" />
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
          className="w-full glass-premium ice-edge rounded-2xl py-3 flex items-center justify-center text-ink text-[13px] font-bold" variants={fadeInUp} custom={1}>
          <Sparkles size={14} className="mr-1.5 text-peach-400" /> 签到领积分
        </motion.button>
      </motion.div>

      <div className="px-5 space-y-3 relative z-10">
        <motion.div className="glass-premium ice-edge rounded-[20px] p-5 flex justify-around items-center" variants={scaleIn} custom={2}>
          {[{ value: '9', label: '优惠券' }, { value: '360', label: '积分' }, { value: '865', label: '余额' }].map((stat, i, arr) => (
            <React.Fragment key={stat.label}>
              <div className="flex flex-col items-center">
                <span className="text-display text-[22px] text-ink tracking-tight">{stat.value}</span>
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
          <ListItem label="为 App 评分" />
          <ListItem label="清理存储" value="876MB" />
          <ListItem label="关于" value="v2.36" isLast />
        </motion.div>
      </div>
    </motion.div>
  );

  // ─── Shell ───────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="w-full max-w-[390px] h-[844px] bg-zesty rounded-[44px] shadow-glass-2xl relative overflow-hidden flex flex-col font-sans ring-[8px] ring-black/[0.08]">
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

        <nav className="absolute bottom-0 w-full h-[78px] glass-frost px-6 pb-6 pt-2 flex justify-between items-center z-50 rounded-b-[40px] border-t border-white/[0.15]">
          <NavItem icon={<Home size={20} />} label="首页" isActive={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <NavItem icon={<Store size={20} />} label="商城" isActive={activeTab === 'mall'} onClick={() => setActiveTab('mall')} />
          <NavItem icon={<MessageSquare size={20} />} label="社区" isActive={activeTab === 'community'} onClick={() => setActiveTab('community')} />
          <NavItem icon={<ShoppingCart size={20} />} label="订单" isActive={activeTab === 'cart'} onClick={() => setActiveTab('cart')}
            badge={cartCount > 0 && activeTab !== 'mall' ? (
              <motion.span key={cartCount} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -top-0.5 -right-1.5 bg-brand/75 text-ink/70 text-[8px] font-bold h-3.5 min-w-[14px] px-1 flex items-center justify-center rounded-full shadow-sm z-20">
                {cartCount > 99 ? '99+' : cartCount}
              </motion.span>
            ) : null} />
          <NavItem icon={<User size={20} />} label="我的" isActive={activeTab === 'mine'} onClick={() => setActiveTab('mine')} />
        </nav>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[100px] h-[4px] bg-ink/[0.07] rounded-full z-50 pointer-events-none" />
      </div>
    </div>
  );
}

// ─── Subcomponents ─────────────────────────────────────────────────
function NavItem({ icon, label, isActive, onClick, badge }) {
  return (
    <div className="flex flex-col items-center cursor-pointer group relative" onClick={onClick}>
      <motion.div className={`p-1.5 rounded-xl relative transition-colors duration-200 ${isActive ? 'text-ink/70' : 'text-ink/40 group-hover:text-ink/60'}`} whileTap={{ scale: 0.88 }}>
        {isActive && (
          <motion.div layoutId="nav-active" className="absolute inset-0 bg-brand/50 rounded-xl" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }} transition={{ type: 'spring', stiffness: 400, damping: 28 }} />
        )}
        <span className="relative z-10">{React.cloneElement(icon, { strokeWidth: isActive ? 2 : 1.5 })}</span>
        {badge}
      </motion.div>
      <span className={`text-[10px] mt-1 transition-colors duration-200 font-semibold ${isActive ? 'text-ink' : 'text-ink/40'}`}>{label}</span>
    </div>
  );
}

function IconItem({ icon, label, onClick }) {
  return (
    <motion.div className="flex flex-col items-center justify-center cursor-pointer" whileTap={{ scale: 0.88 }} onClick={onClick}>
      <div className="w-10 h-10 rounded-xl bg-ink/[0.04] flex items-center justify-center text-ink/45 mb-1.5">{icon}</div>
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
