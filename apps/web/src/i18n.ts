export type Lang = 'pt' | 'en' | 'it';

export const LANGS: { code: Lang; label: string; name: string }[] = [
  { code: 'pt', label: 'PT', name: 'Português' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'it', label: 'IT', name: 'Italiano' },
];

export interface Dict {
  nav: {
    servicos: string;
    processo: string;
    projetos: string;
    cta: string;
    navAria: string;
    contactAria: string;
    langAria: string;
  };
  hero: { sub: string; copy1: string; copy2: string; primary: string; ghost: string; scroll: string };
  stats: { years: string; custom: string; direct: string };
  services: {
    eyebrow: string;
    title: string;
    intro: string;
    feature: { title: string; desc: string; tag: string };
    ai: { title: string; desc: string };
    bi: { title: string; desc: string };
    web: { title: string; desc: string };
    landing: { title: string; desc: string };
    api: { title: string; desc: string };
  };
  process: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: { step: string; title: string; desc: string }[];
  };
  projects: {
    eyebrow: string;
    title: string;
    intro: string;
    placeholder: string;
    items: { kind: string; title: string; desc: string }[];
  };
  cta: { eyebrow: string; title: string; desc: string; button: string };
  footer: {
    brand: string;
    navTitle: string;
    servicesTitle: string;
    contactTitle: string;
    links: { sistemas: string; ia: string; dashboards: string; landing: string };
    sendMessage: string;
    copyright: string;
    madeWith: string;
  };
  modal: {
    eyebrow: string;
    title: string;
    desc: string;
    closeAria: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    namePh: string;
    emailPh: string;
    phonePh: string;
    defaultMessage: string;
    sent: string;
    errorDefault: string;
    submit: string;
    sending: string;
  };
}

const pt: Dict = {
  nav: {
    servicos: 'Serviços',
    processo: 'Processo',
    projetos: 'Projetos',
    cta: 'Iniciar projeto',
    navAria: 'Navegação principal',
    contactAria: 'Contato',
    langAria: 'Idioma',
  },
  hero: {
    sub: 'Software Development',
    copy1: 'Sistemas sob medida, dashboards e automações.',
    copy2: 'Reduza o trabalho manual e opere com mais velocidade.',
    primary: 'Iniciar projeto',
    ghost: 'Ver serviços',
    scroll: 'Role',
  },
  stats: { years: 'Anos de código', custom: 'Sob medida', direct: 'Atendimento direto' },
  services: {
    eyebrow: 'Serviços',
    title: 'Engenharia de software sob medida',
    intro:
      'Da ideia ao deploy. Construo produtos digitais com código limpo, performance real e foco em resolver o problema certo.',
    feature: {
      title: 'Sistemas & Plataformas',
      desc: 'Aplicações web completas, do back-end à interface. Arquitetura escalável, integrações e painéis administrativos feitos para crescer com o seu negócio.',
      tag: 'Full-stack',
    },
    ai: {
      title: 'Automações com IA',
      desc: 'Fluxos inteligentes que eliminam tarefas repetitivas: extração de dados, atendimento, classificação e relatórios gerados automaticamente.',
    },
    bi: {
      title: 'Dashboards & BI',
      desc: 'Painéis que transformam dados dispersos em decisões. Métricas em tempo real, visualizações claras e acesso de qualquer lugar.',
    },
    web: { title: 'Web Apps', desc: 'Aplicações rápidas e responsivas, feitas para qualquer tela.' },
    landing: {
      title: 'Landing Pages',
      desc: 'Páginas de alta conversão com identidade forte e carregamento veloz.',
    },
    api: {
      title: 'Integrações & APIs',
      desc: 'Conecto sistemas, pagamentos e serviços externos sem fricção.',
    },
  },
  process: {
    eyebrow: 'Processo',
    title: 'Como o projeto sai do papel',
    intro: 'Um caminho claro, com entregas frequentes e você acompanhando cada etapa.',
    steps: [
      {
        step: '01 — Discovery',
        title: 'Entender',
        desc: 'Mergulho no seu problema, no público e nos objetivos antes de escrever uma linha de código.',
      },
      {
        step: '02 — Arquitetura',
        title: 'Planejar',
        desc: 'Defino stack, fluxos e estrutura de dados. Escopo transparente e prazos realistas.',
      },
      {
        step: '03 — Build',
        title: 'Desenvolver',
        desc: 'Construção em ciclos curtos, com versões navegáveis e feedback contínuo.',
      },
      {
        step: '04 — Deploy',
        title: 'Lançar & cuidar',
        desc: 'Publicação, monitoramento e suporte para evoluir o produto com segurança.',
      },
    ],
  },
  projects: {
    eyebrow: 'Projetos',
    title: 'Trabalhos selecionados',
    intro: 'Uma amostra do tipo de produto que construo. Substitua pelos seus próprios cases quando quiser.',
    placeholder: 'screenshot do projeto · 16:10',
    items: [
      {
        kind: 'Dashboard · SaaS',
        title: 'Painel de operações',
        desc: 'Métricas em tempo real e automação de relatórios para uma equipe logística.',
      },
      {
        kind: 'IA · Automação',
        title: 'Assistente de atendimento',
        desc: 'Bot que classifica e responde tickets, reduzindo o tempo de resposta pela metade.',
      },
      {
        kind: 'Web App · E-commerce',
        title: 'Loja sob medida',
        desc: 'Plataforma de vendas com checkout próprio e integrações de pagamento.',
      },
    ],
  },
  cta: {
    eyebrow: 'Contato',
    title: 'Vamos construir juntos',
    desc: 'Conte rapidamente o que você quer criar. Eu retorno com um primeiro caminho técnico e os próximos passos.',
    button: 'Entre em contato',
  },
  footer: {
    brand: 'Desenvolvimento de software sob medida — sistemas, dashboards e automações. Código limpo, performance real.',
    navTitle: 'Navegar',
    servicesTitle: 'Serviços',
    contactTitle: 'Contato',
    links: { sistemas: 'Sistemas', ia: 'Automação com IA', dashboards: 'Dashboards', landing: 'Landing Pages' },
    sendMessage: 'Enviar mensagem',
    copyright: '© 2026 Buiatti.com — Software Development',
    madeWith: 'Feito com código limpo no Brasil',
  },
  modal: {
    eyebrow: 'Contato',
    title: 'Conte o que você quer construir',
    desc: 'A mensagem chega direto para mim com seu email e telefone, e eu retorno com um primeiro caminho técnico.',
    closeAria: 'Fechar contato',
    name: 'Nome',
    email: 'Email',
    phone: 'Telefone',
    message: 'Mensagem',
    namePh: 'Seu nome',
    emailPh: 'voce@empresa.com',
    phonePh: '(00) 00000-0000',
    defaultMessage: 'Olá, Buiatti.com. Quero conversar sobre um projeto de software, dashboard ou automação com IA.',
    sent: 'Mensagem enviada. Obrigado pelo contato!',
    errorDefault: 'Não foi possível enviar a mensagem agora.',
    submit: 'Enviar mensagem',
    sending: 'Enviando...',
  },
};

