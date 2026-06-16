import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

import heroImg from './assets/landing/hero-img.png';
import circuitBg from './assets/landing/red_coast_circuit_background_exact.svg';
import {
  LANGS,
  countryToLang,
  detectCountry,
  getInitialLang,
  hasSavedLang,
  saveLang,
  translations,
  type Lang,
} from './i18n';

const apiUrl = import.meta.env.VITE_API_URL ?? 'https://personal-landing-page.renanbuiatti14.workers.dev';
const contactEndpoint = apiUrl ? `${apiUrl.replace(/\/$/, '')}/contact` : '/contact';

const CONTACT_EMAIL = 'renanbuiatti14@gmail.com';
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

function App() {
  const headerRef = useRef<HTMLElement>(null);
  const [lang, setLang] = useState<Lang>(getInitialLang);
  const [isContactOpen, setIsContactOpen] = useState(false);
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
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));

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

  // Lock body scroll + Escape-to-close while modal is open
  useEffect(() => {
    if (!isContactOpen) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsContactOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [isContactOpen]);

  const onLangChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value as Lang;
    setLang(next);
    saveLang(next);
  };

  const openContact = () => {
    setFormStatus('idle');
    setFormError('');
    setIsContactOpen(true);
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
          <div className="lang-select">
            <svg className="globe" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
            </svg>
            <select aria-label={t.nav.langAria} value={lang} onChange={onLangChange}>
              {LANGS.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>
            <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="6 9 12 15 18 9" />
            </svg>
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
              <span data-count="8">0</span>+
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
            {t.process.steps.map((s) => (
              <article className="proc" data-reveal key={s.step}>
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
            {t.projects.items.map((p) => (
              <article className="proj" data-reveal key={p.title}>
                <div className="proj-shot">
                  <span className="ph">{t.projects.placeholder}</span>
                </div>
                <div className="proj-body">
                  <div className="kind">{p.kind}</div>
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
              </article>
            ))}
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
    </>
  );
}

export default App;
