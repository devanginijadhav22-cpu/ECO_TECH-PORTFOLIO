// High-performance dashboard renderer with offline fallback and inline multi-format support
// Supports: inline images (pledge-style), multi-page PDF documents, and live Vercel web embeds.

const DEFAULT_ASSIGNMENTS = [
  {
    "id": "A01",
    "title": "Assignment 1: Crossword",
    "course": "E-Waste Mastermind",
    "date": "2026-02-14",
    "status": "COMPLETE",
    "tags": ["Crossword", "E-Waste", "Interactive"],
    "summary": "Completed the E-Waste Mastermind crossword puzzle exploring e-waste terms, recycling practices, and state-wise statistics.",
    "type": "image",
    "image": "assets/img/crossword.jpg",
    "link": ""
  },
  {
    "id": "A02",
    "title": "Assignment 2: Quiz",
    "course": "E-Waste Recycling Quiz",
    "date": "2026-03-02",
    "status": "COMPLETE",
    "tags": ["Quiz", "Assessment", "100% Accuracy"],
    "summary": "Completed the E-waste recycling summary quiz on Wayground, achieving Rank 2/60 with a score of 6900 and 100% accuracy.",
    "type": "image",
    "image": "assets/img/quiz.jpg",
    "link": ""
  },
  {
    "id": "A03",
    "title": "Assignment 3: Video Task",
    "course": "E-Waste Awareness",
    "date": "2026-04-10",
    "status": "COMPLETE",
    "tags": ["Video", "Awareness", "E-Waste"],
    "summary": "Created an e-waste awareness video task highlighting the environmental impact of electronic waste and responsible disposal practices.",
    "type": "image",
    "image": "assets/img/Video task.jpeg",
    "link": ""
  },
  {
    "id": "A04",
    "title": "Assignment 4: Device Anatomy",
    "course": "E-Waste Analysis",
    "date": "2026-05-18",
    "status": "COMPLETE",
    "tags": ["Device Anatomy", "PDF Report", "Hardware Analysis", "7 Pages"],
    "summary": "Detailed analysis of device anatomy — exploring internal components, material composition, hazards, and recyclability of electronic devices.",
    "type": "pdf-pages",
    "pdf": "assets/pdf/device-anatomy.pdf",
    "pages": [
      "assets/img/device-anatomy-page-1.jpg",
      "assets/img/device-anatomy-page-2.jpg",
      "assets/img/device-anatomy-page-3.jpg",
      "assets/img/device-anatomy-page-4.jpg",
      "assets/img/device-anatomy-page-5.jpg",
      "assets/img/device-anatomy-page-6.jpg",
      "assets/img/device-anatomy-page-7.jpg"
    ],
    "link": "assets/pdf/device-anatomy.pdf"
  },
  {
    "id": "A05",
    "title": "Assignment 5: Analysis Dashboard",
    "course": "E-Waste Data Visualization",
    "date": "2026-06-25",
    "status": "COMPLETE",
    "tags": ["Analysis Dashboard", "Live Web App", "Vercel", "Visualization"],
    "summary": "Interactive e-waste analysis dashboard deployed on Vercel — featuring real-time data visualisations, statistics, and sustainability metrics across regions.",
    "type": "iframe",
    "embedUrl": "https://e-waste-dashboard-kappa.vercel.app/",
    "link": "https://e-waste-dashboard-kappa.vercel.app/"
  }
];

// Active page trackers for multi-page assignments
const assignmentPageTrackers = {};

async function loadAssignments() {
  const grid = document.getElementById('assignments-grid');
  const emptyState = document.getElementById('assignments-empty');
  const statTotal = document.getElementById('stat-total');
  const statComplete = document.getElementById('stat-complete');
  const statProgress = document.getElementById('stat-progress');

  let assignments = DEFAULT_ASSIGNMENTS;

  try {
    const res = await fetch(`assets/data/assignments.json?_t=${Date.now()}`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        assignments = data;
      }
    }
  } catch (err) {
    console.warn('Fetch failed (likely file:// protocol), using built-in assignments data', err);
  }

  if (!assignments || !assignments.length) {
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (statTotal) statTotal.textContent = assignments.length;
  if (statComplete) statComplete.textContent = assignments.filter(a => a.status === 'COMPLETE').length;
  if (statProgress) statProgress.textContent = assignments.filter(a => a.status !== 'COMPLETE').length;

  if (grid) {
    grid.innerHTML = assignments.map(renderCard).join('');
  }
  setupLightboxListeners();
}

