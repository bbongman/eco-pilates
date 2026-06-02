/* ─ STILL Pilates ─ Mobile sections ─ mobile.jsx ─────────────────── */

const { useState: useS, useEffect: useE, useRef: useR } = React;

function Eyebrow({ num, children }) {
  return (
    <div className="eyebrow">
      <span className="bar" />
      {num && <span className="num">{num}</span>}
      <span>{children}</span>
    </div>
  );
}

function Reveal({ as: As = 'div', delay = 0, className = '', children, ...rest }) {
  return (
    <As
      className={`reveal ${className}`}
      style={{ '--reveal-delay': `${delay}ms`, ...(rest.style || {}) }}
      {...rest}
    >
      {children}
    </As>
  );
}

// ── Top bar + drawer ──────────────────────────────────────────────────

function TopBar({ scrollRoot }) {
  const [open, setOpen] = useS(false);

  const items = [
    ['소개',     '#about',       '01'],
    ['수업',     '#classes',     '02'],
    ['강사',     '#instructors', '03'],
    ['스튜디오', '#gallery',     '04'],
    ['가격',     '#pricing',     '05'],
    ['오시는 길', '#location',   '06'],
    ['자주 묻는 질문', '#faq',   '07'],
  ];

  const goTo = (e, href) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (!el) return;
    // Scroll inside the iOS scroll container if present, else window
    const root = scrollRoot && scrollRoot.current;
    if (root) {
      const top = el.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop - 12;
      root.scrollTo({ top, behavior: 'smooth' });
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <div className="topbar">
        <div className="topbar-inner">
          <a className="brand" href="#top" onClick={(e) => goTo(e, '#top')}>
            <span className="brand-mark">STILL.</span>
            <span className="brand-sub">필라테스</span>
          </a>
          <button
            className={`menu-btn ${open ? 'open' : ''}`}
            aria-label="메뉴 열기"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="ic" />
          </button>
        </div>
      </div>
      <div className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        {items.map(([label, href, num]) => (
          <a key={href} href={href} onClick={(e) => goTo(e, href)}>
            <span>{label}</span>
            <span className="num">— {num}</span>
          </a>
        ))}
        <a className="btn btn-block" href="#contact" onClick={(e) => goTo(e, '#contact')}>
          무료 상담 신청 <span aria-hidden="true">→</span>
        </a>
        <div className="contact-line">
          <strong>02 · 0000 · 0000</strong><br />
          평일 07:00 — 22:00 / 토 09:00 — 18:00
        </div>
      </div>
    </>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section id="top" className="hero">
      <Reveal className="hero-meta">
        <span className="bar" />
        <span>Hannam · Seoul</span>
      </Reveal>

      <h1>
        <Reveal as="span" delay={60} className="l1">움직임의</Reveal>
        <Reveal as="span" delay={180} className="l2">
          <span className="ko-serif">중심</span>을 찾다
        </Reveal>
      </h1>

      <Reveal delay={320} className="hero-sub">
        모든 몸은 다릅니다. STILL.은 호흡과 정렬에서 시작하는<br />
        정직한 필라테스로 당신의 가장 편안한 움직임을 찾아갑니다.
      </Reveal>

      <Reveal delay={420} className="hero-img reveal-img">
        <image-slot
          id="hero-main"
          shape="rect"
          placeholder="히어로 이미지 (세로 4:5)"
        ></image-slot>
        <span className="tag">Reformer · Mat · Private</span>
        <span className="ko-mark">정 · 靜</span>
      </Reveal>

      <Reveal delay={520} className="hero-cta">
        <a className="btn btn-block" href="#contact">
          무료 상담 받기 <span aria-hidden="true">→</span>
        </a>
        <a className="btn btn-ghost btn-block" href="#classes">
          수업 둘러보기
        </a>
      </Reveal>

      <div className="hero-marquee" aria-hidden="true">
        <div className="hero-marquee-inner">
          <span>호흡</span><span>정렬</span><span>코어</span>
          <span>균형</span><span>흐름</span><span>중심</span>
          <span>호흡</span><span>정렬</span><span>코어</span>
          <span>균형</span><span>흐름</span><span>중심</span>
        </div>
      </div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────────

function About() {
  const phil = [
    { h: '맞춤형 1:1 분석', p: '체형 진단과 움직임 분석으로 당신만을 위한 운동 계획을 수립합니다.' },
    { h: '소수 정예 그룹',   p: '최대 4인의 리포머 그룹 클래스로 한 명 한 명 세심하게 케어합니다.' },
    { h: '국제 자격 강사진', p: 'PMA · BASI · STOTT 등 국제 자격을 보유한 전문 강사진이 함께합니다.' },
  ];
  return (
    <section id="about" className="section container">
      <Reveal><Eyebrow num="01">소개</Eyebrow></Reveal>
      <Reveal delay={100}>
        <h2 className="h-section">
          정직한 움직임,<br />
          <span className="ko-serif">단단한</span> 하루
        </h2>
      </Reveal>
      <Reveal delay={200}>
        <p className="lead">
          STILL.은 ‘멈춤’에서 시작합니다. 멈추어 내 몸을 바라보고,
          호흡을 가다듬고, 그 안에서 가장 정직한 움직임을 찾아내는 곳.
          화려한 동작보다 바른 정렬, 빠른 결과보다 오래 가는 변화에 집중합니다.
        </p>
      </Reveal>

      <Reveal delay={280} className="about-img reveal-img">
        <image-slot
          id="about-1"
          shape="rect"
          placeholder="스튜디오 분위기 (세로 4:5)"
        ></image-slot>
        <div className="cap">
          <span className="num">02</span>
          About — 소개
        </div>
      </Reveal>

      <div className="philosophy">
        {phil.map((p, i) => (
          <Reveal key={i} delay={i * 100} className="phil-item">
            <span className="phil-num">0{i + 1}</span>
            <div>
              <h3 className="phil-h">{p.h}</h3>
              <p className="phil-p">{p.p}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ── Classes ───────────────────────────────────────────────────────────

function Classes() {
  const list = [
    {
      num: '01', en: 'Reformer', ko: '리포머',
      desc: '스프링의 저항을 이용해 근육의 길이와 정렬을 동시에 다룹니다. 코어 강화와 자세 교정에 가장 효과적인 시그니처 클래스.',
      time: '50분', cap: '최대 4인', slot: 'class-reformer',
    },
    {
      num: '02', en: 'Mat', ko: '매트',
      desc: '맨몸과 소도구만으로 진행하는 정통 필라테스. 호흡과 코어 컨트롤의 기본기를 단단히 다질 수 있습니다.',
      time: '50분', cap: '최대 6인', slot: 'class-mat',
    },
    {
      num: '03', en: 'Private', ko: '1:1 PT',
      desc: '체형 진단과 목표에 맞춰 완전 개인화된 세션. 통증 관리·재활·자세 교정·체형 변화까지 가장 빠르게.',
      time: '50분', cap: '1:1', slot: 'class-private',
    },
  ];
  return (
    <section id="classes" className="section container">
      <Reveal><Eyebrow num="02">수업 소개</Eyebrow></Reveal>
      <Reveal delay={100}>
        <h2 className="h-section">
          세 가지 결,<br />
          <span className="ko-serif">하나의</span> 중심.
        </h2>
      </Reveal>
      <Reveal delay={200}>
        <p className="lead" style={{ marginTop: 18 }}>
          모든 수업은 동일한 원칙 위에 있습니다 — 호흡, 정렬, 그리고 코어.
        </p>
      </Reveal>

      <div style={{ marginTop: 32 }}>
        {list.map((c, i) => (
          <Reveal key={c.num} delay={i * 100} className="class-card">
            <div className="class-img">
              <image-slot
                id={c.slot}
                shape="rect"
                placeholder={`${c.ko} 클래스 이미지`}
              ></image-slot>
              <span className="num">— {c.num}</span>
            </div>
            <div className="class-body">
              <h3><span className="ko-serif">{c.ko}</span></h3>
              <p>{c.desc}</p>
              <div className="class-meta">
                <span><b>{c.time}</b> · 회당</span>
                <span><b>{c.cap}</b></span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ── Instructors ───────────────────────────────────────────────────────

function Instructors() {
  const list = [
    { name: '김유진', en: 'Yujin Kim',     role: '대표 · Head Coach',     tags: ['BASI', '재활', '8년차'],     slot: 'instr-1' },
    { name: '박서연', en: 'Seoyeon Park',  role: 'Senior Instructor',     tags: ['STOTT', '체형 교정'],         slot: 'instr-2' },
    { name: '이하늘', en: 'Haneul Lee',    role: 'Reformer Instructor',   tags: ['PMA', '코어'],                slot: 'instr-3' },
    { name: '정민지', en: 'Minji Jung',    role: 'Mat & Pre-natal',       tags: ['산전', '매트'],               slot: 'instr-4' },
  ];
  return (
    <section id="instructors" className="section container">
      <Reveal><Eyebrow num="03">강사 프로필</Eyebrow></Reveal>
      <Reveal delay={100}>
        <h2 className="h-section">
          <span className="ko-serif">신뢰</span>로 만든<br />
          네 사람의 손길.
        </h2>
      </Reveal>
      <Reveal delay={200}>
        <p className="lead" style={{ marginTop: 18 }}>
          모든 강사는 국제 공인 자격증을 보유합니다.
          정기 워크숍과 티칭 리뷰로 늘 최신 큐잉과 안전 지식을 유지합니다.
        </p>
      </Reveal>

      <div className="instructors-grid" style={{ marginTop: 32 }}>
        {list.map((p, i) => (
          <Reveal key={p.slot} delay={i * 80} className="instr-card">
            <div className="instr-img reveal-img">
              <image-slot
                id={p.slot}
                shape="rect"
                placeholder={`${p.name} 강사 사진`}
              ></image-slot>
            </div>
            <span className="instr-num">— 0{i + 1}</span>
            <h3 className="instr-name">{p.name}</h3>
            <p className="instr-role">{p.role}<br />{p.en}</p>
            <div className="instr-tags">
              {p.tags.map((t) => <span key={t} className="instr-tag">{t}</span>)}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ── Gallery ───────────────────────────────────────────────────────────

function Gallery() {
  const captions = ['리포머 룸', '매트 스튜디오', '라운지', '리셉션', '소도구 월', '탈의실'];
  return (
    <section id="gallery" className="section container">
      <Reveal><Eyebrow num="04">시설</Eyebrow></Reveal>
      <Reveal delay={100}>
        <h2 className="h-section">
          머무르고 싶은<br />
          <span className="ko-serif">한 평의</span> 공간.
        </h2>
      </Reveal>
      <Reveal delay={200}>
        <p className="lead" style={{ marginTop: 18 }}>
          42평 전용 공간, 자연광 가득한 리포머 룸과 별도 매트 스튜디오.
        </p>
      </Reveal>

      <div className="gallery" style={{ marginTop: 32 }}>
        {captions.map((c, i) => (
          <Reveal key={i} delay={i * 60} className={`g-${i + 1} reveal-img`}>
            <image-slot
              id={`gal-${i + 1}`}
              shape="rect"
              placeholder={`${c} 사진`}
            ></image-slot>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ── Pricing ───────────────────────────────────────────────────────────

function Pricing() {
  const list = [
    {
      num: '01', name: '매트 그룹', en: 'Mat Group',
      meta: ['10회권', '50분 · 최대 6인', '유효 8주'],
      features: ['매트 그룹 클래스 10회', '유효기간 8주', '기본 소도구 사용 가능', '체험 1회 (3만원)'],
    },
    {
      num: '02', name: '리포머 그룹', en: 'Reformer Group',
      flag: '가장 인기', featured: true,
      meta: ['10회권', '50분 · 최대 4인', '유효 10주'],
      features: ['리포머 그룹 클래스 10회', '유효기간 10주', '예약 우선권 제공', '월 1회 자세 분석 리포트', '강사 지정 가능'],
    },
    {
      num: '03', name: '1:1 개인 레슨', en: 'Private',
      meta: ['10회권', '50분 · 1:1', '유효 12주'],
      features: ['개인 레슨 10회 (50분)', '유효기간 12주', '초회 체형·움직임 진단 포함', '운동 프로그램 PDF 제공', '강사 1:1 지정'],
    },
  ];
  return (
    <section id="pricing" className="section container">
      <Reveal><Eyebrow num="05">가격 · 패키지</Eyebrow></Reveal>
      <Reveal delay={100}>
        <h2 className="h-section">
          나에게 맞는<br />
          <span className="ko-serif">한 걸음</span>부터.
        </h2>
      </Reveal>
      <Reveal delay={200}>
        <p className="lead" style={{ marginTop: 18 }}>
          가격은 변동될 수 있어 상담 시 정확히 안내드립니다.<br />
          처음이신 분께는 1:1 체험을 권장드립니다.
        </p>
      </Reveal>

      <div style={{ marginTop: 32 }}>
        {list.map((p, i) => (
          <Reveal key={p.num} delay={i * 100}
                  className={`price-card ${p.featured ? 'featured' : ''}`}>
            {p.flag && <span className="price-flag">{p.flag}</span>}
            <span className="price-num">— {p.num}</span>
            <h3 className="price-name">
              {p.name}
              <span className="ko">{p.en}</span>
            </h3>
            <div className="price-meta">
              {p.meta.map((m, j) => (
                <React.Fragment key={j}>
                  {j > 0 && <span className="dot" />}
                  <span>{m}</span>
                </React.Fragment>
              ))}
            </div>
            <ul className="price-features">
              {p.features.map((f, j) => (
                <li key={j} className="price-feature">{f}</li>
              ))}
            </ul>
            <a className="btn btn-block" href="#contact">
              상담 후 안내 <span aria-hidden="true">→</span>
            </a>
          </Reveal>
        ))}
        <p className="pricing-note">
          · 모든 패키지는 상담 후 정확한 안내를 드립니다.<br />
          · 5회권 / 20회권 / 30회권도 운영합니다.
        </p>
      </div>
    </section>
  );
}

// ── Location ──────────────────────────────────────────────────────────

function LocationSec() {
  return (
    <section id="location" className="section container">
      <Reveal><Eyebrow num="06">오시는 길</Eyebrow></Reveal>
      <Reveal delay={100}>
        <h2 className="h-section">
          <span className="ko-serif">조용한</span> 골목,<br />
          밝은 2층.
        </h2>
      </Reveal>

      <Reveal delay={200} className="map-frame reveal-img" style={{ marginTop: 32 }}>
        <image-slot
          id="map-img"
          shape="rect"
          placeholder="지도 캡처 / 약도"
        ></image-slot>
        <div className="map-grid" aria-hidden="true" />
        <div className="map-pin" aria-hidden="true" />
      </Reveal>

      <Reveal delay={300} className="loc-info">
        <dl>
          <dt>Address</dt>
          <dd><b>서울시 용산구 한남대로 12길 24, 2F</b><br />Hannam-dong, Seoul</dd>
          <dt>Hours</dt>
          <dd>
            평일 07:00 — 22:00<br />
            토 09:00 — 18:00<br />
            일·공휴일 휴무
          </dd>
          <dt>Contact</dt>
          <dd>02 · 0000 · 0000<br />hello@stillpilates.kr</dd>
          <dt>Parking</dt>
          <dd>건물 1층 발렛 (2시간 무료)</dd>
        </dl>
      </Reveal>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────

function FAQ() {
  const items = [
    { q: '필라테스가 처음인데도 괜찮을까요?',
      a: '오히려 환영합니다. 처음 오신 분께는 1:1 초회 분석 세션을 통해 체형과 움직임을 진단하고 그에 맞는 수업을 추천드립니다.' },
    { q: '운동복은 별도로 준비해야 하나요?',
      a: '편안한 활동복과 양말이면 충분합니다. 미끄럼 방지 양말이 있으면 더 좋습니다. 라커룸·샤워실·기초 어메니티가 준비되어 있습니다.' },
    { q: '환불 규정이 궁금합니다.',
      a: '소비자보호법에 따라 사용 전 100%, 사용 시작 후에는 잔여 횟수에 따라 환불해드립니다. 자세한 내용은 상담 시 안내드립니다.' },
    { q: '수업 변경·취소는 언제까지 가능한가요?',
      a: '수업 시작 3시간 전까지 카카오톡 또는 어플리케이션을 통해 변경·취소가 가능합니다. 그 이후로는 1회 차감됩니다.' },
    { q: '임신 중에도 수업이 가능한가요?',
      a: '안정기(16주 이후)부터는 산전 필라테스가 가능합니다. 산전 자격을 보유한 강사가 진행하며, 담당의 소견에 따라 진행 여부를 결정합니다.' },
  ];
  const [open, setOpen] = useS(0);
  return (
    <section id="faq" className="section container">
      <Reveal><Eyebrow num="07">자주 묻는 질문</Eyebrow></Reveal>
      <Reveal delay={100}>
        <h2 className="h-section">
          궁금한 것이<br />
          <span className="ko-serif">있으신가요?</span>
        </h2>
      </Reveal>

      <div className="faq-list" style={{ marginTop: 32 }}>
        {items.map((it, i) => (
          <Reveal key={i} delay={i * 60} className={`faq-item ${open === i ? 'open' : ''}`}>
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
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────

function Contact() {
  const [form, setForm] = useS({
    name: '', phone: '', class: '리포머 그룹', time: '평일 저녁',
    experience: '처음이에요', message: '',
  });
  const [submitted, setSubmitted] = useS(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const chip = (k, v) => (
    <button key={v} type="button"
            className={`chip ${form[k] === v ? 'on' : ''}`}
            onClick={() => setForm((f) => ({ ...f, [k]: v }))}>{v}</button>
  );
  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <Reveal><Eyebrow num="08">상담 신청</Eyebrow></Reveal>
        <Reveal delay={100}>
          <h2 className="h-section">
            먼저 한 번,<br />
            <span className="ko-serif">편하게</span> 이야기.
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="body-text" style={{ marginTop: 18, color: 'rgba(255,255,255,0.75)' }}>
            상담은 모두 무료입니다. 폼을 남겨주시면 영업일 기준
            <strong> 24시간 이내</strong>에 카카오톡 또는 전화로 연락드립니다.
          </p>
        </Reveal>

        <Reveal delay={280} className="kakao-card">
          <h4>카카오톡으로 바로 문의</h4>
          <p>채널 추가 후 메시지를 남겨주세요.<br />운영시간 내 평균 5분 내 답변.</p>
          <button className="kakao-btn" type="button">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 3C6.5 3 2 6.6 2 11c0 2.8 1.9 5.3 4.8 6.8L5.6 22l5-3.3c.5 0 .9.1 1.4.1 5.5 0 10-3.6 10-8S17.5 3 12 3z"/>
            </svg>
            @still-pilates 채널 추가
          </button>
        </Reveal>

        {!submitted ? (
          <Reveal delay={360} as="form" className="form" onSubmit={onSubmit}>
            <div className="form-row">
              <label>이름 <span className="req">*</span></label>
              <input required value={form.name} onChange={set('name')} placeholder="홍길동" />
            </div>
            <div className="form-row">
              <label>연락처 <span className="req">*</span></label>
              <input required type="tel" value={form.phone} onChange={set('phone')}
                     placeholder="010-0000-0000" />
            </div>
            <div className="form-row">
              <label>관심 수업</label>
              <div className="chips">
                {['리포머 그룹', '매트 그룹', '1:1 PT', '모르겠어요'].map((v) => chip('class', v))}
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
          <Reveal as="div" className="form">
            <div className="form-success">
              <h4>감사합니다.</h4>
              <p>상담 신청이 정상적으로 접수되었습니다.<br />곧 연락드릴게요.</p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">STILL.</div>
      <div>
        © {new Date().getFullYear()} STILL Pilates Studio.<br />
        All rights reserved.<br />
        사업자등록번호 000-00-00000 · 대표 김유진
      </div>
      <div className="links">
        <a href="#">개인정보 처리방침</a>
        <a href="#">이용약관</a>
        <a href="#">Instagram</a>
        <a href="#">Naver</a>
      </div>
    </footer>
  );
}

// ── Sticky bottom CTA ────────────────────────────────────────────────

function StickyCTA({ scrollRoot }) {
  const onContact = (e) => {
    e.preventDefault();
    const el = document.querySelector('#contact');
    if (!el) return;
    const root = scrollRoot && scrollRoot.current;
    if (root) {
      const top = el.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop - 12;
      root.scrollTo({ top, behavior: 'smooth' });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className="sticky-cta">
      <a className="cta-call" href="tel:02-0000-0000">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
        전화 상담
      </a>
      <button className="cta-form" type="button" onClick={onContact}>
        무료 상담 신청 <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}

Object.assign(window, {
  TopBar, Hero, About, Classes, Instructors, Gallery,
  Pricing, LocationSec, FAQ, Contact, Footer, StickyCTA,
});
