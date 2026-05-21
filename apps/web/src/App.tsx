import { motion } from 'framer-motion';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { Code2, Send, X } from 'lucide-react';

import heroImg from './assets/landing/hero-img.png';
import heroBrandBg from './assets/landing/red_coast_circuit_background_exact.svg';
import logoImg from './assets/landing/logo-new.png';

const apiUrl = import.meta.env.VITE_API_URL ?? 'https://personal-landing-page.renanbuiatti14.workers.dev';
const contactEndpoint = apiUrl ? `${apiUrl.replace(/\/$/, '')}/contact` : '/contact';
const defaultMessage =
  'Ola, Red Coast Labs. Quero conversar sobre um projeto de software, dashboard ou automacao com IA.';

const navItems = [
  { label: 'Servicos', href: '#servicos' },
  { label: 'Processo', href: '#processo' },
  { label: 'Contato', href: '#contato' },
];

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [formError, setFormError] = useState('');

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

      if (!response.ok) {
        throw new Error('Nao foi possivel enviar a mensagem agora.');
      }

      setFormStatus('sent');
      form.reset();
    } catch (error) {
      setFormStatus('error');
      setFormError(error instanceof Error ? error.message : 'Nao foi possivel enviar a mensagem agora.');
    }
  };

  return (
    <main className="landing-page">
      <header className="site-header" aria-label="Navegacao principal">
        <a className="site-brand" href="#home" aria-label="Red Coast Labs">
          Red Coast Labs
        </a>
        <nav className="site-nav">
          {navItems.map((item) =>
            item.href === '#contato' ? (
              <button key={item.href} type="button" onClick={openContact}>
                {item.label}
              </button>
            ) : (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ),
          )}
        </nav>
      </header>

      <section id="home" className="hero-section" aria-label="Red Coast Labs Software Development">
        <motion.div
          className="hero-poster"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div
            className="poster-circuit-field"
            style={{
              backgroundImage: `url(${heroBrandBg})`,
            }}
            aria-hidden="true"
          />

          <div className="studio-pill">
            <span aria-hidden="true">✦</span>
            Premium Software Studio
          </div>

          <div className="logoCircleMask">
            <img className="brand-seal" src={logoImg} alt="Red Coast Labs Software Development" />
          </div>

          <div className="brand-title">
            <h1>Red Coast Labs</h1>
            <p>Software Development</p>
          </div>

          <div id="servicos" className="contact-card">
            <div className="code-badge" aria-hidden="true">
              <Code2 />
            </div>
            <p>
              Desenvolvimento de sistemas, dashboards e automacoes com IA para empresas que querem reduzir
              trabalho manual e operar com mais velocidade.
            </p>
            <button id="contato" className="hero-contact-button" type="button" onClick={openContact}>
              <span className="send-orb">
                <Send aria-hidden="true" />
              </span>
              Entre em contato
            </button>
          </div>

          <div id="processo" className="service-strip" aria-label="Servicos Red Coast Labs">
            <span>Sites</span>
            <span>Sistemas</span>
            <span>Automacao</span>
            <span>IA</span>
          </div>

          <div className="poster-landscape" aria-hidden="true">
            <img src={heroImg} alt="" />
          </div>
        </motion.div>
      </section>

      {isContactOpen ? (
        <div className="contact-overlay" role="dialog" aria-modal="true" aria-labelledby="contact-title">
          <div className="contact-modal">
            <button
              className="contact-close"
              type="button"
              aria-label="Fechar contato"
              onClick={() => setIsContactOpen(false)}
            >
              <X aria-hidden="true" />
            </button>

            <div className="contact-modal-copy">
              <span className="section-tag">Contato</span>
              <h2 id="contact-title">Conte rapidamente o que voce quer construir.</h2>
              <p>
                A mensagem chega direto para a Red Coast Labs com seu email e telefone para retornarmos
                com um primeiro caminho tecnico.
              </p>
            </div>

            <form className="contact-form" onSubmit={handleContactSubmit}>
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
                <textarea name="message" defaultValue={defaultMessage} rows={5} required />
              </label>

              {formStatus === 'sent' ? <p className="form-feedback">Mensagem enviada. Obrigado pelo contato.</p> : null}
              {formStatus === 'error' ? <p className="form-feedback form-feedback-error">{formError}</p> : null}

              <button className="form-submit" type="submit" disabled={formStatus === 'sending'}>
                {formStatus === 'sending' ? 'Enviando...' : 'Enviar'}
                <Send aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </main>
  );
}

export default App;
