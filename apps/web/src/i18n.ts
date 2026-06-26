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
    visit: string;
    liveExample: string;
    items: { id: string; kind: string; title: string; desc: string; url?: string; modalDesc?: string }[];
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
    intro: 'Alguns dos produtos que coloquei no ar — do web app à vitrine de portfólio. Clique para visitar.',
    visit: 'Ver projeto',
    liveExample: 'Ver exemplo ao vivo',
    items: [
      {
        id: 'playerson',
        kind: 'Web App · Esporte',
        title: 'Playerson',
        desc: 'Plataforma web para o universo do vôlei, com conteúdo em vídeo e pagamentos online.',
        url: 'https://playerson.com.br',
      },
      {
        id: 'tarso',
        kind: 'Portfólio · Arte',
        title: 'Tarso Art',
        desc: 'Site-portfólio de um quadrinista, reunindo ilustrações e trabalhos de arte em uma vitrine visual.',
        url: 'https://tarso-art.pages.dev',
      },
      {
        id: 'playerson-app',
        kind: 'Plataforma · SaaS',
        title: 'PlayersOn',
        desc: 'Perfis públicos de atletas com vídeos, QR code compartilhável e assinaturas Pro.',
        modalDesc:
          'PlayersOn, uma plataforma multilíngue (PT/IT/EN) de perfis públicos para atletas: cada jogador tem uma página única baseada em slug, reunindo dados, vídeos e informações de contato em um link compartilhável com QR code, com assinaturas Pro integradas ao Stripe e analytics nativo de visualizações e engajamento.',
      },
      {
        id: 'volleyplus',
        kind: 'Analytics · Esporte',
        title: 'VolleyPlus',
        desc: 'Sistema de análise de vôlei: processa dados de jogo, gera relatórios e apoia a análise de desempenho.',
        modalDesc:
          'VolleyPlus, um sistema de análise de vôlei para processar dados de partidas, gerar relatórios e apoiar a análise de desempenho.',
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
    madeWith: 'Feito com código limpo, café e muito trabalho.',
  },
  modal: {
    eyebrow: 'Contato',
    title: 'Conte o que você quer construir',
    desc: 'Você receberá uma resposta com um primeiro caminho técnico e os próximos passos.',
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
    intro: "A few of the products I've shipped — from web app to portfolio showcase. Click to visit.",
    visit: 'View project',
    liveExample: 'View live example',
    items: [
      {
        id: 'playerson',
        kind: 'Web App · Sports',
        title: 'Playerson',
        desc: 'A web platform for the volleyball world, with video content and online payments.',
        url: 'https://playerson.com.br',
      },
      {
        id: 'tarso',
        kind: 'Portfolio · Art',
        title: 'Tarso Art',
        desc: 'Portfolio site for a comic artist, showcasing illustrations and artwork in a visual gallery.',
        url: 'https://tarso-art.pages.dev',
      },
      {
        id: 'playerson-app',
        kind: 'Platform · SaaS',
        title: 'PlayersOn',
        desc: 'Public athlete profiles with videos, a shareable QR code and Pro subscriptions.',
        modalDesc:
          'PlayersOn, a multilingual (PT/IT/EN) public-profile platform for athletes: each player has a unique slug-based page combining data, videos, and contact information in a shareable link with QR code, with Stripe-integrated Pro subscriptions and built-in analytics for views and engagement.',
      },
      {
        id: 'volleyplus',
        kind: 'Analytics · Sports',
        title: 'VolleyPlus',
        desc: 'Volleyball analytics: processes match data, generates reports and supports performance analysis.',
        modalDesc:
          'VolleyPlus, a volleyball analytics system for processing match data, generating reports, and supporting performance analysis.',
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
    madeWith: 'Made with clean code, coffee and hard work.',
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
    intro: 'Alcuni dei prodotti che ho pubblicato — dalla web app alla vetrina di portfolio. Clicca per visitare.',
    visit: 'Vedi progetto',
    liveExample: 'Vedi un esempio dal vivo',
    items: [
      {
        id: 'playerson',
        kind: 'Web App · Sport',
        title: 'Playerson',
        desc: 'Una piattaforma web per il mondo del volley, con contenuti video e pagamenti online.',
        url: 'https://playerson.com.br',
      },
      {
        id: 'tarso',
        kind: 'Portfolio · Arte',
        title: 'Tarso Art',
        desc: "Sito-portfolio per un fumettista, con illustrazioni e opere d'arte in una vetrina visiva.",
        url: 'https://tarso-art.pages.dev',
      },
      {
        id: 'playerson-app',
        kind: 'Piattaforma · SaaS',
        title: 'PlayersOn',
        desc: 'Profili pubblici di atleti con video, QR code condivisibile e abbonamenti Pro.',
        modalDesc:
          'PlayersOn, una piattaforma multilingue (PT/IT/EN) di profili pubblici per atleti: ogni giocatore ha una pagina unica basata su slug, che combina dati, video e informazioni di contatto in un link condivisibile con QR code, con abbonamenti Pro integrati con Stripe e analytics integrato per visualizzazioni ed engagement.',
      },
      {
        id: 'volleyplus',
        kind: 'Analytics · Sport',
        title: 'VolleyPlus',
        desc: "Analisi di pallavolo: elabora i dati delle partite, genera report e supporta l'analisi delle prestazioni.",
        modalDesc:
          "VolleyPlus, un sistema di analisi di pallavolo per elaborare i dati delle partite, generare report e supportare l'analisi delle prestazioni.",
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
    madeWith: 'Fatto con codice pulito, caffè e tanto lavoro.',
  },
  modal: {
    eyebrow: 'Contatto',
    title: 'Raccontami cosa vuoi costruire',
    desc: 'Riceverai una risposta con una prima direzione tecnica e i prossimi passi.',
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