function renderCard(a) {
  const statusColor = a.status === 'COMPLETE'
    ? 'text-primary-fixed-dim border-primary-fixed-dim/40 bg-primary-fixed-dim/10'
    : 'text-secondary-fixed-dim border-secondary-fixed-dim/40 bg-secondary-fixed-dim/10';

  const tags = (a.tags || []).map(
    t => `<span class="font-label-sm text-[11px] uppercase tracking-widest text-on-surface-variant border border-outline-variant px-2 py-0.5 bg-surface-container-low">${escapeHtml(t)}</span>`
  ).join('');

  const dateLabel = a.date
    ? new Date(a.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })
    : '';

  const titleInner = escapeHtml(a.title || 'Untitled Assignment');
  const titleHtml = a.link
    ? `<a href="${escapeAttr(a.link)}" class="hover:text-primary-fixed-dim transition-colors" target="_blank" rel="noopener">${titleInner}</a>`
    : titleInner;

  let contentHtml = '';
  const type = (a.type || '').toLowerCase();

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. MULTI-PAGE PDF AS INLINE IMAGES (Assignment 4 Device Anatomy)
  // ─────────────────────────────────────────────────────────────────────────────
  if (type === 'pdf-pages' && a.pages && a.pages.length > 0) {
    const cardId = escapeAttr(a.id);
    const pages = a.pages;
    const initialPage = 0;
    assignmentPageTrackers[a.id] = { current: 0, total: pages.length, pages };

    const pageButtons = pages.map((p, idx) => `
      <button
        onclick="switchAssignmentPage('${cardId}', ${idx})"
        id="btn-page-${cardId}-${idx}"
        class="page-tab-btn px-2.5 py-1 text-[11px] font-label-sm uppercase tracking-wider rounded border transition-all ${idx === 0 ? 'bg-primary-fixed-dim text-on-primary-fixed font-bold border-primary-fixed-dim shadow-sm' : 'bg-surface-container text-on-surface-variant border-outline-variant/60 hover:text-primary hover:border-outline'}"
      >
        P.${idx + 1}
      </button>
    `).join('');

    contentHtml = `
    <div class="mb-4 border border-[#f59e0b]/40 bg-surface-container-lowest rounded-lg overflow-hidden shadow-xl">
      <!-- Header bar with page count and direct PDF links -->
      <div class="flex flex-wrap items-center justify-between gap-2 px-3 py-2 border-b border-outline-variant/40 bg-surface-container-highest/80">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-[16px] text-[#f59e0b]">auto_stories</span>
          <span class="font-label-sm text-[11px] text-primary font-bold uppercase tracking-widest">
            INLINE DOCUMENT // ${pages.length} PAGES
          </span>
          <span id="page-indicator-${cardId}" class="ml-1 text-[11px] font-label-sm text-[#f59e0b] px-2 py-0.5 bg-[#f59e0b]/10 border border-[#f59e0b]/30 rounded">
            PAGE 1 OF ${pages.length}
          </span>
        </div>
        <div class="flex items-center gap-2">
          ${a.pdf ? `
            <a href="${escapeAttr(a.pdf)}" target="_blank" rel="noopener"
               class="inline-flex items-center gap-1.5 text-[11px] font-label-sm bg-[#f59e0b]/15 text-[#fbbf24] border border-[#f59e0b]/40 hover:bg-[#f59e0b]/30 px-3 py-1 rounded transition-colors uppercase tracking-widest font-semibold">
              <span class="material-symbols-outlined text-[14px]">picture_as_pdf</span> Open Original PDF
            </a>
          ` : ''}
        </div>
      </div>

      <!-- Quick page navigator bar -->
      <div class="flex items-center gap-1.5 px-3 py-2 bg-surface-container-low/90 border-b border-outline-variant/30 overflow-x-auto">
        <span class="text-[10px] font-label-sm text-on-surface-variant uppercase tracking-wider mr-1">JUMP TO:</span>
        ${pageButtons}
        <button
          onclick="toggleAllPagesView('${cardId}')"
          id="btn-toggle-all-${cardId}"
          class="ml-auto text-[10px] font-label-sm text-secondary-fixed-dim hover:text-primary uppercase tracking-widest border border-secondary-fixed-dim/40 px-2 py-1 rounded bg-secondary-fixed-dim/10 hover:bg-secondary-fixed-dim/20 transition-colors whitespace-nowrap"
        >
          View All 7 Pages Stacked ↓
        </button>
      </div>

      <!-- Single Page Viewer (Pledge-style, fully visible inline) -->
      <div id="single-page-view-${cardId}" class="p-2 sm:p-4 bg-surface-container-lowest relative flex flex-col items-center">
        <div class="relative w-full max-w-3xl mx-auto cursor-pointer group"
             onclick="openImageLightbox(document.getElementById('page-img-${cardId}').src, '${escapeAttr(a.title)} - Page ' + (assignmentPageTrackers['${cardId}'].current + 1))">
          <img
            id="page-img-${cardId}"
            src="${escapeAttr(pages[0])}"
            alt="Device Anatomy - Page 1"
            class="w-full h-auto max-h-[850px] object-contain block mx-auto rounded border border-outline-variant/50 shadow-2xl transition-transform duration-300 group-hover:scale-[1.005]"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none rounded">
            <span class="bg-surface/90 text-primary px-3.5 py-1.5 rounded-full text-xs font-label-sm flex items-center gap-2 shadow-2xl border border-primary-fixed-dim/60 backdrop-blur-md">
              <span class="material-symbols-outlined text-[16px] text-primary-fixed-dim">zoom_in</span> Click to enlarge
            </span>
          </div>
        </div>

        <!-- Prev / Next Controls -->
        <div class="flex items-center justify-between w-full max-w-3xl mt-3 pt-2 border-t border-outline-variant/30">
          <button
            onclick="prevAssignmentPage('${cardId}')"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-label-sm uppercase tracking-wider text-on-surface hover:text-primary bg-surface-container border border-outline-variant rounded hover:border-primary transition-colors"
          >
            <span class="material-symbols-outlined text-[16px]">arrow_back</span> Prev Page
          </button>
          <span id="page-footer-label-${cardId}" class="text-xs font-label-sm text-on-surface-variant font-medium">
            Page 1 of ${pages.length}
          </span>
          <button
            onclick="nextAssignmentPage('${cardId}')"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-label-sm uppercase tracking-wider text-on-surface hover:text-primary bg-surface-container border border-outline-variant rounded hover:border-primary transition-colors"
          >
            Next Page <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>

      <!-- All Pages Stacked View (hidden by default) -->
      <div id="all-pages-view-${cardId}" class="hidden p-3 bg-surface-container-lowest space-y-4">
        ${pages.map((p, idx) => `
          <div class="border border-outline-variant/40 rounded p-2 bg-surface-container-low">
            <div class="flex justify-between items-center text-[11px] font-label-sm text-[#f59e0b] mb-2 px-1">
              <span>PAGE ${idx + 1} OF ${pages.length}</span>
              <a href="${escapeAttr(p)}" target="_blank" class="hover:underline flex items-center gap-1">Open Image <span class="material-symbols-outlined text-[12px]">open_in_new</span></a>
            </div>
            <img src="${escapeAttr(p)}" alt="Page ${idx + 1}" class="w-full h-auto max-h-[850px] object-contain rounded mx-auto border border-outline-variant/40" loading="lazy" />
          </div>
        `).join('')}
      </div>
    </div>`;

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. LIVE VERCEL WEB DASHBOARD (Assignment 5 Analysis Dashboard)
  // ─────────────────────────────────────────────────────────────────────────────
  } else if (type === 'iframe' && a.embedUrl) {
    const vercelUrl = escapeAttr(a.embedUrl);
    contentHtml = `
    <div class="mb-5 border-2 border-secondary-fixed-dim/40 bg-surface-container-lowest rounded-lg overflow-hidden shadow-2xl">
      <!-- PROMINENT VERCEL LINK BANNER (Explicitly visible link requested) -->
      <div class="p-4 bg-gradient-to-r from-surface-container-high via-surface-container to-surface-container-high border-b border-secondary-fixed-dim/30">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div class="flex items-center gap-2 mb-1.5">
              <span class="w-2.5 h-2.5 rounded-full bg-[#00e471] animate-pulse"></span>
              <span class="font-label-sm text-[11px] uppercase tracking-widest text-[#00e471] font-bold">
                LIVE PRODUCTION WEB APP
              </span>
              <span class="text-[10px] font-label-sm bg-surface-container-highest px-2 py-0.5 rounded text-secondary-fixed-dim border border-secondary-fixed-dim/30">
                VERCEL DEPLOYMENT
              </span>
            </div>
            <!-- Prominent Link Text Display -->
            <div class="flex items-center gap-2 mt-1">
              <span class="material-symbols-outlined text-secondary-fixed-dim text-[18px]">link</span>
              <a href="${vercelUrl}" target="_blank" rel="noopener"
                 class="font-label-sm text-[14px] sm:text-[16px] text-secondary-fixed-dim hover:text-primary font-bold underline underline-offset-4 break-all transition-colors">
                ${vercelUrl}
              </a>
            </div>
          </div>

          <!-- Direct Launch Button -->
          <div class="flex items-center gap-2 shrink-0">
            <a href="${vercelUrl}" target="_blank" rel="noopener"
               class="inline-flex items-center justify-center gap-2 bg-secondary-fixed-dim text-[#001f24] hover:bg-primary font-label-sm text-[12px] font-bold uppercase tracking-wider px-4 py-2.5 rounded shadow-lg transition-all transform hover:-translate-y-0.5">
              <span>Open Vercel App</span>
              <span class="material-symbols-outlined text-[16px]">open_in_new</span>
            </a>
            <button
              onclick="navigator.clipboard.writeText('${vercelUrl}'); this.textContent = 'Copied!'; setTimeout(() => this.textContent = 'Copy', 1500);"
              class="font-label-sm text-[11px] text-on-surface-variant hover:text-primary border border-outline-variant px-3 py-2 rounded bg-surface-container hover:bg-surface-container-highest transition-colors uppercase tracking-wider"
              title="Copy URL"
            >
              Copy
            </button>
          </div>
        </div>
      </div>

      <!-- Live Interactive Web Preview -->
      <div class="border-t border-outline-variant/30">
        <div class="flex items-center justify-between px-3 py-1.5 bg-surface-container-highest/60 border-b border-outline-variant/30 text-[10px] font-label-sm text-on-surface-variant">
          <div class="flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[14px] text-secondary-fixed-dim">preview</span>
            <span class="uppercase tracking-widest">LIVE EMBEDDED PREVIEW</span>
          </div>
          <span class="opacity-70">Interactive inside container</span>
        </div>
        <div class="relative w-full bg-surface-container-lowest" style="height: 650px;">
          <iframe
            src="${vercelUrl}"
            title="${escapeAttr(a.title || 'Analysis Dashboard')}"
            class="w-full h-full border-0"
            loading="lazy"
            allow="fullscreen; clipboard-write"
            style="height: 650px;"
          ></iframe>
        </div>
      </div>
    </div>`;

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. INLINE IMAGE (Crossword, Quiz, Video Task) - Pledge Poster Style
  // ─────────────────────────────────────────────────────────────────────────────
  } else if (a.image) {
    contentHtml = `
    <div class="mb-4 border border-primary-fixed-dim/30 bg-surface-container-lowest rounded-lg overflow-hidden shadow-inner group relative">
      <div class="flex items-center justify-between px-3 py-1.5 border-b border-outline-variant/40 bg-surface-container-highest/60">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-[14px] text-primary-fixed-dim">image</span>
          <span class="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-widest">
            INLINE IMAGE // TASK SUBMISSION
          </span>
        </div>
        <span class="font-label-sm text-[10px] text-primary-fixed-dim/80 uppercase tracking-widest">
          COMPLETE VIEW
        </span>
      </div>
      <div class="p-2 sm:p-3 flex items-center justify-center bg-surface-container-lowest relative cursor-pointer"
           onclick="openImageLightbox('${escapeAttr(a.image)}', '${escapeAttr(a.title || '')}')">
        <img
          src="${escapeAttr(a.image)}"
          alt="${escapeAttr(a.title || 'Assignment Image')}"
          class="w-full h-auto max-h-[700px] object-contain block mx-auto rounded transition-transform duration-300 group-hover:scale-[1.01]"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-background/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span class="bg-surface/90 text-primary px-3.5 py-1.5 rounded-full text-xs font-label-sm flex items-center gap-2 shadow-2xl border border-primary-fixed-dim/60 backdrop-blur-md">
            <span class="material-symbols-outlined text-[16px] text-primary-fixed-dim">zoom_in</span> Click to enlarge
          </span>
        </div>
      </div>
    </div>`;
  }

  // ── External link button if available and not redundant ───────────────────────
  const linkBtn = (a.link && type !== 'iframe' && type !== 'pdf-pages')
    ? `<a href="${escapeAttr(a.link)}" target="_blank" rel="noopener"
         class="inline-flex items-center gap-1.5 mt-3 text-[11px] font-label-sm uppercase tracking-widest text-primary-fixed-dim border border-primary-fixed-dim/40 px-3 py-1 hover:bg-primary-fixed-dim/10 transition-colors">
         <span class="material-symbols-outlined text-[14px]">open_in_new</span> Open Link
       </a>`
    : '';

  return `
    <article class="border border-slate-800 bg-surface-container p-4 sm:p-6 relative rounded-none hover:border-outline-variant transition-colors border-l-4 border-l-primary-fixed-dim/30 hover:border-l-primary-fixed-dim shadow-lg">
      <div class="flex justify-between items-start mb-2">
        <span class="font-data-display text-[12px] px-2 py-0.5 border ${statusColor} flex items-center gap-1.5 font-bold">
          <span class="material-symbols-outlined text-[14px]">folder_open</span>
          ${escapeHtml(a.status || 'COMPLETE')}
        </span>
        <span class="font-label-sm text-label-sm text-on-surface-variant opacity-60 font-bold tracking-widest">${escapeHtml(a.id || '')}</span>
      </div>

      <h3 class="font-headline-lg-mobile text-[20px] sm:text-[24px] font-bold text-primary mb-1 leading-snug">${titleHtml}</h3>
      <p class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-4">${escapeHtml(a.course || '')} ${dateLabel ? '// ' + dateLabel : ''}</p>

      ${contentHtml}

      <p class="font-body-md text-body-md text-on-surface-variant mb-3 opacity-90 leading-relaxed">${escapeHtml(a.summary || '')}</p>
      <div class="flex flex-wrap gap-2">${tags}</div>
      ${linkBtn}
    </article>
  `;
}