const en: Dict = {
  nav: {
    servicos: 'Services',
    processo: 'Process',
    projetos: 'Projects',
    cta: 'Start a project',
    navAria: 'Main navigation',
    contactAria: 'Contact',
    langAria: 'Language',
  },
  hero: {
    sub: 'Software Development',
    copy1: 'Custom systems, dashboards and automations.',
    copy2: 'Reduce manual work and accelerate your operations.',
    primary: 'Start a project',
    ghost: 'See services',
    scroll: 'Scroll',
  },
  stats: { years: 'Years of code', custom: 'Tailor-made', direct: 'Direct support' },
  services: {
    eyebrow: 'Services',
    title: 'Custom software engineering',
    intro:
      'From idea to deploy. I build digital products with clean code, real performance and a focus on solving the right problem.',
    feature: {
      title: 'Systems & Platforms',
      desc: 'Complete web applications, from back-end to interface. Scalable architecture, integrations and admin panels built to grow with your business.',
      tag: 'Full-stack',
    },
    ai: {
      title: 'AI Automations',
      desc: 'Smart workflows that eliminate repetitive tasks: data extraction, support, classification and automatically generated reports.',
    },
    bi: {
      title: 'Dashboards & BI',
      desc: 'Dashboards that turn scattered data into decisions. Real-time metrics, clear visualizations and access from anywhere.',
    },
    web: { title: 'Web Apps', desc: 'Fast, responsive applications built for any screen.' },
    landing: {
      title: 'Landing Pages',
      desc: 'High-conversion pages with a strong identity and fast loading.',
    },
    api: { title: 'Integrations & APIs', desc: 'I connect systems, payments and external services without friction.' },
  },
  process: {
    eyebrow: 'Process',
    title: 'How the project comes to life',
    intro: 'A clear path, with frequent deliveries and you following every step.',
    steps: [
      {
        step: '01 — Discovery',
        title: 'Understand',
        desc: 'I dive into your problem, audience and goals before writing a single line of code.',
      },
      {
        step: '02 — Architecture',
        title: 'Plan',
        desc: 'I define the stack, flows and data structure. Transparent scope and realistic timelines.',
      },
      {
        step: '03 — Build',
        title: 'Develop',
        desc: 'Building in short cycles, with navigable versions and continuous feedback.',
      },
      {
        step: '04 — Deploy',
        title: 'Launch & care',
        desc: 'Publishing, monitoring and support to evolve the product safely.',
      },
    ],
  },
  projects: {
    eyebrow: 'Projects',
    title: 'Selected work',
    intro: 'A sample of the kind of product I build. Replace it with your own cases whenever you like.',
    placeholder: 'project screenshot · 16:10',
    items: [
      {
        kind: 'Dashboard · SaaS',
        title: 'Operations panel',
        desc: 'Real-time metrics and report automation for a logistics team.',
      },
      {
        kind: 'AI · Automation',
        title: 'Support assistant',
        desc: 'A bot that classifies and answers tickets, cutting response time in half.',
      },
      {
        kind: 'Web App · E-commerce',
        title: 'Custom store',
        desc: 'Sales platform with its own checkout and payment integrations.',
      },
    ],
  },
  cta: {
    eyebrow: 'Contact',
    title: "Let's build together",
    desc: "Tell me briefly what you want to create. I'll get back with a first technical direction and the next steps.",
    button: 'Get in touch',
  },
  footer: {
    brand: 'Custom software development — systems, dashboards and automations. Clean code, real performance.',
    navTitle: 'Navigate',
    servicesTitle: 'Services',
    contactTitle: 'Contact',
    links: { sistemas: 'Systems', ia: 'AI Automation', dashboards: 'Dashboards', landing: 'Landing Pages' },
    sendMessage: 'Send a message',
    copyright: '© 2026 Buiatti.com — Software Development',
    madeWith: 'Made with clean code in Brazil',
  },
  modal: {
    eyebrow: 'Contact',
    title: 'Tell me what you want to build',
    desc: "You'll receive a reply with a first technical direction and the next steps.",
    closeAria: 'Close contact',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    message: 'Message',
    namePh: 'Your name',
    emailPh: 'you@company.com',
    phonePh: '+1 (000) 000-0000',
    defaultMessage: "Hi, Buiatti.com. I'd like to talk about a software, dashboard or automation project.",
    sent: 'Message sent. Thanks for reaching out!',
    errorDefault: "We couldn't send your message right now.",
    submit: 'Send message',
    sending: 'Sending...',
  },
};

