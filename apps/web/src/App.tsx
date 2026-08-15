import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';

import heroImg from './assets/landing/hero-img.png';
import heroBackgroundMobile from './assets/landing/hero-background-mobile.png';
import heroBackgroundDesktop from './assets/landing/hero-background-desktop.png';
import playersonImg from './assets/projects/playerson.webp';
import tarsoImg from './assets/projects/tarso-art.jpg';
import playersonProfileImg from './assets/projects/playerson-profile.webp';
import playersZoneFeedImg from './assets/projects/players-zone-feed.png';
import playersZoneTeamsImg from './assets/projects/players-zone-teams.png';
import playersZoneAgenciesImg from './assets/projects/players-zone-agencies.png';
import volleyplus1Img from './assets/projects/volleyplus1.webp';
import volleyplus2Img from './assets/projects/volleyplus2.webp';
import playersonAnalytics1 from './assets/projects/playerson-analytics-1.webp';
import playersonAnalytics2 from './assets/projects/playerson-analytics-2.webp';
import playersonAnalytics3 from './assets/projects/playerson-analytics-3.webp';
import playersonAnalytics4 from './assets/projects/playerson-analytics-4.webp';
import playersonAnalytics5 from './assets/projects/playerson-analytics-5.webp';
import playersonAnalytics6 from './assets/projects/playerson-analytics-6.webp';
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
type GalleryHeading = keyof Dict['projects']['gallery'];
type GalleryBlock =
  | { src: string }
  | { heading: GalleryHeading }
  | { href: string; label: GalleryHeading };

/** Per-project media (cover thumbnail + optional modal gallery + live link), keyed by item id. */
const PROJECT_MEDIA: Record<string, { cover: string; gallery?: GalleryBlock[]; link?: string }> = {
  playerson: { cover: playersonImg },
  tarso: { cover: tarsoImg },
  'playerson-app': {
    cover: playersonProfileImg,
    link: 'https://playerson.com.br/publicprofile/home',
    gallery: [
      { src: playersZoneFeedImg },
      { src: playersZoneTeamsImg },
      { src: playersZoneAgenciesImg },
      {
        href: 'https://playerson.com.br/p/renan-buiatti-1990-opposite',
        label: 'publicProfile',
      },
      { src: playersonProfileImg },
      { heading: 'analytics' },
      { src: playersonAnalytics1 },
      { src: playersonAnalytics2 },
      { src: playersonAnalytics3 },
      { src: playersonAnalytics4 },
      { src: playersonAnalytics5 },
      { src: playersonAnalytics6 },
    ],
  },
  volleyplus: { cover: volleyplus1Img, gallery: [{ src: volleyplus1Img }, { src: volleyplus2Img }] },
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

function RocketIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.5 5.5c2.3-2.3 4.8-2.5 5.8-2.5 0 1-.2 3.5-2.5 5.8l-5.6 5.6-3.7-3.7 6-5.2Z" />
      <path d="m13.7 6.3 4 4" />
      <path d="M8.5 10.7 5.4 11.8 3 14.2l4.4.5" />
      <path d="m12.2 14.5-.5 4.5-2.4 2.3-1.1-4" />
      <circle cx="16.3" cy="7" r="1.4" />
      <path d="M5.8 17.7c-.9.3-1.6 1-2 2 .9-.2 1.7-.2 2.4.1.3-.7.2-1.4-.4-2.1Z" />
    </svg>
  );
}

function DecisionsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 3v17h17" />
      <path d="m7 15 3.6-4 3 2.4L19 7" />
      <path d="M16 7h3v3" />
      <path d="M8 18v-2M12 18v-3M16 18v-4M20 18v-6" />
    </svg>
  );
}

function AutomationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6 1.7 1.7 0 0 0 10 3v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" />
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

  // Reveal sections as they enter the viewport
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
    return () => io.disconnect();
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
      setIsContactOpen(false);
      // Show the centered "sent" notice for 2s, then return to the top of the site.
      window.setTimeout(() => {
        setFormStatus('idle');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 2000);
    } catch (error) {
      setFormStatus('error');
      setFormError(error instanceof Error ? error.message : t.modal.errorDefault);
    }
  };

  return (
    <>
      <div className="stars" aria-hidden="true" />

      <header className="site-header" id="siteHeader" ref={headerRef}>
        <a className="brand" href="#home" aria-label="Buiatti">
          Buiatti
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
          <picture>
            <source media="(max-width: 720px)" srcSet={heroBackgroundMobile} />
            <img src={heroBackgroundDesktop} alt="" />
          </picture>
        </div>
        <div className="hero-inner">
          <h1 className="hero-title">
            Buiatti
          </h1>
          <p className="hero-sub">{t.hero.sub}</p>
          <p className="hero-copy">
            {t.hero.copy1} {t.hero.copy2}
          </p>
          <div className="hero-actions hero-cta-actions">
            <button className="btn btn-primary" type="button" onClick={openContact}>
              <SendIcon />
              <span className="hero-button-divider" aria-hidden="true" />
              <span>{t.hero.primary}</span>
            </button>
            <a className="hero-services-link" href="#servicos">
              {t.hero.ghost}
            </a>
          </div>
        </div>
        <div className="hero-benefits">
          <div className="hero-benefit">
            <span className="hero-benefit-icon"><RocketIcon /></span>
            <p>{t.stats.years}</p>
          </div>
          <div className="hero-benefit">
            <span className="hero-benefit-icon"><DecisionsIcon /></span>
            <p>{t.stats.custom}</p>
          </div>
          <div className="hero-benefit">
            <span className="hero-benefit-icon"><AutomationIcon /></span>
            <p>{t.stats.direct}</p>
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
                Buiatti
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
                {project.modalHow ? (
                  <div className="proj-modal-how">
                    <h3>{project.modalHowTitle}</h3>
                    <p>{project.modalHow}</p>
                  </div>
                ) : null}
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
                      {t.projects.gallery[block.heading]}
                    </h3>
                  ) : 'href' in block ? (
                    <a
                      className="proj-modal-link proj-modal-gallery-link"
                      href={block.href}
                      key={i}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="dot-live" aria-hidden="true" />
                      {t.projects.gallery[block.label]}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M7 17 17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </a>
                  ) : (
                    <img key={i} src={block.src} alt={`${project.title} — ${i + 1}`} loading="lazy" />
                  ),
                )}
              </div>
            </>
          ) : null}
        </div>
      </div>

      {/* ============ SENT NOTICE ============ */}
      {formStatus === 'sent' ? (
        <div className="sent-toast" role="status" aria-live="polite">
          <div className="sent-toast-card">
            <span className="sent-toast-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <p>{t.modal.sent}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default App;