// ── Multi-page Document Controller ───────────────────────────────────────────────
function switchAssignmentPage(cardId, pageIndex) {
  const tracker = assignmentPageTrackers[cardId];
  if (!tracker) return;

  tracker.current = pageIndex;
  const img = document.getElementById(`page-img-${cardId}`);
  if (img) img.src = tracker.pages[pageIndex];

  const indicator = document.getElementById(`page-indicator-${cardId}`);
  if (indicator) indicator.textContent = `PAGE ${pageIndex + 1} OF ${tracker.total}`;

  const footer = document.getElementById(`page-footer-label-${cardId}`);
  if (footer) footer.textContent = `Page ${pageIndex + 1} of ${tracker.total}`;

  // Update active button state
  tracker.pages.forEach((_, idx) => {
    const btn = document.getElementById(`btn-page-${cardId}-${idx}`);
    if (btn) {
      if (idx === pageIndex) {
        btn.className = "page-tab-btn px-2.5 py-1 text-[11px] font-label-sm uppercase tracking-wider rounded border transition-all bg-primary-fixed-dim text-on-primary-fixed font-bold border-primary-fixed-dim shadow-sm";
      } else {
        btn.className = "page-tab-btn px-2.5 py-1 text-[11px] font-label-sm uppercase tracking-wider rounded border transition-all bg-surface-container text-on-surface-variant border-outline-variant/60 hover:text-primary hover:border-outline";
      }
    }
  });
}