const it: Dict = {
  nav: {
    servicos: 'Servizi',
    processo: 'Processo',
    projetos: 'Progetti',
    cta: 'Avvia un progetto',
    navAria: 'Navigazione principale',
    contactAria: 'Contatto',
    langAria: 'Lingua',
  },
  hero: {
    sub: 'Software Development',
    copy1: 'Sistemi su misura, dashboard e automazioni.',
    copy2: 'Riduci il lavoro manuale e opera con più velocità.',
    primary: 'Avvia un progetto',
    ghost: 'Vedi i servizi',
    scroll: 'Scorri',
  },
  stats: { years: 'Anni di codice', custom: 'Su misura', direct: 'Assistenza diretta' },
  services: {
    eyebrow: 'Servizi',
    title: 'Ingegneria del software su misura',
    intro:
      "Dall'idea al deploy. Creo prodotti digitali con codice pulito, performance reali e focus sul problema giusto.",
    feature: {
      title: 'Sistemi & Piattaforme',
      desc: "Applicazioni web complete, dal back-end all'interfaccia. Architettura scalabile, integrazioni e pannelli di amministrazione pensati per crescere con la tua attività.",
      tag: 'Full-stack',
    },
    ai: {
      title: 'Automazioni con IA',
      desc: 'Flussi intelligenti che eliminano i compiti ripetitivi: estrazione dati, assistenza, classificazione e report generati automaticamente.',
    },
    bi: {
      title: 'Dashboard & BI',
      desc: 'Dashboard che trasformano dati dispersi in decisioni. Metriche in tempo reale, visualizzazioni chiare e accesso ovunque.',
    },
    web: { title: 'Web App', desc: 'Applicazioni veloci e responsive, pensate per ogni schermo.' },
    landing: {
      title: 'Landing Page',
      desc: "Pagine ad alta conversione con un'identità forte e caricamento rapido.",
    },
    api: { title: 'Integrazioni & API', desc: 'Collego sistemi, pagamenti e servizi esterni senza attriti.' },
  },
  process: {
    eyebrow: 'Processo',
    title: 'Come il progetto prende vita',
    intro: 'Un percorso chiaro, con consegne frequenti e te che segui ogni fase.',
    steps: [
      {
        step: '01 — Discovery',
        title: 'Capire',
        desc: 'Mi immergo nel tuo problema, nel pubblico e negli obiettivi prima di scrivere una riga di codice.',
      },
      {
        step: '02 — Architettura',
        title: 'Pianificare',
        desc: 'Definisco stack, flussi e struttura dei dati. Scope trasparente e tempi realistici.',
      },
      {
        step: '03 — Build',
        title: 'Sviluppare',
        desc: 'Costruzione in cicli brevi, con versioni navigabili e feedback continuo.',
      },
      {
        step: '04 — Deploy',
        title: 'Lanciare & curare',
        desc: 'Pubblicazione, monitoraggio e supporto per far evolvere il prodotto in sicurezza.',
      },
    ],
  },
  projects: {
    eyebrow: 'Progetti',
    title: 'Lavori selezionati',
    intro: 'Un assaggio del tipo di prodotto che costruisco. Sostituiscilo con i tuoi casi quando vuoi.',
    placeholder: 'screenshot del progetto · 16:10',
    items: [
      {
        kind: 'Dashboard · SaaS',
        title: 'Pannello operativo',
        desc: 'Metriche in tempo reale e automazione dei report per un team logistico.',
      },
      {
        kind: 'IA · Automazione',
        title: 'Assistente di supporto',
        desc: 'Un bot che classifica e risponde ai ticket, dimezzando i tempi di risposta.',
      },
      {
        kind: 'Web App · E-commerce',
        title: 'Negozio su misura',
        desc: 'Piattaforma di vendita con checkout proprio e integrazioni di pagamento.',
      },
    ],
  },
  cta: {
    eyebrow: 'Contatto',
    title: 'Costruiamo insieme',
    desc: 'Raccontami in breve cosa vuoi creare. Ti rispondo con una prima direzione tecnica e i prossimi passi.',
    button: 'Mettiti in contatto',
  },
  footer: {
    brand: 'Sviluppo software su misura — sistemi, dashboard e automazioni. Codice pulito, performance reali.',
    navTitle: 'Naviga',
    servicesTitle: 'Servizi',
    contactTitle: 'Contatto',
    links: { sistemas: 'Sistemi', ia: 'Automazione con IA', dashboards: 'Dashboard', landing: 'Landing Page' },
    sendMessage: 'Invia un messaggio',
    copyright: '© 2026 Buiatti.com — Software Development',
    madeWith: 'Fatto con codice pulito in Brasile',
  },
  modal: {
    eyebrow: 'Contatto',
    title: 'Raccontami cosa vuoi costruire',
    desc: 'Il messaggio arriva direttamente a me con la tua email e il telefono, e ti rispondo con una prima direzione tecnica.',
    closeAria: 'Chiudi contatto',
    name: 'Nome',
    email: 'Email',
    phone: 'Telefono',
    message: 'Messaggio',
    namePh: 'Il tuo nome',
    emailPh: 'tu@azienda.com',
    phonePh: '+39 000 000 0000',
    defaultMessage: 'Ciao, Buiatti.com. Vorrei parlare di un progetto di software, dashboard o automazione.',
    sent: 'Messaggio inviato. Grazie per il contatto!',
    errorDefault: 'Non è stato possibile inviare il messaggio ora.',
    submit: 'Invia messaggio',
    sending: 'Invio...',
  },
};

