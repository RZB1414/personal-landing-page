import { motion } from 'framer-motion';
import {
  AppWindow,
  Bot,
  Cloud,
  Code2,
  Instagram,
  Layers3,
  Mail,
  Radar,
  ScrollText,
} from 'lucide-react';

import heroImg from './assets/landing/hero-img.png';
import heroBrandBg from './assets/landing/redcoast-background.png';
import logoImg from './assets/landing/logo-new.png';

const services = [
  {
    title: 'Sistemas & Dashboards',
    description:
      'Ferramentas internas para otimizar sua operacao. Dashboards analiticos em tempo real.',
    icon: Layers3,
  },
  {
    title: 'Integracoes com IA',
    description:
      'Automacao inteligente e analise preditiva. Integrando o poder do GPT e outras LLMs ao seu negocio.',
    icon: Bot,
  },
  {
    title: 'Web Apps',
    description:
      'Aplicacoes escalaveis, rapidas e seguras. Focadas na melhor experiencia do usuario final.',
    icon: AppWindow,
  },
];

const steps = [
  {
    number: '01.',
    title: 'Discovery',
    description: 'Entendimento profundo do seu negocio, desafios e objetivos.',
    icon: Radar,
  },
  {
    number: '02.',
    title: 'Arquitetura',
    description: 'Desenho da solucao tecnica e prototipagem da interface.',
    icon: ScrollText,
  },
  {
    number: '03.',
    title: 'Desenvolvimento',
    description: 'Codigo limpo, sprints ageis e entregas iterativas.',
    icon: Code2,
  },
  {
    number: '04.',
    title: 'Deploy & Suporte',
    description: 'Lancamento seguro e monitoramento continuo da aplicacao.',
    icon: Cloud,
  },
];

function App() {
  return (

      <main className="landing-page">
        <section id="home" className="hero-section">
          <div className="hero-panel">
            <motion.div
              className="hero-brand-mark"
              style={{
                backgroundImage: `url(${heroBrandBg})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
              }}
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <img src={logoImg} alt="Red Coast Labs Software Development" />
            </motion.div>

            <motion.div
              className="hero-copy"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08 }}
            >
              <h1>Red Coast Labs</h1>
              <h2>Software Development</h2>
              <p className="hero-subtitle">Innovating at the edge of discovery.</p>
            </motion.div>

            <motion.div
              className="hero-art-frame"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img src={heroImg} alt="Arte hero Red Coast Labs" className="hero-artwork" />
            </motion.div>
          </div>
        </section>

        <section id="servicos" className="content-section">
          <div className="section-header">
            <span className="section-tag">Servicos</span>
            <h2>Solucoes desenhadas para operacao, velocidade e escala.</h2>
          </div>

          <div className="stack-grid">
            {services.map(({ title, description, icon: Icon }, index) => (
              <motion.article
                key={title}
                className="feature-card"
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <div className="feature-card-icon">
                  <Icon />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="processo" className="content-section process-section">
          <div className="section-header">
            <span className="section-tag">Processo</span>
            <h2>Da descoberta ao deploy, com clareza em cada etapa.</h2>
          </div>

          <motion.div
            className="process-board"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            {steps.map(({ number, title, description, icon: Icon }, index) => (
              <div key={title} className="process-step">
                <div className="process-step-icon">
                  <Icon />
                </div>
                <div className="process-step-copy">
                  <h3>
                    <span>{number}</span> {title}
                  </h3>
                  <p>{description}</p>
                </div>
                {index < steps.length - 1 ? <div className="process-divider" aria-hidden="true" /> : null}
              </div>
            ))}
          </motion.div>

          <motion.div
            id="contato"
            className="contact-board"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            <div className="contact-heading">
              <h2>Vamos construir juntos</h2>
              <p>Transforme sua visao em software de alto impacto.</p>
            </div>

            <div className="contact-links">
              <a href="mailto:hello@redcoast.com" className="contact-pill">
                <Mail />
                <span>hello@redcoast.com</span>
              </a>
              <a
                href="https://instagram.com/redcoastlabs"
                target="_blank"
                rel="noreferrer"
                className="contact-pill"
              >
                <Instagram />
                <span>@redcoastlabs</span>
              </a>
            </div>
          </motion.div>
        </section>
      </main>
  );
}

export default App;
