/* ─ STILL Pilates ─ section components ─ sections.jsx ───────────────── */

const { useState, useEffect, useRef, useCallback } = React;

// ── Useful primitives ────────────────────────────────────────────────────

function Eyebrow({ num, children }) {
  return (
    <div className="eyebrow">
      <span className="dot" />
      {num && <span className="num">{num}</span>}
      <span>{children}</span>
    </div>
  );
}

function Reveal({ as: As = 'div', delay = 0, className = '', children, ...rest }) {
  return (
    <As
      className={`reveal ${className}`}
      style={{ '--reveal-delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </As>
  );
}

// ── Nav ──────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const items = [
    ['소개', '#about'],
    ['수업', '#classes'],
    ['강사', '#instructors'],
    ['스튜디오', '#gallery'],
    ['가격', '#pricing'],
    ['오시는 길', '#location'],
  ];

  const onLink = (e, href) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`} aria-label="Primary">
        <div className="container nav-inner">
          <a href="#top" className="brand" onClick={(e) => onLink(e, '#top')}>
            <span className="brand-mark">STILL.</span>
            <span className="brand-sub">Pilates Studio</span>
          </a>
          <ul className="nav-links">
            {items.map(([label, href]) => (
              <li key={href}>
                <a href={href} onClick={(e) => onLink(e, href)}>{label}</a>
              </li>
            ))}
          </ul>
          <div className="nav-cta">
            <a className="btn" href="#contact" onClick={(e) => onLink(e, '#contact')}>
              상담 신청 <span aria-hidden="true">→</span>
            </a>
            <button
              className={`nav-mobile-btn ${open ? 'open' : ''}`}
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>
      <div className={`nav-drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        {items.map(([label, href]) => (
          <a key={href} href={href} onClick={(e) => onLink(e, href)}>{label}</a>
        ))}
        <a className="btn" href="#contact" onClick={(e) => onLink(e, '#contact')}>
          상담 신청 <span aria-hidden="true">→</span>
        </a>
      </div>
    </>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section id="top" className="hero container">
      <div className="hero-left">
        <Reveal className="hero-meta">
          <span className="bar" />
          <span>Seoul · Since 2024</span>
        </Reveal>

        <h1>
          <Reveal delay={80}>
            <span className="line-1">움직임의</span>
          </Reveal>
          <Reveal delay={200}>
            <span className="line-2"><span className="ital">중심</span>을 찾다</span>
          </Reveal>
        </h1>

        <Reveal delay={360} className="hero-sub">
          모든 몸은 다릅니다. STILL.은 호흡과 정렬에서 시작하는 정직한 필라테스로
          당신의 가장 편안한 움직임을 찾아갑니다.
        </Reveal>

        <Reveal delay={500} className="hero-cta">
          <a className="btn" href="#contact">
            무료 상담 받기 <span aria-hidden="true">→</span>
          </a>
          <a className="btn-arrow" href="#classes">수업 둘러보기 →</a>
        </Reveal>
      </div>

      <div className="hero-right">
        <span className="hero-tag">Reformer · Mat · Private</span>
        <Reveal className="reveal-img" style={{ width: '100%', height: '100%' }}>
          <image-slot
            id="hero-main"
            shape="rect"
            placeholder="히어로 이미지 — 스튜디오 전경 / 리포머 클래스 추천 (세로형)"
          ></image-slot>
        </Reveal>
      </div>

      <div className="hero-marquee" aria-hidden="true">
        <div className="hero-marquee-inner">
          <span>breath</span><span>balance</span><span>alignment</span>
          <span>core</span><span>posture</span><span>flow</span>
          <span>breath</span><span>balance</span><span>alignment</span>
          <span>core</span><span>posture</span><span>flow</span>
        </div>
      </div>
    </section>
  );
}

// ── About ────────────────────────────────────────────────────────────────

