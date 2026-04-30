/* ============================================
   HUB DUFRIO — MODERNIZADO JS ENGINE
   GSAP ScrollTrigger + Interatividade Premium
   ============================================ */

// === SVG ICON LIBRARY ===
const ICONS = {
  box3d: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`,
  corte: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>`,
  checklist: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>`,
  comparar: `<svg viewBox="0 0 24 24" fill="none"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
  precificar: `<svg viewBox="0 0 24 24" fill="none"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line><line x1="6" y1="18" x2="18" y2="6"></line></svg>`,
  cotar: `<svg viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
  filtro: `<svg viewBox="0 0 24 24" fill="none"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>`,
  download: `<svg viewBox="0 0 24 24" fill="none"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`,
  scraperClimario: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><polyline points="8 11 10 13 14 9"/></svg>`,
  arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>`
};

// === TOOL DATA ===
const ferramentas = [
  { nome: "SIMULADOR DE GABINETE 3D", desc: "Visualização 3D e cálculo de painéis (PIR/EPS) para câmaras.", arquivo: "simulador-gabinete.html", icone: ICONS.box3d, color: "#4facfe", slug: "gabinete", category: "camara" },
  { nome: "PLANO DE CORTE - PAINÉIS", desc: "Otimização de cortes de painéis EPS/PIR para melhor aproveitamento das chapas de 12m.", arquivo: "plano-corte.html", icone: ICONS.corte, color: "#f97316", slug: "corte", category: "camara" },
  { nome: "CHECKLIST CÂMARAS FRIAS - GERAR PDF", desc: "Formulário passo-a-passo. Geração de PDF para orçamento de câmara frigorífica.", arquivo: "CheckList.html", icone: ICONS.checklist, color: "#10b981", slug: "checklist", category: "camara" },
  { nome: "SCRAPER DE AR CONDICIONADO", desc: "Varredura automática e direta no site da Dufrio via proxy.", arquivo: "scraper-ar.html", icone: ICONS.search, color: "#f59e0b", slug: "scraper", category: "ar" },
  { nome: "COMPARADOR DE AR-CONDICIONADO", desc: "Análise de preços da concorrência em tempo real.", arquivo: "comparador-ar.html", icone: ICONS.comparar, color: "#6366f1", slug: "comparador", category: "ar" },
  { nome: "PREÇOS AO VIVO", badge: "Em Produção", desc: "Visualiza em cards os produtos raspados pela extensão das abas abertas nas lojas.", arquivo: "precos-ao-vivo.html", icone: ICONS.clock, color: "#00e676", slug: "precos-vivo", category: "ar" },
  { nome: "PRECIFICAÇÃO SKU'S (SITE)", desc: "Calculadora para precificar SKU's no 365 com o valor do site.", arquivo: "precificacao-ar.html", icone: ICONS.precificar, color: "#0ea5e9", slug: "precificacao", category: "ar" },
  { nome: "SCRAPER CLIMARIO", desc: "Extração direta de produtos do site ClimaRio via URL.", arquivo: "scraper-climario.html", icone: ICONS.scraperClimario, color: "#f59e0b", slug: "scraper-climario", category: "ar" },
  { nome: "COTAÇÃO EXPRESS", desc: "Orçamento rápido para infra-estrutura de ar condicionado.", arquivo: "cotacoes.html", icone: ICONS.cotar, color: "#8b5cf6", slug: "cotacao", category: "outros" },
  { nome: "EXTRAÇÃO DE CÓDIGOS", desc: "Extração de códigos que constam quantidade em estoque.", arquivo: "itens-quantidade.html", icone: ICONS.filtro, color: "#d946ef", slug: "extracao", category: "outros" },
  { nome: "BAIXAR PROJETO", desc: "Baixar projeto e arquivos da extensão.", arquivo: "https://github.com/crftwoo/thiago.luz.dufrio/archive/refs/heads/main.zip", icone: ICONS.download, color: "#94a3b8", isDownload: true, slug: "download", category: "outros" }
];

// === PAGE LOADER ===
window.addEventListener('load', () => {
  const loader = document.querySelector('.page-loader');
  if (loader) {
    setTimeout(() => loader.classList.add('loaded'), 300);
    setTimeout(() => loader.remove(), 1000);
  }
  initApp();
});

// === MAIN INIT ===
function initApp() {
  renderCards();
  initScrollProgress();
  initCursorGlow();
  initGSAPAnimations();
  loadLastUpdate();
}

// === RENDER CARDS ===
function renderCards() {
  const gridC = document.getElementById('gridCamara');
  const gridA = document.getElementById('gridAr');
  const gridO = document.getElementById('gridOutros');

  ferramentas.forEach((f, idx) => {
    const card = document.createElement('div');
    card.className = 'bento-card reveal-up';
    card.dataset.id = f.slug;
    card.style.setProperty('--card-color', f.color);
    card.onclick = () => openTool(idx);
    card.innerHTML = `
      <div class="card-top">
        <div class="icon-box">${f.icone}</div>
        ${f.badge ? `<div class="badge">${f.badge}</div>` : ''}
      </div>
      <div>
        <div class="card-title">${f.nome}</div>
        <div class="card-desc">${f.desc}</div>
      </div>
      <div class="card-arrow">${ICONS.arrow}</div>
    `;
    if (f.category === 'camara') gridC.appendChild(card);
    else if (f.category === 'ar') gridA.appendChild(card);
    else gridO.appendChild(card);
  });
}

function openTool(index) {
  const f = ferramentas[index];
  if (f.isDownload) {
    if (confirm('Baixar projeto e a extensão zipada?')) {
      const l = document.createElement("a");
      l.href = f.arquivo; l.download = "extensao-dufrio.zip";
      document.body.appendChild(l); l.click(); l.remove();
    }
    return;
  }
  window.location.href = f.arquivo;
}

// === SCROLL PROGRESS BAR ===
function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (scrollTop / docHeight * 100) + '%';
  }, { passive: true });
}

// === CURSOR GLOW ===
function initCursorGlow() {
  const glow = document.querySelector('.cursor-glow');
  if (!glow || window.innerWidth < 768) return;
  let mx = 0, my = 0, cx = 0, cy = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  function animate() {
    cx += (mx - cx) * 0.08;
    cy += (my - cy) * 0.08;
    glow.style.left = cx + 'px';
    glow.style.top = cy + 'px';
    requestAnimationFrame(animate);
  }
  animate();
}

// === GSAP ANIMATIONS ===
function initGSAPAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    // Fallback: show everything without animation
    document.querySelectorAll('.header, .section-wrapper, .scroll-horizontal-section, .meta-footer, .reveal-up, .reveal-left, .reveal-scale').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Header reveal
  gsap.to('.header', {
    opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.4
  });

  // Section wrappers stagger
  gsap.utils.toArray('.section-wrapper').forEach((section) => {
    gsap.to(section, {
      opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 88%', toggleActions: 'play none none none' }
    });

    // Cards inside each section
    const cards = section.querySelectorAll('.bento-card');
    gsap.to(cards, {
      opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1,
      scrollTrigger: { trigger: section, start: 'top 85%', toggleActions: 'play none none none' }
    });
  });

  // Horizontal scroll section
  const hSection = document.querySelector('.scroll-horizontal-section');
  if (hSection) {
    gsap.to(hSection, {
      opacity: 1, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: hSection, start: 'top 90%', toggleActions: 'play none none none' }
    });

    const track = hSection.querySelector('.scroll-track');
    if (track) {
      const totalScroll = track.scrollWidth - hSection.offsetWidth;
      gsap.to(track, {
        x: () => -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: hSection,
          start: 'top center',
          end: () => '+=' + totalScroll,
          scrub: 1.2,
          pin: false,
          invalidateOnRefresh: true
        }
      });
    }
  }

  // Footer
  gsap.to('.meta-footer', {
    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: '.meta-footer', start: 'top 92%', toggleActions: 'play none none none' }
  });
}

// === LAST UPDATE PANEL ===
const updatesData = {
  updates: [
    { date: "30/04/2026", time: "16:50", title: "Redesign Premium: Index Modernizado", description: "Novo index com GSAP ScrollTrigger, design cinematográfico premium, scroll magnético horizontal, cursor glow, JSON-LD e LLMO semântico completo." }
  ]
};

async function loadLastUpdate() {
  try {
    // Load dynamic Git log
    const logScript = document.createElement('script');
    logScript.src = 'ultimo_log.js?v=' + Date.now();
    document.head.appendChild(logScript);

    await new Promise(r => setTimeout(r, 500));

    if (typeof LATEST_LOG !== 'undefined') {
      const latest = LATEST_LOG;
      const dateObj = new Date(latest.dateIso);
      const dateStr = dateObj.toLocaleDateString('pt-BR');
      const timeStr = dateObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      document.getElementById('update-title').textContent = 'Última Sincronização Git';
      document.getElementById('update-desc').textContent = latest.message;
      document.getElementById('update-datetime').innerHTML = `
        <div style="font-weight:600;color:#4facfe;margin-bottom:4px;">📅 ${dateStr}</div>
        <div style="font-weight:700;color:#00e676;">⏰ ${timeStr}</div>`;
      return;
    }

    // Fallback
    const latest = updatesData.updates[0];
    document.getElementById('update-title').textContent = latest.title;
    document.getElementById('update-desc').textContent = latest.description;
    document.getElementById('update-datetime').innerHTML = `
      <div style="font-weight:600;color:#4facfe;margin-bottom:4px;">📅 ${latest.date}</div>
      <div style="font-weight:700;color:#00e676;">⏰ ${latest.time}</div>`;
  } catch(e) {
    console.error('Erro ao carregar atualizações:', e);
  }
}