function prevAssignmentPage(cardId) {
  const tracker = assignmentPageTrackers[cardId];
  if (!tracker) return;
  const nextIdx = (tracker.current - 1 + tracker.total) % tracker.total;
  switchAssignmentPage(cardId, nextIdx);
}

function nextAssignmentPage(cardId) {
  const tracker = assignmentPageTrackers[cardId];
  if (!tracker) return;
  const nextIdx = (tracker.current + 1) % tracker.total;
  switchAssignmentPage(cardId, nextIdx);
}

function toggleAllPagesView(cardId) {
  const singleView = document.getElementById(`single-page-view-${cardId}`);
  const allView = document.getElementById(`all-pages-view-${cardId}`);
  const btn = document.getElementById(`btn-toggle-all-${cardId}`);

  if (singleView && allView && btn) {
    if (allView.classList.contains('hidden')) {
      allView.classList.remove('hidden');
      singleView.classList.add('hidden');
      btn.textContent = 'Switch to Single Page View ↑';
    } else {
      allView.classList.add('hidden');
      singleView.classList.remove('hidden');
      btn.textContent = 'View All 7 Pages Stacked ↓';
    }
  }
}

// ── Image Lightbox ─────────────────────────────────────────────────────────────
function openImageLightbox(imgSrc, title) {
  const modal = document.getElementById('assignment-modal');
  const modalImg = document.getElementById('assignment-modal-img');
  const modalTitle = document.getElementById('assignment-modal-title');
  if (modal && modalImg && modalTitle) {
    modalImg.src = imgSrc;
    modalTitle.textContent = title;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }
}

function setupLightboxListeners() {
  const modal = document.getElementById('assignment-modal');
  const closeBtn = document.getElementById('close-assignment-modal');
  if (modal && closeBtn) {
    const closeModal = () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = '';
    };
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
    });
  }
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
function escapeAttr(str) {
  return String(str || '').replace(/"/g, '&quot;');
}

document.addEventListener('DOMContentLoaded', loadAssignments);
