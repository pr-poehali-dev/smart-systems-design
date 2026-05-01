import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/0db94cce-5718-405d-8290-4ba3fb6628a5/files/703a40d3-5f25-401c-8510-ed3cfefd8904.jpg";
const DASHBOARD_IMAGE = "https://cdn.poehali.dev/projects/0db94cce-5718-405d-8290-4ba3fb6628a5/files/7f07d495-5fa8-4cf6-b873-81397cc8f22d.jpg";
const IRRIGATION_IMAGE = "https://cdn.poehali.dev/projects/0db94cce-5718-405d-8290-4ba3fb6628a5/files/da3ac77f-8d7f-4cfe-92cf-1324ecb24344.jpg";

const ACCENT = "#7c3aed";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const step = end / 60;
        const timer = setInterval(() => {
          start += step;
          if (start >= end) { setVal(end); clearInterval(timer); }
          else setVal(Math.floor(start));
        }, 20);
        obs.disconnect();
      }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end]);
  return <span ref={ref}>{val}{suffix}</span>;
}

function BuildingAnimation({ activeSystem }: { activeSystem: string }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    setStep(0);
    const t = setInterval(() => setStep(s => (s + 1) % 6), 650);
    return () => clearInterval(t);
  }, [activeSystem]);

  const isLight = activeSystem === "lighting";
  const isWater = activeSystem === "watering";
  const isCamera = activeSystem === "cameras";
  const isSecurity = activeSystem === "security";

  return (
    <svg viewBox="0 0 400 340" className="w-full h-full">
      <defs>
        <pattern id="bgGrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0L0 0 0 20" fill="none" stroke="rgba(124,58,237,0.06)" strokeWidth="0.5" />
        </pattern>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id="bldGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1a3e" />
          <stop offset="100%" stopColor="#0d0d20" />
        </linearGradient>
        <linearGradient id="roofGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#14142e" />
          <stop offset="100%" stopColor="#0d0d20" />
        </linearGradient>
        <linearGradient id="accentLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>

      <rect width="400" height="340" fill="url(#bgGrid)" />

      {/* Ground */}
      <rect x="20" y="295" width="360" height="5" rx="2.5" fill="rgba(124,58,237,0.15)" />

      {/* Main building */}
      <rect x="75" y="115" width="250" height="180" rx="3" fill="url(#bldGrad)" stroke="rgba(124,58,237,0.3)" strokeWidth="1.5" />

      {/* Roof */}
      <polygon points="55,115 200,42 345,115" fill="url(#roofGrad)" stroke="rgba(59,130,246,0.4)" strokeWidth="1.5" />

      {/* Windows row 1 */}
      {[100, 148, 196, 244, 292].map((x, i) => {
        const lit = isLight && step > i;
        return (
          <rect key={`w1-${i}`} x={x} y={138} width={26} height={20} rx={2}
            fill={lit ? "rgba(255,235,80,0.75)" : "rgba(124,58,237,0.07)"}
            stroke={lit ? "rgba(255,235,80,0.95)" : "rgba(124,58,237,0.25)"}
            strokeWidth={1}
            style={{ filter: lit ? "drop-shadow(0 0 7px rgba(255,235,80,0.9))" : "none" }}
          />
        );
      })}

      {/* Windows row 2 */}
      {[100, 148, 196, 244, 292].map((x, i) => {
        const lit = isLight && step > i + 1;
        return (
          <rect key={`w2-${i}`} x={x} y={175} width={26} height={20} rx={2}
            fill={lit ? "rgba(255,235,80,0.55)" : "rgba(124,58,237,0.07)"}
            stroke={lit ? "rgba(255,235,80,0.8)" : "rgba(124,58,237,0.25)"}
            strokeWidth={1}
            style={{ filter: lit ? "drop-shadow(0 0 5px rgba(255,235,80,0.7))" : "none" }}
          />
        );
      })}

      {/* Windows row 3 */}
      {[100, 148, 196, 244, 292].map((x, i) => {
        const lit = isLight && step > i + 2;
        return (
          <rect key={`w3-${i}`} x={x} y={212} width={26} height={20} rx={2}
            fill={lit ? "rgba(255,235,80,0.4)" : "rgba(124,58,237,0.07)"}
            stroke={lit ? "rgba(255,235,80,0.65)" : "rgba(124,58,237,0.25)"}
            strokeWidth={1}
          />
        );
      })}

      {/* Door */}
      <rect x={174} y={252} width={52} height={43} rx={3}
        fill="rgba(124,58,237,0.06)" stroke="rgba(124,58,237,0.35)" strokeWidth={1.5} />
      <line x1={200} y1={252} x2={200} y2={295} stroke="rgba(124,58,237,0.2)" strokeWidth={1} />

      {/* ── LIGHTING ── */}
      {isLight && (
        <g filter="url(#glow)">
          <circle cx={200} cy={68} r={step > 0 ? 9 : 0} fill="#7c3aed"
            style={{ transition: "r 0.3s ease" }} />
          {step > 0 && <text x={200} y={34} textAnchor="middle" fill="#7c3aed" fontSize={10} fontFamily="Golos Text">Хаб освещения</text>}
          {step > 0 && <line x1={200} y1={68} x2={113} y2={138} stroke="#7c3aed" strokeWidth={1.5} strokeDasharray="5 3" opacity={0.7} />}
          {step > 1 && <line x1={200} y1={68} x2={161} y2={138} stroke="#7c3aed" strokeWidth={1.5} strokeDasharray="5 3" opacity={0.7} />}
          {step > 2 && <line x1={200} y1={68} x2={209} y2={138} stroke="#7c3aed" strokeWidth={1.5} strokeDasharray="5 3" opacity={0.7} />}
          {step > 3 && <line x1={200} y1={68} x2={257} y2={138} stroke="#7c3aed" strokeWidth={1.5} strokeDasharray="5 3" opacity={0.7} />}
          {step > 4 && <line x1={200} y1={68} x2={305} y2={138} stroke="#7c3aed" strokeWidth={1.5} strokeDasharray="5 3" opacity={0.7} />}
        </g>
      )}

      {/* ── WATERING ── */}
      {isWater && (
        <g filter="url(#glow)">
          {step > 0 && (
            <>
              <circle cx={200} cy={295} r={6} fill="#7c3aed" />
              <line x1={200} y1={295} x2={60} y2={295} stroke="#7c3aed" strokeWidth={2.5} opacity={0.8} />
              <line x1={200} y1={295} x2={340} y2={295} stroke="#7c3aed" strokeWidth={2.5} opacity={0.8} />
            </>
          )}
          {step > 1 && [65, 110, 155].map((x, i) => (
            <g key={`sp-l-${i}`}>
              <line x1={x} y1={295} x2={x} y2={310} stroke="#7c3aed" strokeWidth={1.5} />
              <ellipse cx={x} cy={314} rx={8} ry={4} fill="none" stroke="#7c3aed" strokeWidth={1} />
              {[0, 1, 2].map(d => (
                <circle key={d} cx={x + (d - 1) * 4} cy={318 + d * 3} r={1.5} fill="#7c3aed" opacity={0.55} />
              ))}
            </g>
          ))}
          {step > 2 && [245, 290, 335].map((x, i) => (
            <g key={`sp-r-${i}`}>
              <line x1={x} y1={295} x2={x} y2={310} stroke="#7c3aed" strokeWidth={1.5} />
              <ellipse cx={x} cy={314} rx={8} ry={4} fill="none" stroke="#7c3aed" strokeWidth={1} />
              {[0, 1, 2].map(d => (
                <circle key={d} cx={x + (d - 1) * 4} cy={318 + d * 3} r={1.5} fill="#7c3aed" opacity={0.55} />
              ))}
            </g>
          ))}
          {step > 0 && <text x={200} y={34} textAnchor="middle" fill="#7c3aed" fontSize={10} fontFamily="Golos Text">Система полива</text>}
        </g>
      )}

      {/* ── CAMERAS ── */}
      {isCamera && (
        <g filter="url(#glow)">
          {step > 0 && (
            <g transform="translate(70,107)">
              <rect x={-11} y={-8} width={22} height={15} rx={2} fill="#7c3aed" opacity={0.9} />
              <polygon points="11,-5 22,-9 22,7 11,5" fill="#7c3aed" opacity={0.75} />
              <circle cx={0} cy={0} r={3.5} fill="#0d1525" />
              <line x1={0} y1={7} x2={85} y2={80} stroke="#7c3aed" strokeWidth={1} strokeDasharray="4 3" opacity={0.35} />
              <line x1={0} y1={7} x2={110} y2={25} stroke="#7c3aed" strokeWidth={1} strokeDasharray="4 3" opacity={0.35} />
            </g>
          )}
          {step > 1 && (
            <g transform="translate(330,107)">
              <rect x={-11} y={-8} width={22} height={15} rx={2} fill="#7c3aed" opacity={0.9} />
              <polygon points="-11,-5 -22,-9 -22,7 -11,5" fill="#7c3aed" opacity={0.75} />
              <circle cx={0} cy={0} r={3.5} fill="#0d1525" />
              <line x1={0} y1={7} x2={-85} y2={80} stroke="#7c3aed" strokeWidth={1} strokeDasharray="4 3" opacity={0.35} />
            </g>
          )}
          {step > 2 && (
            <g transform="translate(200,246)">
              <rect x={-11} y={-8} width={22} height={15} rx={2} fill="#ff5533" opacity={0.9} />
              <polygon points="11,-5 22,-9 22,7 11,5" fill="#ff5533" opacity={0.75} />
              <circle cx={0} cy={0} r={3.5} fill="#0d1525" />
            </g>
          )}
          {step > 3 && (
            <polygon
              points="70,107 200,295 330,107"
              fill="rgba(124,58,237,0.06)"
              stroke="rgba(124,58,237,0.15)"
              strokeWidth={1}
            />
          )}
          <text x={200} y={34} textAnchor="middle" fill="#7c3aed" fontSize={10} fontFamily="Golos Text">
            {step > 0 ? "Зоны видеонаблюдения" : ""}
          </text>
        </g>
      )}

      {/* ── SECURITY ── */}
      {isSecurity && (
        <g filter="url(#glow)">
          {step > 0 && (
            <rect x={68} y={108} width={264} height={192} rx={6}
              fill="none" stroke="#7c3aed" strokeWidth={1.8} strokeDasharray="8 4" opacity={0.7} />
          )}
          {step > 1 && [
            { x: 75, y: 115 }, { x: 325, y: 115 },
            { x: 75, y: 200 }, { x: 325, y: 200 },
            { x: 200, y: 295 },
          ].map((pos, i) => (
            <g key={`sec-${i}`}>
              <circle cx={pos.x} cy={pos.y} r={6} fill="#7c3aed" />
              <circle cx={pos.x} cy={pos.y} r={13} fill="none" stroke="#7c3aed" strokeWidth={1} opacity={0.35} />
            </g>
          ))}
          {step > 2 && (
            <>
              <line x1={75} y1={115} x2={325} y2={115} stroke="#ff3333" strokeWidth={1.5} strokeDasharray="5 3" opacity={0.65} />
              <line x1={75} y1={200} x2={325} y2={200} stroke="#ff3333" strokeWidth={1.5} strokeDasharray="5 3" opacity={0.65} />
            </>
          )}
          {step > 3 && (
            <g>
              <circle cx={200} cy={68} r={11} fill="none" stroke="#7c3aed" strokeWidth={2} />
              <circle cx={200} cy={68} r={5} fill="#7c3aed" />
              <text x={200} y={34} textAnchor="middle" fill="#7c3aed" fontSize={10} fontFamily="Golos Text">Охранный периметр</text>
            </g>
          )}
        </g>
      )}

      {/* Live badge */}
      <circle cx={375} cy={18} r={4.5} fill="#7c3aed" style={{ animation: "light-pulse 1.5s ease-in-out infinite" }} />
      <text x={368} y={23} textAnchor="end" fill="rgba(124,58,237,0.6)" fontSize={9} fontFamily="Golos Text">LIVE</text>
    </svg>
  );
}

