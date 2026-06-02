/* ─ STILL Pilates ─ main app + tweaks ─ app.jsx ─────────────────────── */

const { useEffect: useAppEffect } = React;

// Scroll-reveal: adds `.in` to any `.reveal` / `.reveal-img` that enters the
// viewport. Uses a scroll/rAF loop rather than IntersectionObserver so it
// fires reliably in headless / off-screen iframe contexts (where IO can stall
// while the tab is not painting).
function useScrollReveal() {
  useAppEffect(() => {
    const margin = 80; // px above viewport bottom where we trigger
    let ticking = false;
    const check = () => {
      ticking = false;
      const vh = window.innerHeight;
      document.querySelectorAll('.reveal:not(.in), .reveal-img:not(.in)').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh - margin && r.bottom > 0) el.classList.add('in');
      });
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(check);
    };
    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    // Re-check after React paints more sections + after fonts load
    const t1 = setTimeout(check, 100);
    const t2 = setTimeout(check, 600);
    const mo = new MutationObserver(onScroll);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      clearTimeout(t1); clearTimeout(t2);
      mo.disconnect();
    };
  }, []);
}

// Apply tweak values as CSS variables / data attributes on :root.
function applyTweaks(t) {
  const r = document.documentElement;
  if (Array.isArray(t.palette) && t.palette.length >= 3) {
    const [ink, bg, accent] = t.palette;
    r.style.setProperty('--c-ink', ink);
    r.style.setProperty('--c-bg', bg);
    r.style.setProperty('--c-accent', accent);
  }
  // Type contrast: 'high' keeps the existing 200/300 light feel.
  // 'med' bumps base weight a touch for legibility on dense projector screens.
  if (t.typeContrast === 'med') {
    r.style.setProperty('--body-weight', '350');
    document.body.style.fontWeight = 350;
  } else {
    document.body.style.fontWeight = 300;
  }
  // Serif italic accents: when off, neutralise .ital spans to sans regular.
  r.classList.toggle('no-serif', !t.showSerifAccent);
  // Section numbers
  r.classList.toggle('no-section-nums', !t.sectionNumbers);
}

// Inject a small style block for the toggleable accents — keeps styles.css
// the canonical source and just layers feature flags on top.
function TweakStyles() {
  return (
    <style>{`
      .no-serif .ital,
      .no-serif .brand-mark,
      .no-serif .price-flag,
      .no-serif .footer-brand,
      .no-serif .form-success h4 {
        font-family: var(--f-sans) !important;
        font-style: normal !important;
        font-weight: 400 !important;
      }
      .no-section-nums .eyebrow .num,
      .no-section-nums .class-num,
      .no-section-nums .instr-num,
      .no-section-nums .price-num:first-of-type,
      .no-section-nums .phil-num,
      .no-section-nums .faq-num,
      .no-section-nums .about-caption .num {
        display: none;
      }
    `}</style>
  );
}

function App() {
  const [t, setTweak] = useTweaks(window.__TWEAK_DEFAULTS);
  useScrollReveal();

  useAppEffect(() => { applyTweaks(t); }, [t]);

  return (
    <>
      <TweakStyles />
      <Nav />
      <main>
        <Hero />
        <About />
        <Classes />
        <Instructors />
        <Gallery />
        <Pricing />
        <Location />
        <FAQ />
        <Contact />
      </main>
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Color palette" />
        <TweakColor
          label="팔레트"
          value={t.palette}
          options={[
            ['#1a1a1a', '#f7f6f3', '#6b7264'],
            ['#1a1a1a', '#ffffff', '#1a1a1a'],
            ['#2a2622', '#f3eee6', '#a07a55'],
            ['#1f2a23', '#f0efe9', '#7d8a6b'],
            ['#0f1d2a', '#f4f4f2', '#33536e'],
            ['#231a1a', '#f5eee9', '#b86b54'],
          ]}
          onChange={(v) => setTweak('palette', v)}
        />

        <TweakSection label="Typography" />
        <TweakRadio
          label="Body weight"
          value={t.typeContrast}
          options={[
            { value: 'high', label: 'Light' },
            { value: 'med',  label: 'Medium' },
          ]}
          onChange={(v) => setTweak('typeContrast', v)}
        />
        <TweakToggle
          label="Serif italic accents"
          value={t.showSerifAccent}
          onChange={(v) => setTweak('showSerifAccent', v)}
        />

        <TweakSection label="Section style" />
        <TweakToggle
          label="번호 표시 (01, 02…)"
          value={t.sectionNumbers}
          onChange={(v) => setTweak('sectionNumbers', v)}
        />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
