import { useState, useEffect, useRef } from "react";

// ── Constants ────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "ADUs", href: "#adus" },
  { label: "Resources", href: "#resources" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const ADU_TYPES = [
  {
    id: 1,
    title: "Detached ADU",
    tag: "Most Versatile",
    desc: "A fully independent structure in your backyard — its own entrance, kitchen, and bath. Maximum privacy for rentals, guests, or multigenerational living.",
    accent: "#C9A96E",
  },
  {
    id: 2,
    title: "Garage Conversion",
    tag: "Best Value",
    desc: "Transform an underutilized garage into a permitted living space. One of the most cost-effective paths to an ADU with minimal new construction.",
    accent: "#E8DCC8",
  },
  {
    id: 3,
    title: "Junior ADU",
    tag: "Fastest Approval",
    desc: "A self-contained unit within your existing home footprint — typically a converted bedroom suite. Streamlined permitting under California JADU law.",
    accent: "#C9A96E",
  },
  {
    id: 4,
    title: "Attached ADU",
    tag: "Seamless Addition",
    desc: "An addition built onto your existing home that functions as a separate dwelling. Ideal when backyard space is limited but lot coverage allows expansion.",
    accent: "#E8DCC8",
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Feasibility Review",
    desc: "We assess your lot, zoning, setbacks, and utility connections to determine what ADU type and size is achievable — before you spend a dollar on design.",
  },
  {
    number: "02",
    title: "Design & Planning",
    desc: "Schematic design through construction documents. We produce permit-ready drawings tailored to your municipality's specific requirements.",
  },
  {
    number: "03",
    title: "Permit Navigation",
    desc: "We manage the permit submission, respond to correction letters, and coordinate with the city on your behalf — keeping the process moving.",
  },
  {
    number: "04",
    title: "Construction Support",
    desc: "We stay involved during construction to answer RFIs, review substitutions, and ensure the built result matches the permitted design.",
  },
];

const RESOURCES = [
  {
    number: "01",
    title: "ADU Permit Process",
    desc: "A plain-language breakdown of the typical permit pathway — from pre-application through final inspection — so you know what to expect at every stage.",
    link: "Read the Guide →",
  },
  {
    number: "02",
    title: "Size & Setback Rules",
    desc: "Key regulations governing ADU dimensions, height limits, and minimum distances from property lines. Updated for current state law.",
    link: "View Regulations →",
  },
  {
    number: "03",
    title: "Cost Estimator",
    desc: "Rough cost ranges for each ADU type — covering design, permitting, and construction — to help you plan your budget realistically.",
    link: "Estimate Costs →",
  },
  {
    number: "04",
    title: "Financing Options",
    desc: "An overview of ADU financing paths: HELOCs, construction loans, ADU-specific programs, and state and local grant opportunities.",
    link: "Explore Options →",
  },
];

const TEAM = [
  { name: "Principal Architect", role: "ADU Design & Permitting", exp: "Licensed Architect" },
  { name: "Permit Specialist", role: "Municipal Coordination", exp: "10+ yrs" },
  { name: "Project Designer", role: "Construction Documents", exp: "Residential Focus" },
];

const STATS = [
  ["120+", "ADUs Permitted"],
  ["98%", "Approval Rate"],
  ["15+", "Cities Served"],
];

// ── Hooks ────────────────────────────────────────────────────────────────────

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible] as const;
}

// ── Components ───────────────────────────────────────────────────────────────