export const translations: Record<Lang, Dict> = { pt, en, it };

function isLang(value: string | null): value is Lang {
  return value === 'pt' || value === 'en' || value === 'it';
}

/** Map a country code to the supported language. Brazil → pt, Italy → it, anywhere else → en. */
export function countryToLang(country: string | null): Lang {
  if (country === 'BR') return 'pt';
  if (country === 'IT') return 'it';
  return 'en';
}

/** Best-effort language from the browser settings (used only when geolocation is unavailable). */
function navigatorLang(): Lang | null {
  const raw = (navigator.language || '').toLowerCase();
  if (raw.startsWith('pt')) return 'pt';
  if (raw.startsWith('it')) return 'it';
  if (raw.startsWith('en')) return 'en';
  return null;
}

/** Synchronous initial guess: explicit saved choice → browser language → English. */
export function getInitialLang(): Lang {
  try {
    const saved = localStorage.getItem('lang');
    if (isLang(saved)) return saved;
  } catch {
    /* localStorage may be unavailable */
  }
  return navigatorLang() ?? 'en';
}

export function hasSavedLang(): boolean {
  try {
    return isLang(localStorage.getItem('lang'));
  } catch {
    return false;
  }
}

export function saveLang(lang: Lang): void {
  try {
    localStorage.setItem('lang', lang);
  } catch {
    /* ignore */
  }
}

/** Detect the visitor's country via Cloudflare's edge trace endpoint. Returns null off Cloudflare. */
export async function detectCountry(): Promise<string | null> {
  try {
    const res = await fetch('/cdn-cgi/trace', { cache: 'no-store' });
    if (!res.ok) return null;
    const text = await res.text();
    const match = text.match(/^loc=([A-Z]{2})/m);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}
