import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';

import heroImg from './assets/landing/hero-img.png';
import circuitBg from './assets/landing/red_coast_circuit_background_exact.svg';
import playersonImg from './assets/projects/playerson.jpg';
import tarsoImg from './assets/projects/tarso-art.jpg';
import playersonProfileImg from './assets/projects/playerson-profile.jpg';
import volleyplusServeImg from './assets/projects/volleyplus-serve.png';
import volleyplusPrefsImg from './assets/projects/volleyplus-prefs.png';
import playersonAnalytics1 from './assets/projects/playerson-analytics-1.webp';
import playersonAnalytics2 from './assets/projects/playerson-analytics-2.webp';
import playersonAnalytics3 from './assets/projects/playerson-analytics-3.webp';
import playersonAnalytics4 from './assets/projects/playerson-analytics-4.webp';
import playersonAnalytics5 from './assets/projects/playerson-analytics-5.webp';
import {
  LANGS,
  countryToLang,
  detectCountry,
  getInitialLang,
  hasSavedLang,
  saveLang,
  translations,
  type Dict,
  type Lang,
} from './i18n';

type ProjectItem = Dict['projects']['items'][number];

/** A modal-gallery entry is either an image or a section heading. */
type GalleryBlock = { src: string } | { heading: string };

/** Per-project media (cover thumbnail + optional modal gallery + live link), keyed by item id. */
const PROJECT_MEDIA: Record<string, { cover: string; gallery?: GalleryBlock[]; link?: string }> = {
  playerson: { cover: playersonImg },
  tarso: { cover: tarsoImg },
  'playerson-app': {
    cover: playersonProfileImg,
    link: 'https://playerson.com.br/p/renan-buiatti-1990-opposite',
    gallery: [
      { src: playersonProfileImg },
      { heading: 'Analytics' },
      { src: playersonAnalytics1 },
      { src: playersonAnalytics2 },
      { src: playersonAnalytics3 },
      { src: playersonAnalytics4 },
      { src: playersonAnalytics5 },
    ],
  },
  volleyplus: { cover: volleyplusServeImg, gallery: [{ src: volleyplusServeImg }, { src: volleyplusPrefsImg }] },
};

const apiUrl = import.meta.env.VITE_API_URL ?? 'https://personal-landing-page.renanbuiatti14.workers.dev';
const contactEndpoint = apiUrl ? `${apiUrl.replace(/\/$/, '')}/contact` : '/contact';

const CONTACT_EMAIL = 'renanbuiatti18@gmail.com';
const INSTAGRAM_HANDLE = 'renanbuiatti';

