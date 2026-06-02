/* ─ STILL Pilates ─ Mobile app shell + tweaks ─ mobile-app.jsx ────── */

const { useState: useS2, useEffect: useE2, useRef: useR2 } = React;

// Scroll-reveal — observes the iOS scroll container OR window.
function useScrollReveal(scrollRoot) {
  useE2(() => {
    const root = scrollRoot && scrollRoot.current;
    const margin = 60;
    let ticking = false;
    const check = () => {
      ticking = false;
      const vh = root ? root.clientHeight : window.innerHeight;
      const rootRect = root ? root.getBoundingClientRect() : { top: 0 };
      document.querySelectorAll('.reveal:not(.in), .reveal-img:not(.in)').forEach((el) => {
        const r = el.getBoundingClientRect();
        const relTop = r.top - rootRect.top;
        const relBottom = r.bottom - rootRect.top;
        if (relTop < vh - margin && relBottom > 0) el.classList.add('in');
      });
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(check);
    };
    check();
    const target = root || window;
    target.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    const t1 = setTimeout(check, 100);
    const t2 = setTimeout(check, 600);
    const mo = new MutationObserver(onScroll);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      target.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      clearTimeout(t1); clearTimeout(t2);
      mo.disconnect();
    };
  }, [scrollRoot]);
}

function applyTweaks(t) {
  const r = document.documentElement;
  if (Array.isArray(t.palette) && t.palette.length >= 3) {
    const [ink, bg, accent] = t.palette;
    r.style.setProperty('--c-ink', ink);
    r.style.setProperty('--c-bg', bg);
    r.style.setProperty('--c-accent', accent);
  }
  r.classList.toggle('no-ko-serif', !t.showKoSerif);
  document.body.classList.toggle('unframed', !t.framed);
}

// ── Phone presentation wrapper ──────────────────────────────────────

function PhoneStage({ children, scrollRef, overlay }) {
  const [size, setSize] = useS2({ w: 402, h: 874 });

  useE2(() => {
    const fit = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const baseW = 402, baseH = 874;
      const maxH = Math.min(vh - 80, 1000);
      const maxW = Math.min(vw - 40, 460);
      const ratio = baseW / baseH;
      let h = maxH, w = h * ratio;
      if (w > maxW) { w = maxW; h = w / ratio; }
      setSize({ w: Math.round(w), h: Math.round(h) });
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  return (
    <div className="stage">
      <div className="stage-label" aria-hidden="true">
        <span className="ser">STILL.</span>
        <span>Mobile Web</span>
        <span className="dim">／ 402 × 874</span>
      </div>
      <div className="phone-shell" style={{ width: size.w, height: size.h }}>
        <IOSDevice width={size.w} height={size.h} dark={false}>
          <div className="ios-screen" ref={scrollRef}>
            {children}
          </div>
        </IOSDevice>
        {overlay && (
          <div className="sticky-host-framed">{overlay}</div>
        )}
      </div>
      <div className="stage-foot" aria-hidden="true">
        iPhone 16 Pro · 402 pt · 컬러: 흑백 모노톤 · 폰트: Pretendard + 고운바탕
      </div>
    </div>
  );
}

// ── App ─────────────────────────────────────────────────────────────

function App() {
  const [t, setTweak] = useTweaks(window.__TWEAK_DEFAULTS);
  const scrollRef = useR2(null);

  useE2(() => { applyTweaks(t); }, [t]);
  useScrollReveal(scrollRef);

  const AppBody = (
    <div className="app">
      <TopBar scrollRoot={scrollRef} />
      <Hero />
      <About />
      <Classes />
      <Instructors />
      <Gallery />
      <Pricing />
      <LocationSec />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );

  const sticky = t.stickyCTA ? <StickyCTA scrollRoot={scrollRef} /> : null;

  return (
    <>
      {t.framed ? (
        <PhoneStage scrollRef={scrollRef} overlay={sticky}>
          {AppBody}
        </PhoneStage>
      ) : (
        <div className="stage">
          {AppBody}
          {sticky && <div className="sticky-host-fixed">{sticky}</div>}
        </div>
      )}

      <TweaksPanel title="Tweaks">
        <TweakSection label="Presentation" />
        <TweakToggle
          label="아이폰 프레임"
          value={t.framed}
          onChange={(v) => setTweak('framed', v)}
        />
        <TweakToggle
          label="하단 고정 CTA"
          value={t.stickyCTA}
          onChange={(v) => setTweak('stickyCTA', v)}
        />

        <TweakSection label="Color palette" />
        <TweakColor
          label="팔레트"
          value={t.palette}
          options={[
            ['#1a1a1a', '#ffffff', '#1a1a1a'],
            ['#1a1a1a', '#f7f6f3', '#6b7264'],
            ['#2a2622', '#f3eee6', '#a07a55'],
            ['#1f2a23', '#f0efe9', '#7d8a6b'],
            ['#0f1d2a', '#f4f4f2', '#33536e'],
            ['#231a1a', '#f5eee9', '#b86b54'],
          ]}
          onChange={(v) => setTweak('palette', v)}
        />

        <TweakSection label="Typography" />
        <TweakToggle
          label="한국 서체 액센트 (고운바탕)"
          value={t.showKoSerif}
          onChange={(v) => setTweak('showKoSerif', v)}
        />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