const NAV_LINKS = [
  { href: "#home", label: "Главная" },
  { href: "#products", label: "Продукты" },
  { href: "#about", label: "О компании" },
  { href: "#portfolio", label: "Портфолио" },
  { href: "#pricing", label: "Цены" },
  { href: "#blog", label: "Блог" },
  { href: "#contacts", label: "Контакты" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass border-b border-white/5 py-3" : "py-5"}`}>
      <div className="container flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[var(--neon)] flex items-center justify-center">
            <span className="text-white font-display font-bold text-sm">SA</span>
          </div>
          <span className="font-display text-xl font-semibold tracking-wide">
            Smart-<span className="neon-text">Assistant</span>.Pro
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map(l => (
            <li key={l.href}>
              <a href={l.href} className="text-sm text-white/60 hover:text-[var(--neon)] transition-colors duration-300 font-body tracking-wide relative group">
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--neon)] group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        <a href="#contacts" className="hidden lg:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-white bg-[var(--neon)] hover:shadow-[0_0_20px_rgba(124,58,237,0.6)] transition-all duration-300">
          Связаться
        </a>

        <button className="lg:hidden text-white/70" onClick={() => setMobileOpen(o => !o)}>
          <Icon name={mobileOpen ? "X" : "Menu"} size={24} />
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden glass border-t border-white/5 mt-3">
          <ul className="container py-4 flex flex-col gap-3">
            {NAV_LINKS.map(l => (
              <li key={l.href}>
                <a href={l.href} className="block py-2 text-white/70 hover:text-[var(--neon)] transition-colors font-body" onClick={() => setMobileOpen(false)}>
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#contacts" onClick={() => setMobileOpen(false)} className="block py-2 px-4 text-center rounded-full text-white bg-[var(--neon)] font-semibold mt-2">
                Связаться
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  const [activeSystem, setActiveSystem] = useState("lighting");
  const systems = [
    { id: "lighting", label: "Освещение", icon: "Lightbulb" as const },
    { id: "watering", label: "Полив", icon: "Droplets" as const },
    { id: "cameras", label: "Камеры", icon: "Camera" as const },
    { id: "security", label: "Безопасность", icon: "Shield" as const },
  ];

  useEffect(() => {
    const ids = systems.map(s => s.id);
    let i = 0;
    const t = setInterval(() => {
      i = (i + 1) % ids.length;
      setActiveSystem(ids[i]);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute top-1/4 -left-32 w-72 h-72 bg-[var(--neon)] opacity-[0.04] rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500 opacity-[0.04] rounded-full blur-3xl" />

      <div className="container relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div style={{ animation: "fade-in 0.8s ease-out forwards" }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full neon-border mb-6 text-xs font-body text-[var(--neon)] tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-[var(--neon)] animate-pulse" />
              Умные системы нового поколения
            </div>

            <h1 className="font-display text-5xl lg:text-7xl font-bold leading-tight mb-6 tracking-wide">
              ВАША УСАДЬБА —<br />
              <span className="neon-text">УМНЕЕ</span><br />
              <span className="text-white/40">ЧЕМ КОГДА-ЛИБО</span>
            </h1>

            <p className="font-body text-white/55 text-lg leading-relaxed mb-8 max-w-lg">
              Проектируем и устанавливаем интеллектуальные системы для дома и бизнеса.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <a href="#products" className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--neon)] text-white font-semibold hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] transition-all duration-300 font-body">
                <Icon name="Zap" size={18} />
                Посмотреть продукты
              </a>
              <a href="#portfolio" className="flex items-center gap-2 px-7 py-3.5 rounded-full neon-border text-white font-semibold hover:bg-white/5 transition-all duration-300 font-body">
                <Icon name="Play" size={18} />
                Наши проекты
              </a>
            </div>

            <div className="flex gap-8">
              {[
                { n: 500, s: "+", label: "Объектов" },
                { n: 8, s: " лет", label: "На рынке" },
                { n: 98, s: "%", label: "Довольных клиентов" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="font-display text-2xl font-bold neon-text">
                    <Counter end={stat.n} suffix={stat.s} />
                  </div>
                  <div className="text-white/40 text-sm font-body">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ animation: "fade-in 1s ease-out 0.3s forwards", opacity: 0 }}>
            <div className="relative">
              <div className="flex gap-2 mb-4 justify-center flex-wrap">
                {systems.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSystem(s.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body transition-all duration-300 ${activeSystem === s.id ? "bg-[var(--neon)] text-white font-semibold" : "neon-border text-white/60 hover:text-white"}`}
                  >
                    <Icon name={s.icon} size={12} />
                    {s.label}
                  </button>
                ))}
              </div>

              <div className="relative neon-border rounded-2xl p-4 glass" style={{ height: "380px" }}>
                <BuildingAnimation activeSystem={activeSystem} />
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[var(--neon)] opacity-50" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[var(--neon)] opacity-50" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[var(--neon)] opacity-50" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[var(--neon)] opacity-50" />
              </div>

              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[var(--neon)] text-white text-xs font-bold px-4 py-1.5 rounded-full font-body whitespace-nowrap">
                Интерактивная схема установки
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const PRODUCTS = [
  {
    icon: "Lightbulb" as const,
    title: "Умное освещение",
    desc: "Автоматическое управление светом по расписанию и датчикам. Экономия до 40% электроэнергии.",
    features: ["Датчики движения", "Управление с телефона", "Сценарии освещения", "Интеграция с умным домом"],
    color: "#ffd700",
    tag: "Популярно",
  },
  {
    icon: "Droplets" as const,
    title: "Умный полив",
    desc: "Капельный полив с датчиками влажности почвы и анализом погоды. Ваш сад всегда зелёный.",
    features: ["Датчики влажности", "Погодный анализ", "Таймеры полива", "Экономия воды до 50%"],
    color: "#7c3aed",
    tag: "Новинка",
  },
  {
    icon: "Camera" as const,
    title: "Умные камеры",
    desc: "Видеонаблюдение с ИИ-распознаванием, автотрекингом и оповещениями. Доступ из любой точки мира.",
    features: ["4K разрешение", "ИИ-аналитика", "Ночное видение", "Запись в облако"],
    color: "#a855f7",
    tag: "Хит продаж",
  },
  {
    icon: "Shield" as const,
    title: "Умная безопасность",
    desc: "Комплексная охранная система с датчиками движения, дыма и тревожными кнопками.",
    features: ["Периметральная защита", "Датчики дыма/газа", "Тревожная кнопка", "Мониторинг 24/7"],
    color: "#ff4444",
    tag: "Надёжно",
  },
];

function ProductCard({ product: p, index }: { product: typeof PRODUCTS[0]; index: number }) {
  const ref = useReveal();
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      className="section-reveal glass rounded-2xl p-6 cursor-pointer transition-all duration-500 border border-white/5 neon-border-hover"
      style={{ animationDelay: `${index * 0.1}s`, transform: hovered ? "translateY(-8px)" : "none" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="inline-block text-xs px-3 py-1 rounded-full mb-4 font-body font-semibold"
        style={{ background: p.color + "1a", color: p.color, border: `1px solid ${p.color}44` }}>
        {p.tag}
      </span>
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
        style={{ background: p.color + "18", boxShadow: hovered ? `0 0 20px ${p.color}40` : "none", transition: "box-shadow 0.3s" }}>
        <Icon name={p.icon} size={24} style={{ color: p.color }} />
      </div>
      <h3 className="font-display text-xl font-semibold mb-3 tracking-wide">{p.title}</h3>
      <p className="text-white/50 text-sm leading-relaxed mb-4 font-body">{p.desc}</p>
      <ul className="space-y-2">
        {p.features.map((f, fi) => (
          <li key={fi} className="flex items-center gap-2 text-sm text-white/60 font-body">
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: p.color }} />
            {f}
          </li>
        ))}
      </ul>
      <div className="mt-5 pt-5 border-t border-white/5">
        <a href="#pricing" className="flex items-center gap-1 text-sm font-semibold transition-colors duration-300"
          style={{ color: p.color }}>
          Узнать цену <Icon name="ArrowRight" size={14} />
        </a>
      </div>
    </div>
  );
}

function ProductsSection() {
  const ref = useReveal();
  return (
    <section id="products" className="py-28 relative">
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div className="container relative">
        <div ref={ref} className="section-reveal text-center mb-16">
          <p className="text-[var(--neon)] font-body text-sm tracking-widest uppercase mb-3">Наши решения</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-wide mb-4">ПРОДУКТЫ</h2>
          <p className="text-white/50 max-w-xl mx-auto font-body">Четыре направления умного дома — всё под одним управлением</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((p, i) => <ProductCard key={i} product={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const ref = useReveal();
  return (
    <section id="about" className="py-28 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-[0.08]"
        style={{ background: "radial-gradient(ellipse at 100% 50%, rgba(124,58,237,0.5) 0%, transparent 70%)" }} />
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div ref={ref} className="section-reveal">
            <p className="text-[var(--neon)] font-body text-sm tracking-widest uppercase mb-3">Кто мы</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-wide mb-6">О КОМПАНИИ</h2>
            <p className="text-white/55 leading-relaxed mb-5 font-body">
              SmartHome Pro — команда инженеров и дизайнеров, которая с 2016 года превращает обычные здания в интеллектуальные пространства. Мы не просто устанавливаем оборудование — мы создаём экосистемы, которые работают за вас.
            </p>
            <p className="text-white/55 leading-relaxed mb-8 font-body">
              Каждый проект — это индивидуальное решение. Мы изучаем объект, проектируем схему и обеспечиваем полное сопровождение после установки.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "Award" as const, text: "Сертифицированный партнёр ведущих брендов" },
                { icon: "Clock" as const, text: "Установка за 1–3 дня" },
                { icon: "Headphones" as const, text: "Поддержка 24/7" },
                { icon: "Wrench" as const, text: "Гарантия 3 года" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl glass border border-white/5">
                  <Icon name={item.icon} size={20} className="text-[var(--neon)] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-white/60 font-body leading-snug">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="relative rounded-2xl overflow-hidden border border-white/5">
              <img src={DASHBOARD_IMAGE} alt="SmartHome dashboard" className="w-full h-80 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 grid grid-cols-3 gap-4">
                {[
                  { n: 500, s: "+", l: "Проектов" },
                  { n: 15, s: "+", l: "Городов" },
                  { n: 50, s: "+", l: "Партнёров" },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="font-display text-2xl font-bold neon-text"><Counter end={s.n} suffix={s.s} /></div>
                    <div className="text-white/50 text-xs font-body">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const PROJECTS = [
  { title: "Жилой комплекс «Северная звезда»", type: "Освещение + Безопасность", rooms: "320 квартир", img: HERO_IMAGE },
  { title: "Офисный центр «Галактика»", type: "Умные камеры + Контроль доступа", rooms: "8 этажей", img: DASHBOARD_IMAGE },
  { title: "Частный коттедж в Подмосковье", type: "Полный комплекс SmartHome", rooms: "450 м²", img: IRRIGATION_IMAGE },
];

function PortfolioCard({ project: p, index }: { project: typeof PROJECTS[0]; index: number }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="section-reveal group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{ animationDelay: `${index * 0.15}s` }}>
      <img src={p.img} alt={p.title} className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-[var(--neon)] transition-colors duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="text-[var(--neon)] text-xs font-body tracking-widest uppercase mb-1">{p.type}</p>
        <h3 className="font-display text-lg font-semibold mb-1">{p.title}</h3>
        <p className="text-white/50 text-sm font-body flex items-center gap-1">
          <Icon name="Building2" size={12} /> {p.rooms}
        </p>
      </div>
    </div>
  );
}

function PortfolioSection() {
  const ref = useReveal();
  return (
    <section id="portfolio" className="py-28">
      <div className="container">
        <div ref={ref} className="section-reveal text-center mb-16">
          <p className="text-[var(--neon)] font-body text-sm tracking-widest uppercase mb-3">Наши работы</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-wide mb-4">ПОРТФОЛИО</h2>
          <p className="text-white/50 max-w-xl mx-auto font-body">Реализованные проекты — от частных домов до крупных комплексов</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {PROJECTS.map((proj, i) => <PortfolioCard key={i} project={proj} index={i} />)}
        </div>
        <div className="text-center mt-10">
          <a href="#contacts" className="inline-flex items-center gap-2 px-7 py-3 rounded-full neon-border text-white/70 hover:text-[var(--neon)] transition-all duration-300 font-body">
            Все проекты <Icon name="ArrowRight" size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

const PLANS = [
  {
    name: "Старт",
    price: "49 900",
    desc: "Для небольших квартир и студий",
    features: ["Умное освещение (до 10 точек)", "2 датчика движения", "Базовое приложение", "Установка включена", "Гарантия 1 год"],
    cta: "Выбрать",
    accent: false,
  },
  {
    name: "Дом",
    price: "149 900",
    desc: "Полный комплект для частного дома",
    features: ["Освещение + Полив", "4 камеры Full HD", "Охранная система", "Голосовое управление", "Гарантия 3 года", "Поддержка 24/7"],
    cta: "Популярный выбор",
    accent: true,
  },
  {
    name: "Бизнес",
    price: "от 299 900",
    desc: "Для офисов и коммерческих объектов",
    features: ["Неограниченные точки", "Камеры 4K + ИИ-аналитика", "Контроль доступа", "Интеграция с БМС", "VIP-поддержка", "Персональный менеджер"],
    cta: "Обсудить проект",
    accent: false,
  },
];

function PricingCard({ plan: p, index }: { plan: typeof PLANS[0]; index: number }) {
  const ref = useReveal();
  return (
    <div ref={ref}
      className={`section-reveal relative rounded-2xl p-7 transition-all duration-500 hover:-translate-y-2 glass border ${p.accent ? "border-[var(--neon)]" : "border-white/5"}`}
      style={{ animationDelay: `${index * 0.1}s`, boxShadow: p.accent ? "0 0 40px rgba(124,58,237,0.15)" : "none" }}>
      {p.accent && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--neon)] text-white text-xs font-bold px-4 py-1 rounded-full font-body">
          РЕКОМЕНДУЕМ
        </div>
      )}
      <p className="font-body text-white/40 text-sm mb-1">{p.name}</p>
      <div className="font-display text-3xl font-bold mb-1">
        {p.price} <span className="text-base font-normal text-white/35">₽</span>
      </div>
      <p className="text-white/40 text-sm mb-6 font-body">{p.desc}</p>
      <ul className="space-y-3 mb-7">
        {p.features.map((f, fi) => (
          <li key={fi} className="flex items-center gap-2 text-sm text-white/65 font-body">
            <Icon name="Check" size={14} className="text-[var(--neon)] flex-shrink-0" />
            {f}
          </li>
        ))}
      </ul>
      <a href="#contacts"
        className={`block text-center py-3 rounded-full font-semibold text-sm transition-all duration-300 font-body ${p.accent ? "bg-[var(--neon)] text-white hover:shadow-[0_0_25px_rgba(124,58,237,0.6)]" : "border border-white/15 text-white hover:border-[var(--neon)] hover:text-[var(--neon)]"}`}>
        {p.cta}
      </a>
    </div>
  );
}

function PricingSection() {
  const ref = useReveal();
  return (
    <section id="pricing" className="py-28 relative">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="container relative">
        <div ref={ref} className="section-reveal text-center mb-16">
          <p className="text-[var(--neon)] font-body text-sm tracking-widest uppercase mb-3">Стоимость</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-wide mb-4">ЦЕНЫ</h2>
          <p className="text-white/50 max-w-xl mx-auto font-body">Прозрачное ценообразование без скрытых платежей</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PLANS.map((plan, i) => <PricingCard key={i} plan={plan} index={i} />)}
        </div>
      </div>
    </section>
  );
}

const POSTS = [
  {
    cat: "Советы",
    title: "Как умное освещение экономит 40% на счётах за электричество",
    date: "15 апреля 2025",
    read: "5 мин",
    img: HERO_IMAGE,
  },
  {
    cat: "Технологии",
    title: "ИИ-камеры в 2025 году: что умеет современное видеонаблюдение",
    date: "2 апреля 2025",
    read: "7 мин",
    img: DASHBOARD_IMAGE,
  },
  {
    cat: "Кейсы",
    title: "Умный полив для загородного дома: опыт с коттеджем 450 м²",
    date: "20 марта 2025",
    read: "4 мин",
    img: IRRIGATION_IMAGE,
  },
];

function BlogCard({ post: p, index }: { post: typeof POSTS[0]; index: number }) {
  const ref = useReveal();
  return (
    <article ref={ref} className="section-reveal group cursor-pointer" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="relative rounded-2xl overflow-hidden mb-4">
        <img src={p.img} alt={p.title} className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span className="absolute top-3 left-3 text-xs px-3 py-1 rounded-full bg-[var(--neon)] text-white font-semibold font-body">{p.cat}</span>
      </div>
      <div className="flex items-center gap-3 text-white/30 text-xs mb-2 font-body">
        <span>{p.date}</span><span>•</span><span>{p.read} чтения</span>
      </div>
      <h3 className="font-display text-lg font-semibold leading-snug group-hover:text-[var(--neon)] transition-colors duration-300 line-clamp-2">
        {p.title}
      </h3>
    </article>
  );
}

function BlogSection() {
  const ref = useReveal();
  return (
    <section id="blog" className="py-28">
      <div className="container">
        <div ref={ref} className="section-reveal flex items-end justify-between mb-16">
          <div>
            <p className="text-[var(--neon)] font-body text-sm tracking-widest uppercase mb-3">Статьи</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-wide">БЛОГ</h2>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 text-[var(--neon)] hover:gap-3 transition-all duration-300 font-body text-sm">
            Все статьи <Icon name="ArrowRight" size={16} />
          </a>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {POSTS.map((post, i) => <BlogCard key={i} post={post} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const ref = useReveal();
  return (
    <section id="contacts" className="py-28 relative">
      <div className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.06) 0%, transparent 70%)" }} />
      <div className="container relative">
        <div ref={ref} className="section-reveal text-center mb-16">
          <p className="text-[var(--neon)] font-body text-sm tracking-widest uppercase mb-3">Обратная связь</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-wide mb-4">КОНТАКТЫ</h2>
          <p className="text-white/50 max-w-xl mx-auto font-body">Расскажите о вашем объекте — рассчитаем стоимость за 24 часа</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div className="glass border border-white/5 rounded-2xl p-8">
            <form className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-white/35 font-body mb-1.5 uppercase tracking-wide">Имя</label>
                  <input type="text" placeholder="Иван" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[var(--neon)] transition-colors font-body placeholder:text-white/20" />
                </div>
                <div>
                  <label className="block text-xs text-white/35 font-body mb-1.5 uppercase tracking-wide">Телефон</label>
                  <input type="tel" placeholder="+7 (___) ___-__-__" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[var(--neon)] transition-colors font-body placeholder:text-white/20" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-white/35 font-body mb-1.5 uppercase tracking-wide">Тип объекта</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/65 text-sm focus:outline-none focus:border-[var(--neon)] transition-colors font-body" style={{ colorScheme: "dark" }}>
                  <option value="">Выберите тип</option>
                  <option>Квартира</option>
                  <option>Частный дом</option>
                  <option>Офис</option>
                  <option>Коммерческий объект</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-white/35 font-body mb-1.5 uppercase tracking-wide">Сообщение</label>
                <textarea rows={4} placeholder="Опишите ваш проект..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[var(--neon)] transition-colors font-body resize-none placeholder:text-white/20" />
              </div>
              <button type="submit" className="w-full py-3.5 rounded-xl bg-[var(--neon)] text-white font-bold text-sm hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-all duration-300 font-body flex items-center justify-center gap-2">
                <Icon name="Send" size={16} />
                Отправить заявку
              </button>
            </form>
          </div>

          <div className="flex flex-col justify-center gap-5">
            {[
              { icon: "Phone" as const, label: "Телефон", value: "+7 (495) 123-45-67", sub: "Пн–Пт 9:00–18:00" },
              { icon: "Mail" as const, label: "Email", value: "info@smarthomepro.ru", sub: "Ответим за 2 часа" },
              { icon: "MapPin" as const, label: "Адрес", value: "Москва, ул. Инновационная, 1", sub: "Выезд по всей России" },
            ].map((c, i) => (
              <div key={i} className="flex items-start gap-4 p-5 glass rounded-2xl neon-border-hover border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-[var(--neon)]/10 flex items-center justify-center flex-shrink-0">
                  <Icon name={c.icon} size={18} className="text-[var(--neon)]" />
                </div>
                <div>
                  <p className="text-white/30 text-xs font-body uppercase tracking-wide mb-1">{c.label}</p>
                  <p className="font-body font-semibold text-white">{c.value}</p>
                  <p className="text-white/40 text-xs font-body mt-0.5">{c.sub}</p>
                </div>
              </div>
            ))}
            <div className="flex gap-3">
              {[
                { icon: "MessageCircle" as const, label: "Telegram" },
                { icon: "Phone" as const, label: "WhatsApp" },
                { icon: "Instagram" as const, label: "Instagram" },
              ].map((s, i) => (
                <a key={i} href="#" className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-white/5 neon-border-hover text-sm text-white/60 hover:text-white transition-all duration-300 font-body">
                  <Icon name={s.icon} size={16} className="text-[var(--neon)]" />
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[var(--neon)] flex items-center justify-center">
              <span className="text-white font-display font-bold text-xs">SH</span>
            </div>
            <span className="font-display text-lg">Smart<span className="neon-text">Home</span> Pro</span>
          </div>
          <p className="text-white/25 text-sm font-body">© 2025 SmartHome Pro. Все права защищены.</p>
          <div className="flex gap-5">
            {["Политика", "Условия", "Карта сайта"].map(l => (
              <a key={l} href="#" className="text-white/30 text-sm hover:text-[var(--neon)] transition-colors font-body">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Index() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ProductsSection />
      <AboutSection />
      <PortfolioSection />
      <PricingSection />
      <BlogSection />
      <ContactSection />
      <Footer />
    </div>
  );
}