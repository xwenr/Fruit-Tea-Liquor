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
// Tuned so five phones + gap/padding stay under ~1100px, letting the
// showcase fit embedded iframes (e.g. the velorah awards viewer, whose
// inner width is ~1152px) without triggering horizontal scroll.
const SCALE = 0.48;
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

const PREVIEW_SCALE = 0.85;
const PREVIEW_VW = Math.round(IFRAME_W * PREVIEW_SCALE);
const PREVIEW_VH = Math.round(IFRAME_H * PREVIEW_SCALE);
const PREVIEW_CSS = [
  'body{background:transparent!important}',
  '#root>div{background:transparent!important}',
  '*{-webkit-font-smoothing:antialiased!important;-moz-osx-font-smoothing:grayscale!important;text-rendering:geometricPrecision!important}',
].join('');

function PreviewOverlay({ screenIndex, visible, boxRef }) {
  const iframeRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const activeTab = useRef(-1);

  useEffect(() => {
    if (!loaded || screenIndex == null) return;
    if (screenIndex === activeTab.current) return;
    activeTab.current = screenIndex;
    try {
      const doc = iframeRef.current?.contentDocument;
      const navItems = doc.querySelectorAll('nav > div');
      if (navItems[screenIndex]) navItems[screenIndex].click();
    } catch (_) {}
  }, [screenIndex, loaded]);

  useEffect(() => {
    if (!visible) return;
    const el = boxRef.current;
    if (!el) return;
    const onMove = (e) => {
      const pad = 30;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      let x = e.clientX + pad;
      let y = e.clientY - PREVIEW_VH / 2;
      if (x + PREVIEW_VW > vw - pad) x = e.clientX - PREVIEW_VW - pad;
      y = Math.max(pad, Math.min(y, vh - PREVIEW_VH - pad));
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
    };
    document.addEventListener('mousemove', onMove, { passive: true });
    return () => document.removeEventListener('mousemove', onMove);
  }, [visible, boxRef]);

  const show = visible && loaded;

  return (
    <div
      ref={boxRef}
      style={{
        position: 'fixed',
        left: -9999,
        top: -9999,
        zIndex: 9999,
        pointerEvents: 'none',
        opacity: show ? 1 : 0,
        transform: show ? 'scale(1)' : 'scale(0.92)',
        transition: 'opacity 0.25s ease, transform 0.25s ease',
      }}
    >
      <div
        style={{
          width: PREVIEW_VW,
          height: PREVIEW_VH,
          overflow: 'hidden',
          borderRadius: 4,
        }}
      >
        <iframe
          ref={iframeRef}
          src={`${import.meta.env.BASE_URL}index.html`}
          scrolling="no"
          tabIndex={-1}
          onLoad={() => {
            try {
              const doc = iframeRef.current.contentDocument;
              const s = doc.createElement('style');
              s.textContent = PREVIEW_CSS;
              doc.head.appendChild(s);
            } catch (_) {}
            setTimeout(() => setLoaded(true), 600);
          }}
          style={{
            display: 'block',
            width: IFRAME_W,
            height: IFRAME_H,
            border: 'none',
            background: 'transparent',
            transformOrigin: 'top left',
            transform: `scale(${PREVIEW_SCALE})`,
            willChange: 'transform',
            backfaceVisibility: 'hidden',
          }}
        />
      </div>
    </div>
  );
}

function PhonePreview({ screen, delay, onHoverStart, onHoverEnd }) {
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
      onMouseEnter={() => onHoverStart?.(screen.index)}
      onMouseLeave={() => onHoverEnd?.()}
      style={{
        opacity: ready ? 1 : 0,
        transform: ready ? 'translateY(0)' : 'translateY(24px)',
        transition: `all 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        cursor: 'pointer',
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
            src={`${import.meta.env.BASE_URL}index.html`}
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
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const leaveTimer = useRef(null);
  const previewBoxRef = useRef(null);

  // "Embed" = this showcase is loaded inside another site's iframe
  // (e.g. the velorah awards viewer). In that case we:
  //   1. disable the large hover preview overlay — it adds a 4th iframe
  //      layer with flaky timing and visually covers the neighbouring
  //      phones inside the smaller viewport,
  //   2. still auto-fit the phone row to the surrounding iframe.
  const [isEmbed, setIsEmbed] = useState(false);
  useEffect(() => {
    try {
      setIsEmbed(window.self !== window.top);
    } catch {
      // cross-origin parent access throws — also means we're embedded
      setIsEmbed(true);
    }
  }, []);

  // Natural row width at SCALE=0.48 + gap-3 + px-4 is ~1100px. When the
  // parent viewport is narrower we shrink the row proportionally and
  // compensate with negative margin-bottom to absorb the layout gap that
  // CSS `transform: scale()` leaves behind.
  useEffect(() => {
    const DESIGN_W = 1100;
    const PHONE_ROW_NATURAL_H = 490;
    const SIDE_SAFETY = 32; // leave breathing room against the iframe edge

    const fit = () => {
      const vw = window.innerWidth;
      const s = Math.min(1, (vw - SIDE_SAFETY) / DESIGN_W);
      const compensate = Math.round((1 - s) * PHONE_ROW_NATURAL_H);
      const root = document.documentElement;
      root.style.setProperty('--phones-scale', s.toFixed(3));
      root.style.setProperty('--phones-compensate', `-${compensate}px`);
    };

    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setAllReady(true), 4500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => () => clearTimeout(leaveTimer.current), []);

  const handleHoverStart = (idx) => {
    if (isEmbed) return;
    clearTimeout(leaveTimer.current);
    setHoveredIdx(idx);
  };

  const handleHoverEnd = () => {
    if (isEmbed) return;
    leaveTimer.current = setTimeout(() => setHoveredIdx(null), 150);
  };

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

        /* Phone row auto-fits its parent viewport via CSS vars set from
           JS (see the resize listener in Showcase). No media-query steps,
           so the scale smoothly tracks any container width. */
        .showcase-row {
          transform: scale(var(--phones-scale, 1));
          transform-origin: top center;
          margin-bottom: var(--phones-compensate, 0px);
          transition: transform 0.15s ease;
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

        <div className="showcase-row flex justify-center items-start gap-3 px-4 pb-12">
          {SCREENS.map((screen, i) => (
            <PhonePreview
              key={screen.index}
              screen={screen}
              delay={0.2 + i * 0.15}
              onHoverStart={handleHoverStart}
              onHoverEnd={handleHoverEnd}
            />
          ))}
        </div>
      </div>

      {!isEmbed && (
        <>
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.06)',
              zIndex: 9998,
              pointerEvents: 'none',
              opacity: hoveredIdx !== null ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}
          />

          <PreviewOverlay
            screenIndex={hoveredIdx}
            visible={hoveredIdx !== null}
            boxRef={previewBoxRef}
          />
        </>
      )}

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