function RevealSection({
  children,
  style = {},
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  delay?: number;
  className?: string;
}) {
  const [ref, visible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function AxionWebsite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on nav link click
  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const px = isMobile ? "24px" : "72px";
  const sectionPy = isMobile ? "80px" : "120px";

  return (
    <div
      style={{
        background: "#0A0907",
        color: "#F5F0E8",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #0A0907; }
        ::-webkit-scrollbar-thumb { background: #C9A96E; }
        .df { font-family: 'Cormorant Garamond', Georgia, serif; }
        .bf { font-family: 'Montserrat', sans-serif; }
        .grain {
          position: fixed; inset: 0; opacity: 0.03; pointer-events: none; z-index: 999;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        .nav-link::after {
          content: ''; display: block; height: 1px;
          background: #C9A96E; transform: scaleX(0);
          transition: transform 0.3s ease; transform-origin: left;
        }
        .nav-link:hover::after { transform: scaleX(1); }
        .btn-gold {
          padding: 14px 36px; background: #C9A96E; color: #0A0907;
          border: none; font-family: 'Montserrat', sans-serif;
          font-size: 10px; letter-spacing: 0.3em; font-weight: 600;
          cursor: pointer; transition: background 0.3s;
        }
        .btn-gold:hover { background: #E8DCC8; }
        .btn-outline {
          padding: 14px 36px; background: transparent; color: #C9A96E;
          border: 1px solid #C9A96E; font-family: 'Montserrat', sans-serif;
          font-size: 10px; letter-spacing: 0.3em; font-weight: 500;
          cursor: pointer; transition: all 0.3s;
        }
        .btn-outline:hover { background: #C9A96E; color: #0A0907; }
        .adu-card {
          padding: 40px 36px; border: 1px solid rgba(201,169,110,0.15);
          background: #0f0d0a; position: relative; overflow: hidden;
          transition: border-color 0.3s, transform 0.3s;
        }
        .adu-card:hover { border-color: rgba(201,169,110,0.5); transform: translateY(-4px); }
        .resource-card {
          padding: 40px 36px; border-top: 1px solid rgba(201,169,110,0.15);
          position: relative; transition: background 0.3s;
        }
        .resource-card:hover { background: rgba(201,169,110,0.04); }
        input, textarea {
          width: 100%; padding: 14px 0; background: transparent;
          border: none; border-bottom: 1px solid rgba(201,169,110,0.3);
          color: #F5F0E8; font-family: 'Montserrat', sans-serif;
          font-size: 13px; font-weight: 300; outline: none;
          letter-spacing: 0.05em; transition: border-color 0.3s;
        }
        input:focus, textarea:focus { border-bottom-color: #C9A96E; }
        input::placeholder, textarea::placeholder { color: #5A5040; }
        textarea { resize: none; }
        .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .four-col { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; }
        @media (max-width: 900px) {
          .two-col { grid-template-columns: 1fr; }
          .four-col { grid-template-columns: 1fr 1fr; }
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 36px; }
        }
        @media (max-width: 600px) {
          .four-col { grid-template-columns: 1fr; }
          .footer-grid { grid-template-columns: 1fr; gap: 28px; }
        }
      `}</style>

      <div className="grain" />

      {/* ── NAVBAR ─────────────────────────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          padding: `0 ${px}`,
          height: scrolled ? "60px" : "76px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: scrolled || menuOpen ? "rgba(10,9,7,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,169,110,0.12)" : "none",
          transition: "all 0.4s ease",
        }}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          style={{ textDecoration: "none", lineHeight: 1 }}
        >
          <div className="df" style={{ fontSize: "20px", fontWeight: 300, letterSpacing: "0.18em", color: "#F5F0E8" }}>
            AXION
          </div>
          <div className="bf" style={{ fontSize: "8px", letterSpacing: "0.45em", color: "#C9A96E", fontWeight: 500 }}>
            DESIGN STUDIO
          </div>
        </a>

        {/* Desktop nav */}
        {!isMobile && (
          <div className="bf" style={{ display: "flex", gap: "36px", alignItems: "center" }}>
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="nav-link"
                onClick={(e) => { e.preventDefault(); handleNavClick(l.href); }}
                style={{
                  fontSize: "10px", letterSpacing: "0.22em", fontWeight: 500,
                  textDecoration: "none", color: "#C8BFB0",
                }}
              >
                {l.label.toUpperCase()}
              </a>
            ))}
            <button className="btn-outline" style={{ padding: "9px 22px", fontSize: "9px" }}
              onClick={() => handleNavClick("#contact")}>
              FREE CONSULT
            </button>
          </div>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen((v) => !v)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              display: "flex", flexDirection: "column", gap: "5px", padding: "4px",
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block", width: "24px", height: "1px",
                  background: "#C9A96E",
                  transform:
                    menuOpen && i === 0 ? "rotate(45deg) translate(4px, 4px)" :
                    menuOpen && i === 1 ? "scaleX(0)" :
                    menuOpen && i === 2 ? "rotate(-45deg) translate(4px, -4px)" : "none",
                  transition: "transform 0.3s",
                }}
              />
            ))}
          </button>
        )}
      </nav>

      {/* Mobile menu drawer */}
      {isMobile && (
        <div
          style={{
            position: "fixed", top: "60px", left: 0, right: 0, zIndex: 99,
            background: "rgba(10,9,7,0.98)", padding: "32px 24px",
            display: "flex", flexDirection: "column", gap: "28px",
            transform: menuOpen ? "translateY(0)" : "translateY(-110%)",
            transition: "transform 0.4s ease",
            borderBottom: "1px solid rgba(201,169,110,0.15)",
          }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="bf"
              onClick={(e) => { e.preventDefault(); handleNavClick(l.href); }}
              style={{
                fontSize: "12px", letterSpacing: "0.3em", fontWeight: 500,
                textDecoration: "none", color: "#D4CCBE",
              }}
            >
              {l.label.toUpperCase()}
            </a>
          ))}
          <button className="btn-gold" style={{ alignSelf: "flex-start", marginTop: "8px" }}
            onClick={() => handleNavClick("#contact")}>
            FREE CONSULT
          </button>
        </div>
      )}

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section
        style={{
          minHeight: "100vh", position: "relative",
          display: "flex", alignItems: "flex-end", overflow: "hidden",
        }}
      >
        {/* Background */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, #1c1812 0%, #2a2016 30%, #0f0d0a 70%, #0A0907 100%)",
        }} />

        {/* Architectural grid lines */}
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.07 }}
          viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"
        >
          {[...Array(10)].map((_, i) => (
            <line key={`v${i}`} x1={i * 160} y1="0" x2={i * 160} y2="900" stroke="#C9A96E" strokeWidth="0.5" />
          ))}
          {[...Array(7)].map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 130} x2="1440" y2={i * 130} stroke="#C9A96E" strokeWidth="0.5" />
          ))}
          {/* House/ADU silhouette lines */}
          <rect x="180" y="200" width="320" height="480" fill="none" stroke="#C9A96E" strokeWidth="1" />
          <polyline points="160,200 340,80 520,200" fill="none" stroke="#C9A96E" strokeWidth="1" />
          <rect x="260" y="420" width="80" height="120" fill="none" stroke="#C9A96E" strokeWidth="0.6" />
          <rect x="200" y="300" width="80" height="80" fill="none" stroke="#C9A96E" strokeWidth="0.6" />
          <rect x="420" y="300" width="60" height="60" fill="none" stroke="#C9A96E" strokeWidth="0.6" />
          {/* Background ADU */}
          <rect x="900" y="300" width="200" height="280" fill="none" stroke="#C9A96E" strokeWidth="0.7" />
          <polyline points="885,300 1000,200 1115,300" fill="none" stroke="#C9A96E" strokeWidth="0.7" />
          <rect x="950" y="430" width="50" height="80" fill="none" stroke="#C9A96E" strokeWidth="0.5" />
          {/* Connecting path */}
          <line x1="500" y1="680" x2="900" y2="580" stroke="#C9A96E" strokeWidth="0.4" strokeDasharray="8 6" />
        </svg>

        {/* Gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(10,9,7,0.97) 0%, rgba(10,9,7,0.4) 55%, transparent 100%)",
        }} />

        {/* Hero content */}
        <div
          style={{
            position: "relative", zIndex: 2,
            padding: isMobile ? `0 ${px} 60px` : `0 ${px} 80px`,
            width: "100%",
          }}
        >
          <div
            className="bf"
            style={{
              fontSize: "9px", letterSpacing: "0.45em", color: "#C9A96E",
              marginBottom: "20px", fontWeight: 500,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.8s ease 0.2s",
            }}
          >
            ADU DESIGN · PERMITTING · PLACE-MAKING
          </div>

          <h1
            className="df"
            style={{
              fontSize: isMobile ? "clamp(44px, 12vw, 64px)" : "clamp(56px, 7vw, 92px)",
              fontWeight: 300, lineHeight: 0.92, marginBottom: "28px",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(36px)",
              transition: "all 1s ease 0.4s",
            }}
          >
            <span style={{ display: "block" }}>Your property.</span>
            <span style={{ display: "block", fontStyle: "italic", color: "#C9A96E" }}>More potential.</span>
            <span style={{ display: "block" }}>Permitted right.</span>
          </h1>

          <p
            className="bf"
            style={{
              fontSize: isMobile ? "13px" : "14px", lineHeight: 1.85, color: "#A09880",
              maxWidth: "460px", marginBottom: "44px", fontWeight: 300,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s ease 0.7s",
            }}
          >
            Axion Design Studio specializes in accessory dwelling unit design and
            permit navigation — helping homeowners unlock the full value of their
            property with confidence.
          </p>

          <div
            style={{
              display: "flex", gap: "16px", flexWrap: "wrap",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s ease 0.9s",
            }}
          >
            <button className="btn-gold" onClick={() => handleNavClick("#contact")}>
              FREE CONSULTATION
            </button>
            <button className="btn-outline" onClick={() => handleNavClick("#adus")}>
              EXPLORE ADUS
            </button>
          </div>

          {/* Stats row */}
          <div
            style={{
              display: "flex", gap: isMobile ? "32px" : "56px", marginTop: "56px", flexWrap: "wrap",
              opacity: heroVisible ? 1 : 0,
              transition: "all 0.8s ease 1.1s",
            }}
          >
            {STATS.map(([num, label]) => (
              <div key={label}>
                <div className="df" style={{ fontSize: isMobile ? "28px" : "36px", fontWeight: 300, color: "#C9A96E" }}>
                  {num}
                </div>
                <div className="bf" style={{ fontSize: "9px", letterSpacing: "0.28em", color: "#6A6050", fontWeight: 500 }}>
                  {label.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator — desktop only */}
        {!isMobile && (
          <div style={{
            position: "absolute", right: "48px", top: "50%",
            transform: "translateY(-50%)", display: "flex",
            flexDirection: "column", alignItems: "center", gap: "10px", opacity: 0.45,
          }}>
            <div className="bf" style={{
              fontSize: "8px", letterSpacing: "0.35em", color: "#C9A96E",
              writingMode: "vertical-rl", transform: "rotate(180deg)",
            }}>
              SCROLL
            </div>
            <div style={{ width: "1px", height: "56px", background: "linear-gradient(to bottom, transparent, #C9A96E)" }} />
          </div>
        )}
      </section>

      {/* ── GOLD BAR ───────────────────────────────────────────────────────── */}
      <div style={{ background: "#C9A96E", padding: "13px 0", overflow: "hidden" }}>
        <span className="bf" style={{
          fontSize: "9px", letterSpacing: "0.38em", color: "#0A0907",
          fontWeight: 600, whiteSpace: "nowrap",
          display: "inline-flex", gap: "56px", padding: "0 56px",
        }}>
          {["DETACHED ADU", "GARAGE CONVERSION", "JUNIOR ADU", "ATTACHED ADU",
            "PERMIT NAVIGATION", "CONSTRUCTION DOCUMENTS", "FEASIBILITY REVIEW",
            "DETACHED ADU", "GARAGE CONVERSION", "JUNIOR ADU", "ATTACHED ADU"].map((s, i) => (
            <span key={i}>{s}</span>
          ))}
        </span>
      </div>

      {/* ── ADUs SECTION ───────────────────────────────────────────────────── */}
      <section id="adus" style={{ padding: `${sectionPy} ${px}` }}>
        <RevealSection>
          <div className="bf" style={{ fontSize: "9px", letterSpacing: "0.42em", color: "#C9A96E", marginBottom: "14px", fontWeight: 500 }}>
            WHAT WE BUILD
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "20px", marginBottom: "56px" }}>
            <h2 className="df" style={{ fontSize: isMobile ? "clamp(34px, 10vw, 52px)" : "clamp(38px, 5vw, 64px)", fontWeight: 300, lineHeight: 1 }}>
              ADU <em style={{ color: "#C9A96E" }}>Types</em>
            </h2>
            <p className="bf" style={{ fontSize: "13px", lineHeight: 1.75, color: "#7A7060", fontWeight: 300, maxWidth: "380px" }}>
              Every property is different. We match you with the ADU type that fits your lot, budget, and goals.
            </p>
          </div>
        </RevealSection>

        {/* ADU type cards */}
        <div className="two-col">
          {ADU_TYPES.map((adu, i) => (
            <RevealSection key={adu.id} delay={i * 80}>
              <div className="adu-card">
                {/* Ghost number */}
                <div className="df" style={{
                  position: "absolute", top: "12px", right: "20px",
                  fontSize: "72px", fontWeight: 300,
                  color: "rgba(201,169,110,0.05)", lineHeight: 1, userSelect: "none",
                }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="bf" style={{
                  display: "inline-block", fontSize: "8px", letterSpacing: "0.3em",
                  color: "#0A0907", background: adu.accent, padding: "5px 12px",
                  fontWeight: 600, marginBottom: "24px",
                }}>
                  {adu.tag.toUpperCase()}
                </div>
                <h3 className="df" style={{ fontSize: "28px", fontWeight: 400, color: "#F5F0E8", marginBottom: "14px" }}>
                  {adu.title}
                </h3>
                <p className="bf" style={{ fontSize: "13px", lineHeight: 1.8, color: "#7A7060", fontWeight: 300, marginBottom: "24px" }}>
                  {adu.desc}
                </p>
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
                  className="bf"
                  style={{
                    fontSize: "9px", letterSpacing: "0.22em", color: adu.accent,
                    textDecoration: "none", fontWeight: 500,
                    borderBottom: `1px solid ${adu.accent}`, paddingBottom: "2px",
                  }}
                >
                  DISCUSS THIS TYPE →
                </a>
              </div>
            </RevealSection>
          ))}
        </div>

        {/* Process steps */}
        <RevealSection style={{ marginTop: "80px" }}>
          <div className="bf" style={{ fontSize: "9px", letterSpacing: "0.42em", color: "#C9A96E", marginBottom: "14px", fontWeight: 500 }}>
            HOW IT WORKS
          </div>
          <h2 className="df" style={{ fontSize: isMobile ? "clamp(30px, 9vw, 48px)" : "clamp(34px, 4.5vw, 56px)", fontWeight: 300, lineHeight: 1, marginBottom: "48px" }}>
            Our <em style={{ color: "#C9A96E" }}>Process</em>
          </h2>
        </RevealSection>

        <div className="two-col" style={{ borderTop: "1px solid rgba(201,169,110,0.12)" }}>
          {PROCESS_STEPS.map((step, i) => (
            <RevealSection
              key={step.number}
              delay={i * 80}
              style={{
                padding: "40px 0 40px",
                borderBottom: "1px solid rgba(201,169,110,0.12)",
                borderLeft: !isMobile && i % 2 === 1 ? "1px solid rgba(201,169,110,0.12)" : "none",
                paddingLeft: !isMobile && i % 2 === 1 ? "48px" : "0",
                paddingRight: !isMobile && i % 2 === 0 ? "48px" : "0",
              }}
            >
              <div className="bf" style={{ fontSize: "9px", letterSpacing: "0.4em", color: "#C9A96E", marginBottom: "16px", fontWeight: 500 }}>
                {step.number}
              </div>
              <h3 className="df" style={{ fontSize: "24px", fontWeight: 400, color: "#F5F0E8", marginBottom: "12px" }}>
                {step.title}
              </h3>
              <p className="bf" style={{ fontSize: "13px", lineHeight: 1.8, color: "#7A7060", fontWeight: 300 }}>
                {step.desc}
              </p>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ── RESOURCES SECTION ──────────────────────────────────────────────── */}
      <section
        id="resources"
        style={{
          padding: `${sectionPy} ${px}`,
          background: "#0f0d0a",
          borderTop: "1px solid rgba(201,169,110,0.1)",
        }}
      >
        <RevealSection>
          <div className="bf" style={{ fontSize: "9px", letterSpacing: "0.42em", color: "#C9A96E", marginBottom: "14px", fontWeight: 500 }}>
            HOMEOWNER RESOURCES
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "20px", marginBottom: "56px" }}>
            <h2 className="df" style={{ fontSize: isMobile ? "clamp(34px, 10vw, 52px)" : "clamp(38px, 5vw, 64px)", fontWeight: 300, lineHeight: 1 }}>
              Know before<br /><em style={{ color: "#C9A96E" }}>you build.</em>
            </h2>
            <p className="bf" style={{ fontSize: "13px", lineHeight: 1.75, color: "#7A7060", fontWeight: 300, maxWidth: "360px" }}>
              Understanding the process — permits, costs, and regulations — is the first step toward a successful ADU.
            </p>
          </div>
        </RevealSection>

        {/* Resource cards */}
        <div style={{ border: "1px solid rgba(201,169,110,0.12)" }}>
          {RESOURCES.map((r, i) => (
            <RevealSection key={r.number} delay={i * 60}>
              <div className="resource-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "24px", flexWrap: isMobile ? "wrap" : "nowrap" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "14px" }}>
                      <span className="bf" style={{ fontSize: "9px", letterSpacing: "0.35em", color: "#C9A96E", fontWeight: 500 }}>
                        {r.number}
                      </span>
                      <h3 className="df" style={{ fontSize: "24px", fontWeight: 400, color: "#F5F0E8" }}>
                        {r.title}
                      </h3>
                    </div>
                    <p className="bf" style={{ fontSize: "13px", lineHeight: 1.8, color: "#7A7060", fontWeight: 300, maxWidth: "560px" }}>
                      {r.desc}
                    </p>
                  </div>
                  <a
                    href="#contact"
                    onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
                    className="bf"
                    style={{
                      fontSize: "9px", letterSpacing: "0.22em", color: "#C9A96E",
                      textDecoration: "none", fontWeight: 500, whiteSpace: "nowrap",
                      borderBottom: "1px solid #C9A96E", paddingBottom: "2px",
                      alignSelf: "center",
                    }}
                  >
                    {r.link}
                  </a>
                </div>
                {/* Divider */}
                {i < RESOURCES.length - 1 && (
                  <div style={{ borderBottom: "1px solid rgba(201,169,110,0.1)", marginTop: "32px", marginLeft: "-36px", marginRight: "-36px" }} />
                )}
              </div>
            </RevealSection>
          ))}
        </div>

        {/* CTA banner */}
        <RevealSection delay={200}>
          <div style={{
            marginTop: "56px", padding: isMobile ? "36px 28px" : "48px 56px",
            border: "1px solid rgba(201,169,110,0.25)",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: "24px",
            background: "rgba(201,169,110,0.04)",
          }}>
            <div>
              <div className="df" style={{ fontSize: isMobile ? "22px" : "28px", fontWeight: 300, color: "#F5F0E8", marginBottom: "8px" }}>
                Not sure where to start?
              </div>
              <p className="bf" style={{ fontSize: "13px", color: "#7A7060", fontWeight: 300 }}>
                We offer a free 30-minute feasibility consultation — no obligation.
              </p>
            </div>
            <button className="btn-gold" onClick={() => handleNavClick("#contact")}>
              BOOK FREE CONSULT
            </button>
          </div>
        </RevealSection>
      </section>

      {/* ── ABOUT SECTION ──────────────────────────────────────────────────── */}
      <section
        id="about"
        style={{
          padding: `${sectionPy} ${px}`,
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "48px" : "96px",
          alignItems: "center",
        }}
      >
        {/* Left: visual */}
        <RevealSection>
          <div style={{ height: isMobile ? "340px" : "520px", background: "linear-gradient(145deg, #2c2418 0%, #1a1610 60%, #0f0d0a 100%)", position: "relative", overflow: "hidden" }}>
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.14 }} viewBox="0 0 500 520" preserveAspectRatio="xMidYMid slice">
              <rect x="40" y="40" width="420" height="440" fill="none" stroke="#C9A96E" strokeWidth="0.8" />
              <rect x="80" y="80" width="340" height="360" fill="none" stroke="#C9A96E" strokeWidth="0.4" />
              {/* ADU diagram */}
              <rect x="100" y="180" width="140" height="200" fill="none" stroke="#C9A96E" strokeWidth="0.8" />
              <polyline points="90,180 170,100 250,180" fill="none" stroke="#C9A96E" strokeWidth="0.8" />
              <rect x="130" y="300" width="40" height="60" fill="none" stroke="#C9A96E" strokeWidth="0.6" />
              <rect x="110" y="220" width="45" height="45" fill="none" stroke="#C9A96E" strokeWidth="0.5" />
              <rect x="185" y="220" width="40" height="40" fill="none" stroke="#C9A96E" strokeWidth="0.5" />
              {/* Detached ADU */}
              <rect x="280" y="280" width="120" height="120" fill="none" stroke="#C9A96E" strokeWidth="0.7" />
              <polyline points="272,280 340,210 408,280" fill="none" stroke="#C9A96E" strokeWidth="0.7" />
              <rect x="320" y="350" width="30" height="40" fill="none" stroke="#C9A96E" strokeWidth="0.5" />
              {/* Path */}
              <line x1="240" y1="400" x2="280" y2="400" stroke="#C9A96E" strokeWidth="0.5" strokeDasharray="6 4" />
            </svg>
            <div style={{ position: "absolute", bottom: "28px", left: "28px" }}>
              <div className="df" style={{ fontSize: "64px", fontWeight: 300, color: "rgba(201,169,110,0.12)", lineHeight: 1 }}>
                ADU
              </div>
              <div className="bf" style={{ fontSize: "8px", letterSpacing: "0.42em", color: "#C9A96E", fontWeight: 500 }}>
                SPECIALISTS
              </div>
            </div>
          </div>
          {/* Accent card */}
          {!isMobile && (
            <div style={{
              position: "absolute", bottom: "-24px", right: "-24px",
              background: "#C9A96E", padding: "24px 28px", width: "180px",
            }}>
              <div className="df" style={{ fontSize: "38px", fontWeight: 300, color: "#0A0907", lineHeight: 1 }}>
                98%
              </div>
              <div className="bf" style={{ fontSize: "8px", letterSpacing: "0.28em", color: "#0A0907", fontWeight: 600, marginTop: "4px" }}>
                PERMIT APPROVAL
              </div>
            </div>
          )}
        </RevealSection>

        {/* Right: text */}
        <RevealSection delay={200}>
          <div className="bf" style={{ fontSize: "9px", letterSpacing: "0.42em", color: "#C9A96E", marginBottom: "18px", fontWeight: 500 }}>
            THE STUDIO
          </div>
          <h2 className="df" style={{ fontSize: isMobile ? "clamp(30px, 9vw, 48px)" : "clamp(32px, 4vw, 52px)", fontWeight: 300, marginBottom: "24px", lineHeight: 1.1 }}>
            ADU experts<br /><em style={{ color: "#C9A96E" }}>from first sketch</em><br />to final inspection.
          </h2>
          <p className="bf" style={{ fontSize: "13px", lineHeight: 1.9, color: "#A09880", marginBottom: "18px", fontWeight: 300 }}>
            Axion Design Studio is a residential architecture practice built around one focus: accessory dwelling units. We've guided over 120 homeowners through the design and permitting process, in jurisdictions across the region.
          </p>
          <p className="bf" style={{ fontSize: "13px", lineHeight: 1.9, color: "#7A7060", marginBottom: "40px", fontWeight: 300 }}>
            We understand that an ADU is a significant investment. Our job is to make the path as clear, efficient, and cost-effective as possible — while delivering a design you'll be proud of for decades.
          </p>

          {/* Team */}
          <div style={{ borderTop: "1px solid rgba(201,169,110,0.2)", paddingTop: "28px" }}>
            <div className="bf" style={{ fontSize: "8px", letterSpacing: "0.38em", color: "#C9A96E", marginBottom: "20px", fontWeight: 500 }}>
              OUR TEAM
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {TEAM.map((m) => (
                <div
                  key={m.name}
                  style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "14px 0", borderBottom: "1px solid rgba(201,169,110,0.08)",
                  }}
                >
                  <div>
                    <div className="df" style={{ fontSize: "17px", fontWeight: 400, color: "#F5F0E8" }}>
                      {m.name}
                    </div>
                    <div className="bf" style={{ fontSize: "9px", letterSpacing: "0.15em", color: "#6A6050", fontWeight: 400 }}>
                      {m.role}
                    </div>
                  </div>
                  <div className="bf" style={{ fontSize: "8px", letterSpacing: "0.22em", color: "#C9A96E", fontWeight: 500 }}>
                    {m.exp}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>
      </section>

      {/* ── CONTACT SECTION ────────────────────────────────────────────────── */}
      <section
        id="contact"
        style={{
          padding: `${sectionPy} ${px}`,
          background: "#0f0d0a",
          borderTop: "1px solid rgba(201,169,110,0.1)",
          position: "relative", overflow: "hidden",
        }}
      >
        {/* Background lines */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04 }} viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice">
          {[...Array(5)].map((_, i) => (
            <rect key={i} x={80 + i * 280} y={60} width={200} height={460} fill="none" stroke="#C9A96E" strokeWidth="0.5" />
          ))}
        </svg>

        <div
          style={{
            position: "relative", zIndex: 2,
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "48px" : "96px",
            alignItems: "start",
          }}
        >
          {/* Left */}
          <RevealSection>
            <div className="bf" style={{ fontSize: "9px", letterSpacing: "0.42em", color: "#C9A96E", marginBottom: "18px", fontWeight: 500 }}>
              START A PROJECT
            </div>
            <h2 className="df" style={{ fontSize: isMobile ? "clamp(34px, 10vw, 52px)" : "clamp(36px, 5vw, 60px)", fontWeight: 300, lineHeight: 1, marginBottom: "20px" }}>
              Let's talk<br /><em style={{ color: "#C9A96E" }}>about your</em><br />ADU.
            </h2>
            <p className="bf" style={{ fontSize: "13px", lineHeight: 1.8, color: "#7A7060", fontWeight: 300, marginBottom: "36px" }}>
              Whether you have a full brief or just a question about feasibility — we're happy to help. First consultation is always free.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { label: "Email", value: "hello@axiondesignstudio.com" },
                { label: "Phone", value: "(xxx) xxx-xxxx" },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", gap: "16px", alignItems: "baseline" }}>
                  <span className="bf" style={{ fontSize: "8px", letterSpacing: "0.3em", color: "#C9A96E", fontWeight: 600, minWidth: "48px" }}>
                    {item.label.toUpperCase()}
                  </span>
                  <span className="bf" style={{ fontSize: "13px", color: "#A09880", fontWeight: 300 }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </RevealSection>

          {/* Right: form */}
          <RevealSection delay={150}>
            <form
              onSubmit={(e) => e.preventDefault()}
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "20px" }}>
                <input placeholder="First Name" />
                <input placeholder="Last Name" />
              </div>
              <input placeholder="Email Address" type="email" />
              <input placeholder="Phone (optional)" type="tel" />
              <select
                style={{
                  width: "100%", padding: "14px 0", background: "transparent",
                  border: "none", borderBottom: "1px solid rgba(201,169,110,0.3)",
                  color: "#5A5040", fontFamily: "Montserrat, sans-serif",
                  fontSize: "13px", fontWeight: 300, outline: "none",
                  appearance: "none", cursor: "pointer",
                }}
                defaultValue=""
              >
                <option value="" disabled>ADU Type You're Considering</option>
                {ADU_TYPES.map((a) => (
                  <option key={a.id} value={a.title} style={{ background: "#0f0d0a" }}>
                    {a.title}
                  </option>
                ))}
                <option value="Not sure" style={{ background: "#0f0d0a" }}>Not sure yet</option>
              </select>
              <textarea placeholder="Tell us about your property and goals..." rows={4} />
              <button
                type="submit"
                className="btn-gold"
                style={{ alignSelf: "flex-start", marginTop: "8px" }}
              >
                SEND MESSAGE
              </button>
            </form>
          </RevealSection>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer style={{ background: "#060504", borderTop: "1px solid rgba(201,169,110,0.1)", padding: `52px ${px} 36px` }}>
        <div className="footer-grid" style={{ marginBottom: "48px" }}>
          {/* Brand */}
          <div>
            <div style={{ marginBottom: "16px" }}>
              <div className="df" style={{ fontSize: "20px", fontWeight: 300, letterSpacing: "0.18em", color: "#F5F0E8" }}>
                AXION
              </div>
              <div className="bf" style={{ fontSize: "8px", letterSpacing: "0.45em", color: "#C9A96E", fontWeight: 500 }}>
                DESIGN STUDIO
              </div>
            </div>
            <p className="bf" style={{ fontSize: "11px", lineHeight: 1.8, color: "#4A4030", fontWeight: 300, maxWidth: "260px" }}>
              ADU design and permitting specialists. Helping homeowners unlock the potential in their property.
            </p>
          </div>

          {/* Links */}
          {[
            { title: "ADUs", links: ["Detached ADU", "Garage Conversion", "Junior ADU", "Attached ADU"] },
            { title: "Resources", links: ["Permit Process", "Size & Setbacks", "Cost Estimator", "Financing"] },
            { title: "Studio", links: ["About", "Process", "Contact", "Free Consult"] },
          ].map((col) => (
            <div key={col.title}>
              <div className="bf" style={{ fontSize: "8px", letterSpacing: "0.4em", color: "#C9A96E", marginBottom: "18px", fontWeight: 600 }}>
                {col.title.toUpperCase()}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {col.links.map((l) => (
                  <a
                    key={l}
                    href="#"
                    className="bf"
                    onClick={(e) => e.preventDefault()}
                    style={{ fontSize: "11px", color: "#4A4030", textDecoration: "none", fontWeight: 300, transition: "color 0.2s" }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#A09880")}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#4A4030")}
                  >
                    {l}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(201,169,110,0.08)", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div className="bf" style={{ fontSize: "10px", color: "#3A3028", letterSpacing: "0.1em", fontWeight: 300 }}>
            © {new Date().getFullYear()} Axion Design Studio. All rights reserved.
          </div>
          <div className="bf" style={{ fontSize: "10px", color: "#3A3028", letterSpacing: "0.1em", fontWeight: 300 }}>
            axiondesignstudio.com
          </div>
        </div>
      </footer>
    </div>
  );
}