function About() {
  const philosophy = [
    {
      h: '맞춤형 1:1 분석',
      p: '체형 진단과 움직임 분석으로 당신만을 위한 운동 계획을 수립합니다.',
    },
    {
      h: '소수 정예 그룹',
      p: '최대 4인까지의 리포머 그룹 클래스로 한 명 한 명 세심하게 케어합니다.',
    },
    {
      h: '국제 자격 강사진',
      p: 'PMA·BASI·STOTT 등 국제 자격을 보유한 전문 강사진이 함께합니다.',
    },
  ];

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="about-grid">
          <Reveal className="about-img-wrap">
            <image-slot
              id="about-1"
              shape="rect"
              placeholder="스튜디오 분위기 사진 (세로 4:5)"
            ></image-slot>
            <div className="about-caption">
              <span className="num">02</span>
              About · 소개
            </div>
          </Reveal>

          <div className="about-text">
            <Reveal><Eyebrow num="01 — About">소개</Eyebrow></Reveal>
            <Reveal delay={120}>
              <h2 className="h-section">
                정직한 움직임,<br />
                <span className="ital">단단한</span> 하루
              </h2>
            </Reveal>
            <Reveal delay={240} className="lead">
              STILL.은 ‘멈춤’에서 시작합니다. 멈추어 내 몸을 바라보고, 호흡을 가다듬고,
              그 안에서 가장 정직한 움직임을 찾아내는 곳. 화려한 동작보다 바른 정렬,
              빠른 결과보다 오래 가는 변화에 집중합니다.
            </Reveal>

            <div className="philosophy">
              {philosophy.map((p, i) => (
                <Reveal key={i} delay={300 + i * 120} className="phil-item">
                  <span className="phil-num">0{i + 1}</span>
                  <div>
                    <h3 className="phil-h">{p.h}</h3>
                    <p className="phil-p">{p.p}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Classes ──────────────────────────────────────────────────────────────

function Classes() {
  const list = [
    {
      num: '01',
      en: 'Reformer',
      ko: '리포머',
      desc: '스프링의 저항을 이용해 근육의 길이와 정렬을 동시에 다룹니다. 코어 강화와 자세 교정에 가장 효과적인 시그니처 클래스.',
      time: '50분',
      cap: '최대 4인',
      slot: 'class-reformer',
    },
    {
      num: '02',
      en: 'Mat',
      ko: '매트',
      desc: '맨몸과 소도구만으로 진행하는 정통 필라테스. 호흡과 코어 컨트롤의 기본기를 단단히 다질 수 있습니다.',
      time: '50분',
      cap: '최대 6인',
      slot: 'class-mat',
    },
    {
      num: '03',
      en: 'Private',
      ko: '1:1 PT',
      desc: '체형 진단과 목표에 맞춰 완전 개인화된 세션. 통증 관리·재활·자세 교정·체형 변화까지 가장 빠르게.',
      time: '50분',
      cap: '1:1',
      slot: 'class-private',
    },
  ];

  return (
    <section id="classes" className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <Reveal><Eyebrow num="03 — Classes">수업 소개</Eyebrow></Reveal>
            <Reveal delay={120}>
              <h2 className="h-section">
                세 가지 결,<br />
                <span className="ital">하나의</span> 중심.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={240} className="lead">
            STILL.의 모든 수업은 동일한 원칙 위에 있습니다 — 호흡, 정렬, 그리고 코어.
            처음 오신 분께는 1:1 초회 분석 세션을 권장합니다.
          </Reveal>
        </div>

        <div className="classes-grid">
          {list.map((c, i) => (
            <Reveal key={c.num} delay={i * 140} className="class-card">
              <div className="class-img">
                <image-slot
                  id={c.slot}
                  shape="rect"
                  placeholder={`${c.ko} 클래스 이미지 (가로 4:3)`}
                ></image-slot>
              </div>
              <span className="class-num">— {c.num}</span>
              <h3>
                <span className="ital">{c.en}</span>
                <br />{c.ko}
              </h3>
              <p>{c.desc}</p>
              <div className="class-meta">
                <span><b>{c.time}</b> · 회당</span>
                <span><b>{c.cap}</b></span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Instructors ──────────────────────────────────────────────────────────

function Instructors() {
  const list = [
    { name: '김유진', en: 'Yujin Kim', role: 'Head Coach · 대표', tags: ['BASI', '재활 필라테스', '8년차'], slot: 'instr-1' },
    { name: '박서연', en: 'Seoyeon Park', role: 'Senior Instructor',     tags: ['STOTT', '체형 교정', '6년차'], slot: 'instr-2' },
    { name: '이하늘', en: 'Haneul Lee',  role: 'Reformer Instructor',    tags: ['PMA', '코어 강화', '4년차'], slot: 'instr-3' },
    { name: '정민지', en: 'Minji Jung',  role: 'Mat & Pre-natal',        tags: ['Pre-natal', '매트', '5년차'], slot: 'instr-4' },
  ];

  return (
    <section id="instructors" className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <Reveal><Eyebrow num="04 — Team">강사 프로필</Eyebrow></Reveal>
            <Reveal delay={120}>
              <h2 className="h-section">
                <span className="ital">신뢰</span>로 만든<br />
                네 사람의 손길.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={240} className="lead">
            모든 강사는 국제 공인 자격증을 보유하고 있으며, 정기적인 워크숍과
            티칭 리뷰를 통해 늘 최신의 큐잉과 안전 지식을 유지합니다.
          </Reveal>
        </div>

        <div className="instructors-grid">
          {list.map((p, i) => (
            <Reveal key={p.slot} delay={i * 100} className="instr-card">
              <div className="instr-img">
                <image-slot
                  id={p.slot}
                  shape="rect"
                  placeholder={`${p.name} 강사 사진 (세로 3:4)`}
                ></image-slot>
              </div>
              <span className="instr-num">— 0{i + 1}</span>
              <h3 className="instr-name">{p.name}</h3>
              <p className="instr-role">{p.en} · {p.role}</p>
              <div className="instr-tags">
                {p.tags.map((t) => <span key={t} className="instr-tag">{t}</span>)}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Gallery ──────────────────────────────────────────────────────────────

function Gallery() {
  const slots = ['gal-1', 'gal-2', 'gal-3', 'gal-4', 'gal-5', 'gal-6'];
  const captions = ['리포머 룸', '매트 스튜디오', '라운지', '리셉션', '소도구 월', '탈의실'];
  return (
    <section id="gallery" className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <Reveal><Eyebrow num="05 — Studio">시설</Eyebrow></Reveal>
            <Reveal delay={120}>
              <h2 className="h-section">
                머무르고 싶은<br />
                <span className="ital">한 평의</span> 공간.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={240} className="lead">
            42평 전용 공간, 자연광이 가득한 리포머 룸과 별도 매트 스튜디오.
            샤워실과 라운지를 갖춰 운동 전후 시간이 한층 가볍습니다.
          </Reveal>
        </div>

        <div className="gallery">
          {slots.map((s, i) => (
            <Reveal key={s} delay={i * 70} className={`g-${i + 1} reveal-img`}>
              <image-slot
                id={s}
                shape="rect"
                placeholder={`${captions[i]} 사진`}
              ></image-slot>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Pricing ──────────────────────────────────────────────────────────────

function Pricing() {
  const list = [
    {
      num: '01',
      name: 'Mat Group',
      ko: '매트 그룹',
      price: '15',
      unit: '만원',
      per: '10회 · 약 1.5만원/회',
      features: [
        '매트 그룹 클래스 10회',
        '유효기간 8주',
        '대기·예약 우선권 없음',
        '강사 지정 불가',
      ],
    },
    {
      num: '02',
      name: 'Reformer Group',
      ko: '리포머 그룹',
      price: '38',
      unit: '만원',
      per: '10회 · 3.8만원/회',
      flag: 'Most loved',
      featured: true,
      features: [
        '리포머 그룹 클래스 10회 (최대 4인)',
        '유효기간 10주',
        '대기·예약 우선권 제공',
        '월 1회 자세 분석 리포트',
        '강사 지정 가능',
      ],
    },
    {
      num: '03',
      name: 'Private',
      ko: '1:1 개인 레슨',
      price: '85',
      unit: '만원',
      per: '10회 · 8.5만원/회',
      features: [
        '개인 레슨 10회 (50분)',
        '유효기간 12주',
        '초회 체형·움직임 진단 포함',
        '개인 운동 프로그램 PDF 제공',
        '강사 1:1 지정',
      ],
    },
  ];

  return (
    <section id="pricing" className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <Reveal><Eyebrow num="06 — Pricing">가격 · 패키지</Eyebrow></Reveal>
            <Reveal delay={120}>
              <h2 className="h-section">
                필요한 만큼,<br />
                <span className="ital">정직한</span> 가격으로.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={240} className="lead">
            STILL.은 환불 규정과 유효기간을 분명히 안내합니다.
            처음이신 분께는 1:1 체험(3만원)을 권장드립니다.
          </Reveal>
        </div>

        <div className="pricing-grid">
          {list.map((p, i) => (
            <Reveal key={p.num} delay={i * 140}
                    className={`price-card ${p.featured ? 'featured' : ''}`}>
              {p.flag && <span className="price-flag">{p.flag}</span>}
              <span className="price-num">— {p.num}</span>
              <h3 className="price-name">
                {p.name}
                <span className="ko">{p.ko}</span>
              </h3>
              <div className="price-amount">
                <sup>₩</sup>{p.price}
                <span className="price-per">{p.unit}</span>
              </div>
              <div className="price-num">{p.per}</div>
              <ul className="price-features">
                {p.features.map((f, j) => (
                  <li key={j} className="price-feature">{f}</li>
                ))}
              </ul>
              <a className="btn" href="#contact">
                상담 신청 <span aria-hidden="true">→</span>
              </a>
            </Reveal>
          ))}
        </div>
        <p className="pricing-note">
          · 모든 가격은 부가세 포함입니다. · 카드·현금·계좌이체 가능 · 5회권/20회권/30회권은 상담을 통해 안내드립니다.
        </p>
      </div>
    </section>
  );
}

// ── Location ─────────────────────────────────────────────────────────────

function Location() {
  return (
    <section id="location" className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <Reveal><Eyebrow num="07 — Visit">오시는 길</Eyebrow></Reveal>
            <Reveal delay={120}>
              <h2 className="h-section">
                <span className="ital">조용한</span> 골목,<br />
                밝은 2층.
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="location-grid">
          <Reveal className="loc-info">
            <p className="body-text" style={{ marginBottom: 24 }}>
              지하철 6호선 한남역 3번 출구에서 도보 4분.
              조용한 골목 안쪽, 2층 코너에 위치합니다.
            </p>
            <dl>
              <dt>Address</dt>
              <dd><b>서울특별시 용산구 한남대로 12길 24, 2F</b><br />Hannam-dong, Seoul</dd>
              <dt>Hours</dt>
              <dd>
                평일 07:00 — 22:00<br />
                토요일 09:00 — 18:00<br />
                일요일·공휴일 휴무
              </dd>
              <dt>Contact</dt>
              <dd>02 · 0000 · 0000<br />hello@stillpilates.kr</dd>
              <dt>Parking</dt>
              <dd>건물 1층 발렛 (2시간 무료)<br />주변 공영주차장 도보 1분</dd>
            </dl>
          </Reveal>

          <Reveal delay={120} className="map-frame">
            <image-slot
              id="map-img"
              shape="rect"
              placeholder="지도 캡처 또는 약도 (가로 5:4)"
            ></image-slot>
            <div className="map-grid" aria-hidden="true" />
            <div className="map-pin" aria-hidden="true" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ── FAQ ──────────────────────────────────────────────────────────────────

function FAQ() {
  const items = [
    {
      q: '필라테스가 처음인데도 괜찮을까요?',
      a: '네, 오히려 환영합니다. 처음 오신 분께는 1:1 초회 분석 세션을 통해 체형과 움직임을 진단하고, 그에 맞는 수업을 추천드립니다. 그룹 클래스에서도 강사가 충분히 케어해드립니다.',
    },
    {
      q: '운동복은 별도로 준비해야 하나요?',
      a: '편안한 활동복과 양말이면 충분합니다. 미끄럼 방지 양말이 있으면 더 좋습니다. 라커룸과 샤워실, 드라이기·기초 어메니티가 모두 준비되어 있습니다.',
    },
    {
      q: '환불 규정이 궁금합니다.',
      a: '소비자보호법에 따라 사용 전 100%, 사용 시작 후에는 잔여 횟수에 따라 환불해드립니다. 자세한 내용은 상담 시 안내드립니다.',
    },
    {
      q: '수업 변경·취소는 언제까지 가능한가요?',
      a: '수업 시작 3시간 전까지 카카오톡 또는 어플리케이션을 통해 변경·취소가 가능합니다. 그 이후로는 1회 차감됩니다.',
    },
    {
      q: '임신 중에도 수업이 가능한가요?',
      a: '안정기(16주 이후)부터는 산전 필라테스가 가능합니다. 산전 자격을 보유한 강사가 진행하며, 담당의 소견에 따라 진행 여부를 결정합니다.',
    },
  ];

  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <Reveal><Eyebrow num="08 — FAQ">자주 묻는 질문</Eyebrow></Reveal>
            <Reveal delay={120}>
              <h2 className="h-section">
                궁금한 것이<br />
                <span className="ital">있으신가요?</span>
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="faq-list">
          {items.map((it, i) => (
            <div key={i} className={`faq-item ${open === i ? 'open' : ''}`}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}
                      aria-expanded={open === i}>
                <span className="faq-num">0{i + 1}</span>
                <span>{it.q}</span>
                <span className="faq-icon" aria-hidden="true" />
              </button>
              <div className="faq-a">
                <span />
                <p className="body-text">{it.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Contact ──────────────────────────────────────────────────────────────

function Contact() {
  const [form, setForm] = useState({
    name: '', phone: '', class: '리포머 그룹', time: '평일 저녁',
    experience: '처음이에요', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const submitting = useRef(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const chip = (k, v) => (
    <button
      type="button"
      key={v}
      className={`chip ${form[k] === v ? 'on' : ''}`}
      onClick={() => setForm((f) => ({ ...f, [k]: v }))}
    >{v}</button>
  );

  const onSubmit = (e) => {
    e.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    setTimeout(() => { setSubmitted(true); submitting.current = false; }, 600);
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-left">
            <Reveal><Eyebrow num="09 — Contact">상담 신청</Eyebrow></Reveal>
            <Reveal delay={120}>
              <h2 className="h-section">
                먼저 한 번,<br />
                <span className="ital">편하게</span> 이야기.
              </h2>
            </Reveal>
            <Reveal delay={240} className="body-text">
              상담은 모두 무료입니다. 폼을 남겨주시면 영업일 기준
              <strong> 24시간 이내</strong>에 카카오톡 또는 전화로 연락드립니다.
              빠른 답변이 필요하시면 카카오톡 채널이 가장 빠릅니다.
            </Reveal>

            <Reveal delay={360} className="kakao-card">
              <h4>카카오톡으로 바로 문의</h4>
              <p>채널 추가 후 메시지를 남겨주세요. 운영시간 내 평균 5분 내 답변.</p>
              <button className="kakao-btn" type="button">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 3C6.5 3 2 6.6 2 11c0 2.8 1.9 5.3 4.8 6.8L5.6 22l5-3.3c.5 0 .9.1 1.4.1 5.5 0 10-3.6 10-8S17.5 3 12 3z"/>
                </svg>
                @still-pilates 채널 추가
              </button>
            </Reveal>
          </div>

          {!submitted ? (
            <Reveal delay={180} as="form" className="form" onSubmit={onSubmit}>
              <div className="form-row two">
                <div>
                  <label>이름 <span className="req">*</span></label>
                  <input required value={form.name} onChange={set('name')} placeholder="홍길동" />
                </div>
                <div>
                  <label>연락처 <span className="req">*</span></label>
                  <input required type="tel" value={form.phone} onChange={set('phone')}
                         placeholder="010-0000-0000" />
                </div>
              </div>

              <div className="form-row">
                <label>관심 수업</label>
                <div className="chips">
                  {['리포머 그룹', '매트 그룹', '1:1 PT', '아직 모르겠어요'].map((v) => chip('class', v))}
                </div>
              </div>

              <div className="form-row">
                <label>선호 시간대</label>
                <div className="chips">
                  {['평일 오전', '평일 오후', '평일 저녁', '주말'].map((v) => chip('time', v))}
                </div>
              </div>

              <div className="form-row">
                <label>필라테스 경험</label>
                <div className="chips">
                  {['처음이에요', '6개월 미만', '1년 이상', '경력자'].map((v) => chip('experience', v))}
                </div>
              </div>

              <div className="form-row">
                <label>남기실 말씀 (선택)</label>
                <textarea value={form.message} onChange={set('message')}
                          placeholder="궁금하신 점이나 운동 목표가 있다면 적어주세요." />
              </div>

              <button className="form-submit" type="submit">
                상담 신청 보내기 <span aria-hidden="true">→</span>
              </button>
            </Reveal>
          ) : (
            <Reveal as="div" className="form" delay={0}>
              <div className="form-success">
                <h4>Thank you.</h4>
                <p>상담 신청이 정상적으로 접수되었습니다. 곧 연락드릴게요.</p>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Footer ───────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="footer-brand">STILL.</div>
          <div>
            © {new Date().getFullYear()} STILL Pilates Studio. All rights reserved.<br />
            사업자등록번호 000-00-00000 · 대표 김유진
          </div>
        </div>
        <div className="links">
          <a href="#">개인정보 처리방침</a>
          <a href="#">이용약관</a>
          <a href="#">Instagram</a>
          <a href="#">Naver</a>
        </div>
      </div>
    </footer>
  );
}

// Expose to window so app.jsx (separate Babel scope) can use them.
Object.assign(window, { Nav, Hero, About, Classes, Instructors, Gallery, Pricing, Location, FAQ, Contact, Footer });
