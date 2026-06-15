import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';

import heroImg from './assets/landing/hero-img.png';
import circuitBg from './assets/landing/red_coast_circuit_background_exact.svg';

const apiUrl = import.meta.env.VITE_API_URL ?? 'https://personal-landing-page.renanbuiatti14.workers.dev';
const contactEndpoint = apiUrl ? `${apiUrl.replace(/\/$/, '')}/contact` : '/contact';

const CONTACT_EMAIL = 'renanbuiatti14@gmail.com';
const INSTAGRAM_HANDLE = 'renanbuiatti';
const defaultMessage =
  'Olá, Buiatti.com. Quero conversar sobre um projeto de software, dashboard ou automação com IA.';

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
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [formError, setFormError] = useState('');

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
      if (!response.ok) throw new Error('Não foi possível enviar a mensagem agora.');
      setFormStatus('sent');
      form.reset();
    } catch (error) {
      setFormStatus('error');
      setFormError(error instanceof Error ? error.message : 'Não foi possível enviar a mensagem agora.');
    }
  };

  return (
    <>
      <div className="stars" aria-hidden="true" />

      <header className="site-header" id="siteHeader" ref={headerRef}>
        <a className="brand" href="#home" aria-label="Buiatti.com">
          Buiatti<span className="dot">.com</span>
        </a>
        <nav className="site-nav" aria-label="Navegação principal">
          <a href="#servicos">Serviços</a>
          <a href="#processo">Processo</a>
          <a href="#projetos">Projetos</a>
          <button
            className="nav-cta"
            type="button"
            onClick={openContact}
          >
            Iniciar projeto
            <SendIcon />
          </button>
        </nav>
        <button className="nav-toggle" type="button" onClick={openContact} aria-label="Contato">
          <SendIcon />
        </button>
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
          <p className="hero-sub">Software Development</p>
          <p className="hero-copy">
            Sistemas sob medida, dashboards e automações.
            <br />
            Reduza o trabalho manual e opere com mais velocidade.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" type="button" onClick={openContact}>
              Iniciar projeto
              <SendIcon />
            </button>
            <a className="btn btn-ghost" href="#servicos">
              Ver serviços
            </a>
          </div>
        </div>
        <div className="hero-scroll" aria-hidden="true">
          <span>Role</span>
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
            <div className="lbl">Anos de código</div>
          </div>
          <div className="stat" data-reveal>
            <div className="num">
              <span data-count="100">0</span>%
            </div>
            <div className="lbl">Sob medida</div>
          </div>
          <div className="stat" data-reveal>
            <div className="num">1:1</div>
            <div className="lbl">Atendimento direto</div>
          </div>
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section className="services" id="servicos">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <span className="eyebrow">Serviços</span>
            <h2>Engenharia de software sob medida</h2>
            <p>
              Da ideia ao deploy. Construo produtos digitais com código limpo, performance real e foco em
              resolver o problema certo.
            </p>
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
                <h3>Sistemas &amp; Plataformas</h3>
                <p>
                  Aplicações web completas, do back-end à interface. Arquitetura escalável, integrações e
                  painéis administrativos feitos para crescer com o seu negócio.
                </p>
                <div className="tags">
                  <span className="tag">React</span>
                  <span className="tag">Node.js</span>
                  <span className="tag">TypeScript</span>
                  <span className="tag">PostgreSQL</span>
                  <span className="tag">Cloud</span>
                </div>
              </div>
              <div className="feature-art">
                <span className="feature-tag">Full-stack</span>
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
              <h3>Automações com IA</h3>
              <p>
                Fluxos inteligentes que eliminam tarefas repetitivas: extração de dados, atendimento,
                classificação e relatórios gerados automaticamente.
              </p>
            </article>

            <article className="svc wide" data-reveal>
              <div className="svc-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
              </div>
              <h3>Dashboards &amp; BI</h3>
              <p>
                Painéis que transformam dados dispersos em decisões. Métricas em tempo real, visualizações
                claras e acesso de qualquer lugar.
              </p>
            </article>

            <article className="svc" data-reveal>
              <div className="svc-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <h3>Web Apps</h3>
              <p>Aplicações rápidas e responsivas, feitas para qualquer tela.</p>
            </article>

            <article className="svc" data-reveal>
              <div className="svc-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m2 12 10 5 10-5" />
                  <path d="m2 7 10 5 10-5-10-5Z" />
                  <path d="m2 17 10 5 10-5" />
                </svg>
              </div>
              <h3>Landing Pages</h3>
              <p>Páginas de alta conversão com identidade forte e carregamento veloz.</p>
            </article>

            <article className="svc" data-reveal>
              <div className="svc-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" />
                </svg>
              </div>
              <h3>Integrações &amp; APIs</h3>
              <p>Conecto sistemas, pagamentos e serviços externos sem fricção.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="process" id="processo">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <span className="eyebrow">Processo</span>
            <h2>Como o projeto sai do papel</h2>
            <p>Um caminho claro, com entregas frequentes e você acompanhando cada etapa.</p>
          </div>
          <div className="proc-grid">
            <article className="proc" data-reveal>
              <div className="step">01 — Discovery</div>
              <h4>Entender</h4>
              <p>Mergulho no seu problema, no público e nos objetivos antes de escrever uma linha de código.</p>
            </article>
            <article className="proc" data-reveal>
              <div className="step">02 — Arquitetura</div>
              <h4>Planejar</h4>
              <p>Defino stack, fluxos e estrutura de dados. Escopo transparente e prazos realistas.</p>
            </article>
            <article className="proc" data-reveal>
              <div className="step">03 — Build</div>
              <h4>Desenvolver</h4>
              <p>Construção em ciclos curtos, com versões navegáveis e feedback contínuo.</p>
            </article>
            <article className="proc" data-reveal>
              <div className="step">04 — Deploy</div>
              <h4>Lançar &amp; cuidar</h4>
              <p>Publicação, monitoramento e suporte para evoluir o produto com segurança.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ============ PROJECTS ============ */}
      <section className="projects" id="projetos">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <span className="eyebrow">Projetos</span>
            <h2>Trabalhos selecionados</h2>
            <p>Uma amostra do tipo de produto que construo. Substitua pelos seus próprios cases quando quiser.</p>
          </div>
          <div className="proj-grid">
            <article className="proj" data-reveal>
              <div className="proj-shot">
                <span className="ph">screenshot do projeto · 16:10</span>
              </div>
              <div className="proj-body">
                <div className="kind">Dashboard · SaaS</div>
                <h4>Painel de operações</h4>
                <p>Métricas em tempo real e automação de relatórios para uma equipe logística.</p>
              </div>
            </article>
            <article className="proj" data-reveal>
              <div className="proj-shot">
                <span className="ph">screenshot do projeto · 16:10</span>
              </div>
              <div className="proj-body">
                <div className="kind">IA · Automação</div>
                <h4>Assistente de atendimento</h4>
                <p>Bot que classifica e responde tickets, reduzindo o tempo de resposta pela metade.</p>
              </div>
            </article>
            <article className="proj" data-reveal>
              <div className="proj-shot">
                <span className="ph">screenshot do projeto · 16:10</span>
              </div>
              <div className="proj-body">
                <div className="kind">Web App · E-commerce</div>
                <h4>Loja sob medida</h4>
                <p>Plataforma de vendas com checkout próprio e integrações de pagamento.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="cta-band">
        <div className="wrap">
          <div className="cta-card" data-reveal>
            <div className="glow" aria-hidden="true" />
            <span className="eyebrow" style={{ justifyContent: 'center' }}>
              Contato
            </span>
            <h2>Vamos construir juntos</h2>
            <p>
              Conte rapidamente o que você quer criar. Eu retorno com um primeiro caminho técnico e os
              próximos passos.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary" type="button" onClick={openContact}>
                Entre em contato
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
              <p>
                Desenvolvimento de software sob medida — sistemas, dashboards e automações. Código
                limpo, performance real.
              </p>
            </div>
            <div className="footer-cols">
              <div className="fcol">
                <h5>Navegar</h5>
                <a href="#servicos">Serviços</a>
                <a href="#processo">Processo</a>
                <a href="#projetos">Projetos</a>
              </div>
              <div className="fcol">
                <h5>Serviços</h5>
                <a href="#servicos">Sistemas</a>
                <a href="#servicos">Automação com IA</a>
                <a href="#servicos">Dashboards</a>
                <a href="#servicos">Landing Pages</a>
              </div>
              <div className="fcol">
                <h5>Contato</h5>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                <a href={`https://instagram.com/${INSTAGRAM_HANDLE}`} target="_blank" rel="noopener noreferrer">
                  @{INSTAGRAM_HANDLE}
                </a>
                <button type="button" className="fcol-link" onClick={openContact}>
                  Enviar mensagem
                </button>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Buiatti.com — Software Development</span>
            <span>Feito com código limpo no Brasil</span>
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
          <button className="modal-close" type="button" onClick={() => setIsContactOpen(false)} aria-label="Fechar contato">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div className="modal-copy">
            <span className="eyebrow">Contato</span>
            <h2 id="modalTitle">Conte o que você quer construir</h2>
            <p>
              A mensagem chega direto para mim com seu email e telefone, e eu retorno com um primeiro caminho
              técnico.
            </p>
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
              Nome
              <input name="name" type="text" placeholder="Seu nome" autoComplete="name" />
            </label>
            <label>
              Email
              <input name="email" type="email" placeholder="voce@empresa.com" autoComplete="email" required />
            </label>
            <label>
              Telefone
              <input name="phone" type="tel" placeholder="(00) 00000-0000" autoComplete="tel" required />
            </label>
            <label>
              Mensagem
              <textarea name="message" rows={4} defaultValue={defaultMessage} required />
            </label>
            {formStatus === 'sent' ? (
              <p className="form-feedback">Mensagem enviada. Obrigado pelo contato!</p>
            ) : null}
            {formStatus === 'error' ? (
              <p className="form-feedback error">{formError}</p>
            ) : null}
            <button className="form-submit" type="submit" disabled={formStatus === 'sending'}>
              {formStatus === 'sending' ? 'Enviando...' : 'Enviar mensagem'}
              <SendIcon />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