type FormStatus = 'idle' | 'sending' | 'sent' | 'error';

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function App() {
  const headerRef = useRef<HTMLElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const [lang, setLang] = useState<Lang>(getInitialLang);
  const [langOpen, setLangOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [project, setProject] = useState<ProjectItem | null>(null);
  const [projectOpen, setProjectOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [formError, setFormError] = useState('');

  const t = translations[lang];

  // Keep <html lang> in sync for a11y / SEO
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Auto-detect language from the visitor's country (unless they already chose one)
  useEffect(() => {
    if (hasSavedLang()) return;
    let cancelled = false;
    detectCountry().then((country) => {
      if (!cancelled && country) setLang(countryToLang(country));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Header shrink on scroll (DOM class toggle — avoids re-rendering on every scroll)
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Reveal on scroll + count-up numbers
  useEffect(() => {
    const reveal = (el: Element) => el.classList.add('in');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            reveal(e.target);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px -40px 0px' },
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      // Reveal anything already in or above the viewport on load (e.g. restored scroll on
      // refresh) so it can never stay stuck invisible; observe only what's still below the fold.
      if (el.getBoundingClientRect().top < window.innerHeight) reveal(el);
      else io.observe(el);
    });

    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const target = parseInt(el.dataset.count ?? '0', 10);
          const dur = 1200;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / dur, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            el.textContent = String(Math.round(target * ease));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          cio.unobserve(el);
        });
      },
      { threshold: 0.6 },
    );
    document.querySelectorAll('[data-count]').forEach((c) => cio.observe(c));

    return () => {
      io.disconnect();
      cio.disconnect();
    };
  }, []);

  // Lock body scroll + Escape-to-close while any modal is open
  useEffect(() => {
    if (!isContactOpen && !projectOpen) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsContactOpen(false);
        setProjectOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [isContactOpen, projectOpen]);

  // Close the language dropdown on outside click / Escape
  useEffect(() => {
    if (!langOpen) return;
    const onDown = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLangOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [langOpen]);

  const selectLang = (next: Lang) => {
    setLang(next);
    saveLang(next);
    setLangOpen(false);
  };

  const openContact = () => {
    setFormStatus('idle');
    setFormError('');
    setIsContactOpen(true);
  };

  const openProject = (item: ProjectItem) => {
    setProject(item);
    setProjectOpen(true);
  };

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setFormStatus('sending');
    setFormError('');

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get('name') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      phone: String(formData.get('phone') ?? '').trim(),
      message: String(formData.get('message') ?? '').trim(),
    };

    try {
      const response = await fetch(contactEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(t.modal.errorDefault);
      setFormStatus('sent');
      form.reset();
    } catch (error) {
      setFormStatus('error');
      setFormError(error instanceof Error ? error.message : t.modal.errorDefault);
    }
  };

  return (
    <>
      <div className="stars" aria-hidden="true" />

      <header className="site-header" id="siteHeader" ref={headerRef}>
        <a className="brand" href="#home" aria-label="Buiatti.com">
          Buiatti<span className="dot">.com</span>
        </a>
        <div className="header-actions">
          <nav className="site-nav" aria-label={t.nav.navAria}>
            <a href="#servicos">{t.nav.servicos}</a>
            <a href="#processo">{t.nav.processo}</a>
            <a href="#projetos">{t.nav.projetos}</a>
            <button className="nav-cta" type="button" onClick={openContact}>
              {t.nav.cta}
              <SendIcon />
            </button>
          </nav>
          <div className={`lang-select${langOpen ? ' open' : ''}`} ref={langRef}>
            <button
              type="button"
              className="lang-trigger"
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              aria-label={t.nav.langAria}
              onClick={() => setLangOpen((open) => !open)}
            >
              <svg className="globe" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
              </svg>
              <span className="lang-code">{lang.toUpperCase()}</span>
              <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="lang-menu" role="listbox" aria-label={t.nav.langAria}>
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  role="option"
                  aria-selected={l.code === lang}
                  className={`lang-option${l.code === lang ? ' active' : ''}`}
                  onClick={() => selectLang(l.code)}
                >
                  <span className="lang-option-code">{l.label}</span>
                  <span className="lang-option-name">{l.name}</span>
                  {l.code === lang ? <CheckIcon /> : null}
                </button>
              ))}
            </div>
          </div>
          <button className="nav-toggle" type="button" onClick={openContact} aria-label={t.nav.contactAria}>
            <SendIcon />
          </button>
        </div>
      </header>

      {/* ============ HERO ============ */}
      <section className="hero" id="home">
        <div className="hero-bg" aria-hidden="true">
          <img src={heroImg} alt="" />
          <div className="circuit" style={{ backgroundImage: `url(${circuitBg})` }} />
        </div>
        <div className="hero-inner">
          <h1 className="hero-title">
            Buiatti<span className="com">.com</span>
          </h1>
          <p className="hero-sub">{t.hero.sub}</p>
          <p className="hero-copy">
            {t.hero.copy1}
            <br />
            {t.hero.copy2}
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" type="button" onClick={openContact}>
              {t.hero.primary}
              <SendIcon />
            </button>
            <a className="btn btn-ghost" href="#servicos">
              {t.hero.ghost}
            </a>
          </div>
        </div>
        <div className="hero-scroll" aria-hidden="true">
          <span>{t.hero.scroll}</span>
          <span className="line" />
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="stats">
        <div className="wrap">
          <div className="stat" data-reveal>
            <div className="num">
              <span data-count="6">0</span>+
            </div>
            <div className="lbl">{t.stats.years}</div>
          </div>
          <div className="stat" data-reveal>
            <div className="num">
              <span data-count="100">0</span>%
            </div>
            <div className="lbl">{t.stats.custom}</div>
          </div>
          <div className="stat" data-reveal>
            <div className="num">1:1</div>
            <div className="lbl">{t.stats.direct}</div>
          </div>
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section className="services" id="servicos">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <span className="eyebrow">{t.services.eyebrow}</span>
            <h2>{t.services.title}</h2>
            <p>{t.services.intro}</p>
          </div>

          <div className="svc-grid">
            <article className="svc feature" data-reveal>
              <div className="feature-copy">
                <div className="svc-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <h3>{t.services.feature.title}</h3>
                <p>{t.services.feature.desc}</p>
                <div className="tags">
                  <span className="tag">React</span>
                  <span className="tag">Node.js</span>
                  <span className="tag">TypeScript</span>
                  <span className="tag">PostgreSQL</span>
                  <span className="tag">Cloud</span>
                </div>
              </div>
              <div className="feature-art">
                <span className="feature-tag">{t.services.feature.tag}</span>
                <img src={heroImg} alt="" />
              </div>
            </article>

            <article className="svc wide" data-reveal>
              <div className="svc-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v1a3 3 0 0 0 0 6 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0 0-6V5a3 3 0 0 0-3-3Z" />
                  <path d="M12 2v20" />
                  <path d="M5 9H2" />
                  <path d="M22 9h-3" />
                </svg>
              </div>
              <h3>{t.services.ai.title}</h3>
              <p>{t.services.ai.desc}</p>
            </article>

            <article className="svc wide" data-reveal>
              <div className="svc-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
              </div>
              <h3>{t.services.bi.title}</h3>
              <p>{t.services.bi.desc}</p>
            </article>

            <article className="svc" data-reveal>
              <div className="svc-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <h3>{t.services.web.title}</h3>
              <p>{t.services.web.desc}</p>
            </article>

            <article className="svc" data-reveal>
              <div className="svc-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m2 12 10 5 10-5" />
                  <path d="m2 7 10 5 10-5-10-5Z" />
                  <path d="m2 17 10 5 10-5" />
                </svg>
              </div>
              <h3>{t.services.landing.title}</h3>
              <p>{t.services.landing.desc}</p>
            </article>

            <article className="svc" data-reveal>
              <div className="svc-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" />
                </svg>
              </div>
              <h3>{t.services.api.title}</h3>
              <p>{t.services.api.desc}</p>
            </article>
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="process" id="processo">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <span className="eyebrow">{t.process.eyebrow}</span>
            <h2>{t.process.title}</h2>
            <p>{t.process.intro}</p>
          </div>
          <div className="proc-grid">
            {t.process.steps.map((s, i) => (
              // Key by position, not text: step labels differ across languages, so a text key
              // would remount the card on language switch and drop its imperative reveal class.
              <article className="proc" data-reveal key={i}>
                <div className="step">{s.step}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROJECTS ============ */}
      <section className="projects" id="projetos">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <span className="eyebrow">{t.projects.eyebrow}</span>
            <h2>{t.projects.title}</h2>
            <p>{t.projects.intro}</p>
          </div>
          <div className="proj-grid">
            {t.projects.items.map((p) => {
              const media = PROJECT_MEDIA[p.id];
              const cover = media?.cover;
              const domain = p.url ? new URL(p.url).hostname.replace(/^www\./, '') : null;
              const label = domain ?? p.title;
              const inner = (
                <>
                  <div className="proj-shot">
                    <div className="proj-window" aria-hidden="true">
                      <span className="dot" />
                      <span className="dot" />
                      <span className="dot" />
                      <span className="proj-url">{label}</span>
                    </div>
                    {cover ? (
                      <img className="proj-img" src={cover} alt={`${p.title} — ${label}`} loading="lazy" />
                    ) : (
                      <span className="proj-wordmark">{p.title}</span>
                    )}
                  </div>
                  <div className="proj-body">
                    <div className="kind">{p.kind}</div>
                    <h4>{p.title}</h4>
                    <p>{p.desc}</p>
                    <span className="proj-visit">
                      {t.projects.visit}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M7 17 17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </span>
                  </div>
                </>
              );
              return p.url ? (
                <a className="proj" data-reveal key={p.id} href={p.url} target="_blank" rel="noopener noreferrer">
                  {inner}
                </a>
              ) : (
                <div
                  className="proj proj-clickable"
                  data-reveal
                  key={p.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => openProject(p)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openProject(p);
                    }
                  }}
                >
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="cta-band">
        <div className="wrap">
          <div className="cta-card" data-reveal>
            <div className="glow" aria-hidden="true" />
            <span className="eyebrow" style={{ justifyContent: 'center' }}>
              {t.cta.eyebrow}
            </span>
            <h2>{t.cta.title}</h2>
            <p>{t.cta.desc}</p>
            <div className="hero-actions">
              <button className="btn btn-primary" type="button" onClick={openContact}>
                {t.cta.button}
                <SendIcon />
              </button>
              <a className="btn btn-ghost" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="site-footer" id="contato">
        <div className="wrap">
          <div className="footer-top">
            <div className="footer-brand">
              <a className="brand" href="#home">
                Buiatti<span className="dot">.com</span>
              </a>
              <p>{t.footer.brand}</p>
            </div>
            <div className="footer-cols">
              <div className="fcol">
                <h5>{t.footer.navTitle}</h5>
                <a href="#servicos">{t.nav.servicos}</a>
                <a href="#processo">{t.nav.processo}</a>
                <a href="#projetos">{t.nav.projetos}</a>
              </div>
              <div className="fcol">
                <h5>{t.footer.servicesTitle}</h5>
                <a href="#servicos">{t.footer.links.sistemas}</a>
                <a href="#servicos">{t.footer.links.ia}</a>
                <a href="#servicos">{t.footer.links.dashboards}</a>
                <a href="#servicos">{t.footer.links.landing}</a>
              </div>
              <div className="fcol">
                <h5>{t.footer.contactTitle}</h5>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                <a href={`https://instagram.com/${INSTAGRAM_HANDLE}`} target="_blank" rel="noopener noreferrer">
                  @{INSTAGRAM_HANDLE}
                </a>
                <button type="button" className="fcol-link" onClick={openContact}>
                  {t.footer.sendMessage}
                </button>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>{t.footer.copyright}</span>
            <span>{t.footer.madeWith}</span>
          </div>
        </div>
      </footer>

      {/* ============ CONTACT MODAL ============ */}
      <div
        className={`overlay${isContactOpen ? ' open' : ''}`}
        id="overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsContactOpen(false);
        }}
      >
        <div className="modal">
          <button className="modal-close" type="button" onClick={() => setIsContactOpen(false)} aria-label={t.modal.closeAria}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div className="modal-copy">
            <span className="eyebrow">{t.modal.eyebrow}</span>
            <h2 id="modalTitle">{t.modal.title}</h2>
            <p>{t.modal.desc}</p>
            <div className="modal-contacts">
              <div className="mc">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-10 5L2 7" />
                </svg>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </div>
              <div className="mc">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <a href={`https://instagram.com/${INSTAGRAM_HANDLE}`} target="_blank" rel="noopener noreferrer">
                  @{INSTAGRAM_HANDLE}
                </a>
              </div>
            </div>
          </div>
          <form id="contactForm" onSubmit={handleContactSubmit}>
            <label>
              {t.modal.name}
              <input name="name" type="text" placeholder={t.modal.namePh} autoComplete="name" />
            </label>
            <label>
              {t.modal.email}
              <input name="email" type="email" placeholder={t.modal.emailPh} autoComplete="email" required />
            </label>
            <label>
              {t.modal.phone}
              <input name="phone" type="tel" placeholder={t.modal.phonePh} autoComplete="tel" required />
            </label>
            <label>
              {t.modal.message}
              <textarea key={lang} name="message" rows={4} defaultValue={t.modal.defaultMessage} required />
            </label>
            {formStatus === 'sent' ? <p className="form-feedback">{t.modal.sent}</p> : null}
            {formStatus === 'error' ? <p className="form-feedback error">{formError}</p> : null}
            <button className="form-submit" type="submit" disabled={formStatus === 'sending'}>
              {formStatus === 'sending' ? t.modal.sending : t.modal.submit}
              <SendIcon />
            </button>
          </form>
        </div>
      </div>

      {/* ============ PROJECT MODAL ============ */}
      <div
        className={`overlay${projectOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="projModalTitle"
        onClick={(e) => {
          if (e.target === e.currentTarget) setProjectOpen(false);
        }}
      >
        <div className="proj-modal">
          <button className="modal-close" type="button" onClick={() => setProjectOpen(false)} aria-label={t.modal.closeAria}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          {project ? (
            <>
              <div className="proj-modal-head">
                <span className="eyebrow">{project.kind}</span>
                <h2 id="projModalTitle">{project.title}</h2>
                <p>{project.modalDesc ?? project.desc}</p>
                {PROJECT_MEDIA[project.id]?.link ? (
                  <a
                    className="proj-modal-link"
                    href={PROJECT_MEDIA[project.id]?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="dot-live" aria-hidden="true" />
                    {t.projects.liveExample}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M7 17 17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </a>
                ) : null}
              </div>
              <div className="proj-modal-gallery">
                {(PROJECT_MEDIA[project.id]?.gallery ?? []).map((block, i) =>
                  'heading' in block ? (
                    <h3 className="proj-modal-section" key={i}>
                      {block.heading}
                    </h3>
                  ) : (
                    <img key={i} src={block.src} alt={`${project.title} — ${i + 1}`} loading="lazy" />
                  ),
                )}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default App;
