import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const SCREENS = [
  { index: 0, label: '首页', desc: '品牌内容与精选推荐' },
  { index: 1, label: '商城', desc: '分类浏览与快速选购' },
  { index: 2, label: '社区', desc: '用户分享与趣味互动' },
  { index: 3, label: '订单', desc: '订单管理与物流追踪' },
  { index: 4, label: '我的', desc: '个人中心与会员服务' },
];

const IFRAME_W = 424;
const IFRAME_H = 880;
const SCALE = 0.6;
const VISUAL_W = Math.round(IFRAME_W * SCALE);
const VISUAL_H = Math.round(IFRAME_H * SCALE);

const PHONE_X = Math.round(((IFRAME_W - 390) / 2) * SCALE);
const PHONE_Y = Math.round(((IFRAME_H - 844) / 2) * SCALE);
const PHONE_W = Math.round(390 * SCALE);
const PHONE_H = Math.round(844 * SCALE);
const PHONE_R = Math.round(44 * SCALE);

const SHADOW = [
  '0 2px 4px rgba(26,30,27,0.025)',
  '0 8px 16px rgba(26,30,27,0.04)',
  '0 24px 48px rgba(26,30,27,0.065)',
  '0 48px 80px rgba(26,30,27,0.045)',
].join(', ');

const INJECT_CSS = [
  'body{background:transparent!important}',
  '#root>div{background:transparent!important}',
  '#root>div>div{box-shadow:0 0 0 0.5px rgba(0,0,0,0.06)!important}',
  '*{-webkit-font-smoothing:antialiased!important;-moz-osx-font-smoothing:grayscale!important;text-rendering:geometricPrecision!important}',
].join('');

function PhonePreview({ screen, delay }) {
  const iframeRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const onLoad = () => {
      setTimeout(() => {
        try {
          const doc = iframe.contentDocument || iframe.contentWindow.document;
          const s = doc.createElement('style');
          s.textContent = INJECT_CSS;
          doc.head.appendChild(s);

          const navItems = doc.querySelectorAll('nav > div');
          if (navItems[screen.index]) navItems[screen.index].click();
        } catch (_) { /* cross-origin fallback */ }
        setTimeout(() => setReady(true), 500);
      }, 1000);
    };

    iframe.addEventListener('load', onLoad);
    return () => iframe.removeEventListener('load', onLoad);
  }, [screen.index]);

  return (
    <div
      className="flex flex-col items-center"
      style={{
        opacity: ready ? 1 : 0,
        transform: ready ? 'translateY(0)' : 'translateY(24px)',
        transition: `all 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      <div className="relative">
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: PHONE_X,
            top: PHONE_Y,
            width: PHONE_W,
            height: PHONE_H,
            borderRadius: PHONE_R,
            boxShadow: SHADOW,
          }}
        />
        <div
          style={{
            position: 'relative',
            width: VISUAL_W,
            height: VISUAL_H,
            overflow: 'hidden',
          }}
        >
          <iframe
            ref={iframeRef}
            src="/index.html"
            title={screen.label}
            scrolling="no"
            style={{
              display: 'block',
              width: IFRAME_W,
              height: IFRAME_H,
              border: 'none',
              background: 'transparent',
              transformOrigin: 'top left',
              transform: `scale(${SCALE})`,
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>

      <div className="text-center mt-5">
        <h3 className="text-[15px] font-bold text-ink tracking-tight">{screen.label}</h3>
        <p className="text-[11px] text-ink/40 mt-1 font-medium">{screen.desc}</p>
      </div>
    </div>
  );
}

function LoadingDot({ delay }) {
  return (
    <span
      className="inline-block w-1.5 h-1.5 rounded-full bg-brand"
      style={{
        animation: 'showcase-pulse 1.4s ease-in-out infinite',
        animationDelay: `${delay}s`,
      }}
    />
  );
}

function Showcase() {
  const [allReady, setAllReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAllReady(true), 4500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: `
          radial-gradient(ellipse 80% 50% at 30% 0%, rgba(209,255,77,0.06) 0%, transparent 60%),
          radial-gradient(ellipse 60% 40% at 70% 100%, rgba(255,241,118,0.04) 0%, transparent 50%),
          #F5F7F1
        `,
      }}
    >
      <style>{`
        @keyframes showcase-pulse {
          0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <header className="text-center pt-10 pb-6 px-6">
        <p className="text-caption text-ink/25 tracking-[0.2em] mb-3">
          PRODUCT SHOWCASE
        </p>
        <h1 className="text-display-cn text-[32px] text-ink leading-tight">
          果茶酒订购小程序
        </h1>
        <p className="text-editorial-cn text-[15px] text-ink/30 mt-2 tracking-[0.08em]">
          产品展示
        </p>
        <div className="flex items-center justify-center gap-2.5 mt-4">
          <span className="w-10 h-[0.5px] bg-ink/8" />
          <span className="w-1.5 h-1.5 rounded-full bg-brand/50" />
          <span className="w-10 h-[0.5px] bg-ink/8" />
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-start">
        {!allReady && (
          <div
            className="flex items-center gap-1.5 mb-6"
            style={{
              opacity: allReady ? 0 : 1,
              transition: 'opacity 0.5s ease',
            }}
          >
            <LoadingDot delay={0} />
            <LoadingDot delay={0.2} />
            <LoadingDot delay={0.4} />
            <span className="text-[11px] text-ink/25 ml-2 font-medium">加载页面中</span>
          </div>
        )}

        <div className="flex justify-center items-start gap-4 px-6 pb-12">
          {SCREENS.map((screen, i) => (
            <PhonePreview
              key={screen.index}
              screen={screen}
              delay={0.2 + i * 0.15}
            />
          ))}
        </div>
      </div>

      <footer className="text-center pb-6">
        <p className="text-[10px] text-ink/15 tracking-[0.08em] font-medium">
          微醺午后 · 果茶酒品牌
        </p>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('showcase')).render(
  <React.StrictMode>
    <Showcase />
  </React.StrictMode>
);
