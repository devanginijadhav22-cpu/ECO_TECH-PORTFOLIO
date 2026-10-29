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
  },
  {
    "id": "A06",
    "title": "Assignment 6: E-Waste Hackathon",
    "course": "Smart E-Waste Systems & Hackathon Project",
    "date": "2026-07-15",
    "status": "COMPLETE",
    "tags": ["Hackathon", "E-Waste", "ReMat Platform", "AI Detection", "Live Web App", "Vercel"],
    "summary": "Smart e-waste recycling platform built for hackathon competition — featuring AI-powered waste detection, smart bin network tracking, Groq AI assistant, and gamified recycling rewards deployed live on Vercel.",
    "type": "iframe",
    "embedUrl": "https://remat-e-waste.vercel.app/",
    "link": "https://remat-e-waste.vercel.app/"
  },
  {
    "id": "A07",
    "title": "Assignment 7: E-Waste Awareness Campaign",
    "course": "Community Outreach & Sustainability Drive",
    "date": "2026-08-05",
    "status": "COMPLETE",
    "role": "Myth Buster Quiz Host",
    "tags": ["Campaign", "Myth Busters", "Quiz Host", "Outreach", "Poster Series", "Interactive"],
    "summary": "Spearheaded the campus E-Waste Awareness Campaign as the official Myth Buster Quiz Host — actively educating and engaging participants through live myth-busting sessions and an original 5-part research-backed visual poster series addressing common misconceptions about electronics disposal.",
    "type": "campaign-showcase",
    "posters": [
      {
        "id": "myth-06",
        "number": "MYTH 06",
        "title": "Tiny Gadgets",
        "myth": "A single wireless earbud is too small to count as e-waste.",
        "truth": "Small Device. Big Impact. Contains critical lithium, cobalt, and toxic components.",
        "image": "assets/img/myth-06-tiny-gadgets.png"
      },
      {
        "id": "myth-07",
        "number": "MYTH 07",
        "title": "Gold in Phones",
        "myth": "Every old smartphone contains enough gold to buy a new smartphone.",
        "truth": "Precious Materials Deserve a Second Life — only trace amounts, viable at industrial scale.",
        "image": "assets/img/myth-07-gold-in-phones.jpg"
      },
      {
        "id": "myth-08",
        "number": "MYTH 08",
        "title": "Working Electronics",
        "myth": "A device cannot be e-waste if it still switches on.",
        "truth": "Working Doesn't Mean Worthless — repair, refurbish, or recycle responsibly.",
        "image": "assets/img/myth-08-working-electronics.jpg"
      },
      {
        "id": "myth-09",
        "number": "MYTH 09",
        "title": "Perfect Recycling",
        "myth": "Recycling centres recover 100% of every electronic device.",
        "truth": "Recycling Isn't Perfect — But It Matters. Proper e-waste facilities maximize recovery.",
        "image": "assets/img/myth-09-perfect-recycling.jpg"
      },
      {
        "id": "myth-10",
        "number": "MYTH 10",
        "title": "Old Chargers",
        "myth": "Old chargers are just cables, so they aren't e-waste.",
        "truth": "A Charger Is Electronics Too — packed with circuit boards and recoverable copper.",
        "image": "assets/img/myth-10-old-chargers.jpg"
      }
    ],
    "eventPhotos": [
      {
        "id": "photo-01",
        "title": "Team Briefing & Poster Review",
        "caption": "Students and coordinators examining the newly printed E-Waste Myth Busters posters and informational flyers before the live quiz drive.",
        "thumb": "assets/event/thumb_IMG_0271.jpg",
        "full": "assets/event/full_IMG_0271.jpg",
        "tag": "TEAM & POSTERS"
      },
      {
        "id": "photo-02",
        "title": "Devangini Hosting Faculty & Students",
        "caption": "Devangini actively engaging faculty members and students at the awareness kiosk, introducing the Myth Busters quiz game and explaining proper disposal routes.",
        "thumb": "assets/event/thumb_IMG_0295.jpg",
        "full": "assets/event/full_IMG_0295.jpg",
        "tag": "QUIZ HOST IN ACTION"
      },
      {
        "id": "photo-03",
        "title": "Interactive Discussion at the Kiosk",
        "caption": "Deep-dive discussions at the campaign table with students analyzing the 5 myth posters and debunking misconceptions around working electronics.",
        "thumb": "assets/event/thumb_IMG_0303.jpg",
        "full": "assets/event/full_IMG_0303.jpg",
        "tag": "LIVE ENGAGEMENT"
      },
      {
        "id": "photo-04",
        "title": "Audience Scanning E-Waste IQ Quiz",
        "caption": "A participant scanning the live E-Waste IQ QR code on mobile to participate in the interactive quiz challenges hosted during the campaign.",
        "thumb": "assets/event/thumb_IMG_0361.jpg",
        "full": "assets/event/full_IMG_0361.jpg",
        "tag": "QR CODE SCAN"
      }
    ],
    "eventVideos": [
      {
        "id": "video-01",
        "title": "Live Quiz Session — Kickoff",
        "caption": "Devangini presenting e-waste myth busting questions to gathered students at the campaign kiosk.",
        "src": "assets/event/IMG_0285.mp4",
        "mov": "assets/event/IMG_0285.mov",
        "poster": "assets/event/thumb_IMG_0295.jpg",
        "duration": "Clip 01"
      },
      {
        "id": "video-02",
        "title": "Participant Discussion & Reaction",
        "caption": "Students engaging with the quiz challenges and reacting to surprising facts about gold in smartphones.",
        "src": "assets/event/IMG_0293.mp4",
        "mov": "assets/event/IMG_0293.mov",
        "poster": "assets/event/thumb_IMG_0303.jpg",
        "duration": "Clip 02"
      },
      {
        "id": "video-03",
        "title": "Interactive Myth Buster Round",
        "caption": "Live voting round where participants guess whether tiny earbuds and chargers count as e-waste.",
        "src": "assets/event/IMG_0300.mp4",
        "mov": "assets/event/IMG_0300.mov",
        "poster": "assets/event/thumb_IMG_0361.jpg",
        "duration": "Clip 03"
      },
      {
        "id": "video-04",
        "title": "Revealing the Science & Wrap-up",
        "caption": "Unveiling the science behind certified recycling centers and responsible electronic waste disposal.",
        "src": "assets/event/IMG_0302.mp4",
        "mov": "assets/event/IMG_0302.mov",
        "poster": "assets/event/thumb_IMG_0271.jpg",
        "duration": "Clip 04"
      }
    ],
    "link": ""
  }
];

// Active page trackers for multi-page assignments & campaigns
const assignmentPageTrackers = {};
const campaignTrackers = {};
const videoTrackers = {};

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

  // ─────────────────────────────────────────────────────────────────────────────
  // 4. CAMPAIGN SHOWCASE (Assignment 7 E-Waste Awareness Campaign & Myth Busters)
  // ─────────────────────────────────────────────────────────────────────────────
  } else if (type === 'campaign-showcase' && a.posters && a.posters.length > 0) {
    const cardId = escapeAttr(a.id);
    const posters = a.posters;
    const photos = a.eventPhotos || [];
    const videos = a.eventVideos || [];
    campaignTrackers[a.id] = { current: 0, total: posters.length, posters };
    if (videos.length > 0) {
      videoTrackers[a.id] = { current: 0, total: videos.length, videos };
    }
    const p0 = posters[0];
    const v0 = videos.length > 0 ? videos[0] : null;

    const posterTabs = posters.map((p, idx) => `
      <button
        onclick="switchCampaignPoster('${cardId}', ${idx})"
        id="btn-poster-${cardId}-${idx}"
        class="poster-tab-btn px-2.5 py-1 text-[11px] font-label-sm uppercase tracking-wider rounded border transition-all ${idx === 0 ? 'bg-primary-fixed-dim text-on-primary-fixed font-bold border-primary-fixed-dim shadow-sm' : 'bg-surface-container text-on-surface-variant border-outline-variant/60 hover:text-primary hover:border-outline'}"
      >
        ${escapeHtml(p.number || `P.${idx + 1}`)}: ${escapeHtml(p.title || '')}
      </button>
    `).join('');

    // Event Photos HTML Gallery
    const photosHtml = photos.length > 0 ? `
      <div id="section-photos-${cardId}" class="campaign-section-block border-t border-outline-variant/40 bg-surface-container-high/30 p-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-[20px] text-primary-fixed-dim">photo_library</span>
            <span class="font-label-sm text-[12px] uppercase tracking-widest text-primary font-bold">
              EVENT PHOTO GALLERY // ${photos.length} PHOTOGRAPHS
            </span>
          </div>
          <span class="text-[10px] font-label-sm text-secondary-fixed-dim uppercase tracking-wider px-2 py-0.5 rounded bg-secondary-fixed-dim/10 border border-secondary-fixed-dim/30">
            VIT CAMPUS OUTREACH
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          ${photos.map((ph, idx) => `
            <div class="border border-outline-variant/50 rounded-lg p-2.5 bg-surface-container-lowest/90 hover:border-primary-fixed-dim transition-all group flex flex-col justify-between cursor-pointer myth-card-glow shadow-lg"
                 onclick="openImageLightbox('${escapeAttr(ph.full)}', '${escapeAttr(ph.title)}')">
              <div>
                <div class="flex justify-between items-center text-[10px] font-label-sm text-secondary-fixed-dim mb-1.5 font-bold">
                  <span class="px-1.5 py-0.5 rounded bg-secondary-fixed-dim/10 border border-secondary-fixed-dim/30">${escapeHtml(ph.tag)}</span>
                  <span class="text-on-surface-variant">0${idx + 1}</span>
                </div>
                <div class="relative overflow-hidden rounded mb-2 bg-black scanline-sweep">
                  <img src="${escapeAttr(ph.thumb)}" alt="${escapeAttr(ph.title)}" class="w-full h-[220px] object-cover object-center rounded mx-auto transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  <div class="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span class="bg-surface/90 text-primary text-[11px] font-label-sm px-3 py-1 rounded-full shadow-lg border border-primary-fixed-dim/40 flex items-center gap-1.5">
                      <span class="material-symbols-outlined text-[14px]">zoom_in</span> View High-Res
                    </span>
                  </div>
                </div>
                <h5 class="font-headline-lg-mobile text-[14px] font-bold text-primary mb-1">${escapeHtml(ph.title)}</h5>
              </div>
              <p class="text-[11px] font-body-md text-on-surface-variant leading-relaxed line-clamp-3">
                ${escapeHtml(ph.caption)}
              </p>
            </div>
          `).join('')}
        </div>
      </div>
    ` : '';

    // Event Videos HTML Reel
    const videosHtml = (videos.length > 0 && v0) ? `
      <div id="section-videos-${cardId}" class="campaign-section-block border-t border-outline-variant/40 bg-surface-container-high/40 p-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-[#00daf3] animate-pulse"></span>
            <span class="font-label-sm text-[12px] uppercase tracking-widest text-secondary-fixed-dim font-bold">
              LIVE EVENT VIDEO REEL // ${videos.length} RECORDINGS
            </span>
          </div>
          <div class="flex items-center gap-2">
            <span id="video-indicator-${cardId}" class="text-[10px] font-label-sm text-primary-fixed-dim uppercase tracking-wider px-2 py-0.5 rounded bg-primary-fixed-dim/10 border border-primary-fixed-dim/30">
              ${escapeHtml(v0.duration)} (1 OF ${videos.length})
            </span>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          <!-- Featured Video Player -->
          <div class="lg:col-span-7 bg-surface-container-lowest rounded-lg overflow-hidden border border-secondary-fixed-dim/40 shadow-2xl p-2.5">
            <div class="relative bg-black rounded overflow-hidden aspect-video flex items-center justify-center">
              <video
                id="campaign-video-player-${cardId}"
                controls
                playsinline
                preload="metadata"
                poster="${escapeAttr(v0.poster || 'assets/event/thumb_IMG_0295.jpg')}"
                class="w-full h-full object-contain max-h-[380px] bg-black"
              >
                <source src="${escapeAttr(v0.src)}" type="video/mp4">
                <source src="${escapeAttr(v0.mov || v0.src.replace('.mp4', '.mov'))}" type="video/quicktime">
                Your browser does not support the video tag.
              </video>
            </div>
            <div class="mt-3 px-2">
              <div class="flex items-center gap-2 mb-1">
                <span class="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                <h5 id="campaign-video-title-${cardId}" class="font-headline-lg-mobile text-[16px] font-bold text-primary">
                  ${escapeHtml(v0.title)}
                </h5>
              </div>
              <p id="campaign-video-caption-${cardId}" class="text-xs font-body-md text-on-surface-variant leading-relaxed mb-2">
                ${escapeHtml(v0.caption)}
              </p>
              <div class="pt-2 border-t border-outline-variant/30 flex items-center gap-2">
                <a
                  id="campaign-video-link-${cardId}"
                  href="${escapeAttr(v0.src)}"
                  target="_blank"
                  rel="noopener"
                  class="inline-flex items-center gap-1.5 text-[11px] font-label-sm text-secondary-fixed-dim hover:text-primary border border-secondary-fixed-dim/40 px-2.5 py-1 rounded bg-secondary-fixed-dim/10 hover:bg-secondary-fixed-dim/20 transition-all font-semibold"
                >
                  <span class="material-symbols-outlined text-[14px]">open_in_new</span> Open Video in New Tab
                </a>
              </div>
            </div>
          </div>

          <!-- Video Selector Reel -->
          <div class="lg:col-span-5 space-y-2">
            <div class="text-[11px] font-label-sm text-on-surface-variant uppercase tracking-wider font-bold mb-1">
              SELECT RECORDED CLIP:
            </div>
            ${videos.map((v, idx) => `
              <div
                onclick="switchCampaignVideo('${cardId}', ${idx})"
                id="btn-video-${cardId}-${idx}"
                class="video-tab-card p-3 rounded-lg border transition-all ${idx === 0 ? 'bg-secondary-fixed-dim/15 border-secondary-fixed-dim text-primary ring-1 ring-secondary-fixed-dim/50' : 'bg-surface-container border-outline-variant/60 text-on-surface-variant hover:text-primary hover:border-outline'} cursor-pointer flex items-center justify-between gap-3 shadow-md"
              >
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-full bg-secondary-fixed-dim/20 flex items-center justify-center text-secondary-fixed-dim shrink-0">
                    <span class="material-symbols-outlined text-[18px]">play_circle</span>
                  </div>
                  <div>
                    <div class="font-headline-lg-mobile text-[13px] font-bold text-primary">${escapeHtml(v.title)}</div>
                    <div class="text-[11px] font-body-md text-on-surface-variant line-clamp-1">${escapeHtml(v.caption)}</div>
                  </div>
                </div>
                <span class="text-[10px] font-label-sm text-secondary-fixed-dim uppercase shrink-0 px-2 py-0.5 rounded bg-surface-container-high border border-outline-variant/40">
                  ${escapeHtml(v.duration)}
                </span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    ` : '';

    contentHtml = `
    <div class="mb-5 border border-primary-fixed-dim/40 bg-surface-container-lowest rounded-lg overflow-hidden shadow-2xl">
      <!-- Media Category Switcher Toolbar -->
      <div class="flex items-center justify-between px-3.5 py-2.5 bg-surface-container-high/90 border-b border-outline-variant/60 flex-wrap gap-2">
        <div class="flex items-center gap-1.5 flex-wrap">
          <span class="text-[10px] font-label-sm text-on-surface-variant uppercase tracking-wider font-bold mr-1">QUICK VIEW:</span>
          <button onclick="switchCampaignMediaView('${cardId}', 'all')" id="tab-media-all-${cardId}" class="media-nav-tab px-3 py-1.5 rounded text-[11px] font-label-sm uppercase font-bold tracking-wider transition-all bg-primary-fixed-dim text-on-primary-fixed shadow">
            🌟 All Media (${posters.length + photos.length + videos.length})
          </button>
          <button onclick="switchCampaignMediaView('${cardId}', 'photos')" id="tab-media-photos-${cardId}" class="media-nav-tab px-3 py-1.5 rounded text-[11px] font-label-sm uppercase font-bold tracking-wider transition-all bg-surface-container text-primary hover:bg-primary-fixed-dim/20 border border-outline-variant/60 flex items-center gap-1">
            <span class="material-symbols-outlined text-[15px]">photo_library</span> Photos (${photos.length})
          </button>
          <button onclick="switchCampaignMediaView('${cardId}', 'videos')" id="tab-media-videos-${cardId}" class="media-nav-tab px-3 py-1.5 rounded text-[11px] font-label-sm uppercase font-bold tracking-wider transition-all bg-surface-container text-secondary-fixed-dim hover:bg-secondary-fixed-dim/20 border border-outline-variant/60 flex items-center gap-1">
            <span class="material-symbols-outlined text-[15px]">videocam</span> Live Videos (${videos.length})
          </button>
          <button onclick="switchCampaignMediaView('${cardId}', 'posters')" id="tab-media-posters-${cardId}" class="media-nav-tab px-3 py-1.5 rounded text-[11px] font-label-sm uppercase font-bold tracking-wider transition-all bg-surface-container text-on-surface-variant hover:text-primary border border-outline-variant/60 flex items-center gap-1">
            <span class="material-symbols-outlined text-[15px]">featured_play_list</span> Posters (${posters.length})
          </button>
        </div>
        <div class="inline-flex items-center gap-1.5 text-[10px] font-label-sm text-secondary-fixed-dim uppercase tracking-wider px-2 py-0.5 rounded bg-secondary-fixed-dim/10 border border-secondary-fixed-dim/30">
          <span class="w-2 h-2 rounded-full bg-[#00e471] animate-pulse"></span> Host: Devangini
        </div>
      </div>

      <!-- Myth Posters Section Container -->
      <div id="section-posters-${cardId}" class="campaign-section-block">
        <!-- Campaign Header Bar -->
        <div class="flex flex-wrap items-center justify-between gap-2 px-3 py-2 border-b border-outline-variant/40 bg-surface-container-highest/80">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-[18px] text-primary-fixed-dim">campaign</span>
          <span class="font-label-sm text-[11px] text-primary font-bold uppercase tracking-widest">
            MYTH BUSTERS POSTER SERIES // ${posters.length} POSTERS
          </span>
          <span id="poster-indicator-${cardId}" class="ml-1 text-[11px] font-label-sm text-[#00daf3] px-2 py-0.5 bg-[#00daf3]/10 border border-[#00daf3]/30 rounded">
            ${escapeHtml(p0.number)} OF ${posters.length}
          </span>
        </div>
        <div class="flex items-center gap-2">
          <span class="inline-flex items-center gap-1.5 text-[11px] font-label-sm bg-primary-fixed-dim/15 text-primary-fixed-dim border border-primary-fixed-dim/30 px-2.5 py-0.5 rounded uppercase tracking-widest font-semibold">
            <span class="w-2 h-2 rounded-full bg-[#00e471] animate-pulse"></span> Host: ${escapeHtml(a.role || 'Myth Buster Quiz Host')}
          </span>
        </div>
      </div>

      <!-- Poster Navigation Bar -->
      <div class="flex items-center gap-1.5 px-3 py-2 bg-surface-container-low/90 border-b border-outline-variant/30 overflow-x-auto">
        <span class="text-[10px] font-label-sm text-on-surface-variant uppercase tracking-wider mr-1 shrink-0">SELECT:</span>
        <div class="flex items-center gap-1.5 flex-wrap">
          ${posterTabs}
        </div>
        <button
          onclick="toggleCampaignView('${cardId}')"
          id="btn-toggle-campaign-${cardId}"
          class="ml-auto text-[10px] font-label-sm text-secondary-fixed-dim hover:text-primary uppercase tracking-widest border border-secondary-fixed-dim/40 px-2.5 py-1 rounded bg-secondary-fixed-dim/10 hover:bg-secondary-fixed-dim/20 transition-colors whitespace-nowrap flex items-center gap-1"
        >
          <span class="material-symbols-outlined text-[14px]">grid_view</span> All 5 Posters Grid
        </button>
      </div>

      <!-- Single Poster Spotlight View (Pledge-style with interactive breakdown) -->
      <div id="single-poster-view-${cardId}" class="p-3 sm:p-5 bg-surface-container-lowest">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-5 items-start max-w-5xl mx-auto">
          
          <!-- Poster Image Display -->
          <div class="md:col-span-5 relative group cursor-pointer"
               onclick="openImageLightbox(document.getElementById('spotlight-img-${cardId}').src, document.getElementById('spotlight-title-${cardId}').textContent)">
            <div class="relative rounded-lg overflow-hidden border border-outline-variant/60 shadow-2xl bg-black scanline-sweep group-hover:border-primary-fixed-dim transition-colors">
              <img
                id="spotlight-img-${cardId}"
                src="${escapeAttr(p0.image)}"
                alt="${escapeAttr(p0.number)} - ${escapeAttr(p0.title)}"
                class="w-full h-auto max-h-[720px] object-contain block mx-auto transition-transform duration-500 group-hover:scale-[1.015]"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span class="bg-surface/90 text-primary px-3.5 py-1.5 rounded-full text-xs font-label-sm flex items-center gap-2 shadow-2xl border border-primary-fixed-dim/60 backdrop-blur-md">
                  <span class="material-symbols-outlined text-[16px] text-primary-fixed-dim">zoom_in</span> Click to enlarge
                </span>
              </div>
            </div>
            <div class="text-center mt-2">
              <span class="text-[10px] font-label-sm text-on-surface-variant uppercase tracking-wider">
                Click poster to inspect in full resolution
              </span>
            </div>
          </div>

          <!-- Myth vs Science Details Panel -->
          <div class="md:col-span-7 flex flex-col justify-between space-y-4">
            <div>
              <!-- Myth Busted Stamp Header -->
              <div class="flex items-center justify-between mb-3">
                <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded border-2 border-red-500/80 bg-red-950/40 text-red-400 font-data-display font-black text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(239,68,68,0.35)] transform -rotate-2">
                  <span class="material-symbols-outlined text-[15px]">cancel</span>
                  MYTH BUSTED!
                </div>
                <span class="text-xs font-label-sm text-secondary-fixed-dim uppercase tracking-wider border border-secondary-fixed-dim/30 px-2 py-0.5 rounded bg-secondary-fixed-dim/5">
                  Educational Poster
                </span>
              </div>

              <!-- Poster Title -->
              <h4 id="spotlight-title-${cardId}" class="font-headline-lg-mobile text-[22px] sm:text-[26px] font-bold text-primary mb-3 leading-snug">
                ${escapeHtml(p0.number)} // ${escapeHtml(p0.title)}
              </h4>

              <!-- The Myth Card -->
              <div class="p-3.5 mb-3 rounded border border-red-900/50 bg-red-950/20 shadow-inner">
                <div class="flex items-center gap-1.5 text-red-400 font-label-sm text-[11px] font-bold uppercase tracking-wider mb-1">
                  <span class="material-symbols-outlined text-[15px]">error_outline</span>
                  THE MYTH / MISCONCEPTION
                </div>
                <p id="spotlight-myth-${cardId}" class="text-body-md text-red-200/95 font-medium leading-relaxed italic">
                  "${escapeHtml(p0.myth)}"
                </p>
              </div>

              <!-- The Science & Truth Card -->
              <div class="p-3.5 mb-4 rounded border border-primary-fixed-dim/40 bg-primary-fixed-dim/10 shadow-inner">
                <div class="flex items-center gap-1.5 text-[#00e471] font-label-sm text-[11px] font-bold uppercase tracking-wider mb-1">
                  <span class="material-symbols-outlined text-[15px]">verified</span>
                  THE SCIENCE & REALITY
                </div>
                <p id="spotlight-truth-${cardId}" class="text-body-md text-[#bdf4ff] font-medium leading-relaxed">
                  ${escapeHtml(p0.truth)}
                </p>
              </div>

              <!-- Host Context Note -->
              <div class="p-3 rounded border border-outline-variant/50 bg-surface-container-high/60">
                <div class="flex items-center gap-1.5 text-secondary-fixed-dim font-label-sm text-[11px] font-bold uppercase tracking-wider mb-1">
                  <span class="material-symbols-outlined text-[15px]">psychology</span>
                  QUIZ HOST ENGAGEMENT STRATEGY
                </div>
                <p class="text-[12px] font-body-md text-on-surface-variant leading-relaxed">
                  Presented as an interactive live quiz challenge — asking students and attendees to vote true or false before unveiling the scientific facts and responsible disposal methods!
                </p>
              </div>
            </div>

            <!-- Prev / Next Navigation Controls -->
            <div class="flex items-center justify-between pt-3 border-t border-outline-variant/30 mt-2">
              <button
                onclick="prevCampaignPoster('${cardId}')"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-label-sm uppercase tracking-wider text-on-surface hover:text-primary bg-surface-container border border-outline-variant rounded hover:border-primary transition-colors"
              >
                <span class="material-symbols-outlined text-[16px]">arrow_back</span> Prev Myth
              </button>
              <span class="text-xs font-label-sm text-on-surface-variant font-medium">
                Cycle through all 5 posters
              </span>
              <button
                onclick="nextCampaignPoster('${cardId}')"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-label-sm uppercase tracking-wider text-on-surface hover:text-primary bg-surface-container border border-outline-variant rounded hover:border-primary transition-colors"
              >
                Next Myth <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- All Posters Grid View (hidden by default) -->
      <div id="all-posters-view-${cardId}" class="hidden p-3 sm:p-4 bg-surface-container-lowest">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          ${posters.map((p, idx) => `
            <div class="border border-outline-variant/40 rounded-lg p-2.5 bg-surface-container-low hover:border-primary-fixed-dim transition-all group flex flex-col justify-between cursor-pointer"
                 onclick="switchCampaignPoster('${cardId}', ${idx}); toggleCampaignView('${cardId}');">
              <div>
                <div class="flex justify-between items-center text-[10px] font-label-sm text-secondary-fixed-dim mb-1.5 font-bold">
                  <span>${escapeHtml(p.number)}</span>
                  <span class="text-primary-fixed-dim uppercase">${escapeHtml(p.title)}</span>
                </div>
                <div class="relative overflow-hidden rounded mb-2 bg-black">
                  <img src="${escapeAttr(p.image)}" alt="${escapeAttr(p.title)}" class="w-full h-auto max-h-[380px] object-contain mx-auto transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                  <div class="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span class="bg-surface/90 text-primary text-[10px] font-label-sm px-2 py-1 rounded shadow">Inspect</span>
                  </div>
                </div>
              </div>
              <div class="text-[11px] font-body-md text-on-surface-variant line-clamp-2 italic">
                "${escapeHtml(p.myth)}"
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      </div>

      <!-- Live Event Media & Video Highlights Stage -->
      ${photosHtml}
      ${videosHtml}
    </div>`;
  }

  // ── External link button if available and not redundant ───────────────────────
  const linkBtn = (a.link && type !== 'iframe' && type !== 'pdf-pages')
    ? `<a href="${escapeAttr(a.link)}" target="_blank" rel="noopener"
         class="inline-flex items-center gap-1.5 mt-3 text-[11px] font-label-sm uppercase tracking-widest text-primary-fixed-dim border border-primary-fixed-dim/40 px-3 py-1 hover:bg-primary-fixed-dim/10 transition-colors">
         <span class="material-symbols-outlined text-[14px]">open_in_new</span> Open Link
       </a>`
    : '';

  const roleBadge = a.role
    ? `<div class="mb-3 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary-fixed-dim/60 bg-gradient-to-r from-primary-fixed-dim/20 via-surface-container-high to-secondary-fixed-dim/20 text-primary text-xs font-label-sm font-bold tracking-widest uppercase shadow-md">
         <span class="material-symbols-outlined text-[18px] text-primary-fixed-dim animate-pulse">campaign</span>
         <span>MY ROLE: <span class="text-secondary-fixed-dim font-black">${escapeHtml(a.role)}</span></span>
       </div>`
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

      ${roleBadge}

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

// ── Campaign Poster Controller ────────────────────────────────────────────────
function switchCampaignPoster(cardId, posterIndex) {
  const tracker = campaignTrackers[cardId];
  if (!tracker) return;

  tracker.current = posterIndex;
  const p = tracker.posters[posterIndex];

  const img = document.getElementById(`spotlight-img-${cardId}`);
  if (img) {
    img.src = p.image;
    img.alt = `${p.number} - ${p.title}`;
  }

  const titleEl = document.getElementById(`spotlight-title-${cardId}`);
  if (titleEl) titleEl.textContent = `${p.number} // ${p.title}`;

  const mythEl = document.getElementById(`spotlight-myth-${cardId}`);
  if (mythEl) mythEl.textContent = `"${p.myth}"`;

  const truthEl = document.getElementById(`spotlight-truth-${cardId}`);
  if (truthEl) truthEl.textContent = p.truth;

  const indicator = document.getElementById(`poster-indicator-${cardId}`);
  if (indicator) indicator.textContent = `${p.number} OF ${tracker.total}`;

  // Update tabs
  tracker.posters.forEach((_, idx) => {
    const btn = document.getElementById(`btn-poster-${cardId}-${idx}`);
    if (btn) {
      if (idx === posterIndex) {
        btn.className = "poster-tab-btn px-2.5 py-1 text-[11px] font-label-sm uppercase tracking-wider rounded border transition-all bg-primary-fixed-dim text-on-primary-fixed font-bold border-primary-fixed-dim shadow-sm";
      } else {
        btn.className = "poster-tab-btn px-2.5 py-1 text-[11px] font-label-sm uppercase tracking-wider rounded border transition-all bg-surface-container text-on-surface-variant border-outline-variant/60 hover:text-primary hover:border-outline";
      }
    }
  });
}

function prevCampaignPoster(cardId) {
  const tracker = campaignTrackers[cardId];
  if (!tracker) return;
  const nextIdx = (tracker.current - 1 + tracker.total) % tracker.total;
  switchCampaignPoster(cardId, nextIdx);
}

function nextCampaignPoster(cardId) {
  const tracker = campaignTrackers[cardId];
  if (!tracker) return;
  const nextIdx = (tracker.current + 1) % tracker.total;
  switchCampaignPoster(cardId, nextIdx);
}

function toggleCampaignView(cardId) {
  const singleView = document.getElementById(`single-poster-view-${cardId}`);
  const allView = document.getElementById(`all-posters-view-${cardId}`);
  const btn = document.getElementById(`btn-toggle-campaign-${cardId}`);

  if (singleView && allView && btn) {
    if (allView.classList.contains('hidden')) {
      allView.classList.remove('hidden');
      singleView.classList.add('hidden');
      btn.innerHTML = '<span class="material-symbols-outlined text-[14px]">featured_play_list</span> Spotlight View';
    } else {
      allView.classList.add('hidden');
      singleView.classList.remove('hidden');
      btn.innerHTML = '<span class="material-symbols-outlined text-[14px]">grid_view</span> All 5 Posters Grid';
    }
  }
}

function switchCampaignMediaView(cardId, view) {
  const pSec = document.getElementById(`section-posters-${cardId}`);
  const phSec = document.getElementById(`section-photos-${cardId}`);
  const vSec = document.getElementById(`section-videos-${cardId}`);

  if (pSec && phSec && vSec) {
    if (view === 'all') {
      pSec.classList.remove('hidden');
      phSec.classList.remove('hidden');
      vSec.classList.remove('hidden');
    } else if (view === 'photos') {
      pSec.classList.add('hidden');
      phSec.classList.remove('hidden');
      vSec.classList.add('hidden');
      phSec.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else if (view === 'videos') {
      pSec.classList.add('hidden');
      phSec.classList.add('hidden');
      vSec.classList.remove('hidden');
      vSec.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else if (view === 'posters') {
      pSec.classList.remove('hidden');
      phSec.classList.add('hidden');
      vSec.classList.add('hidden');
      pSec.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  const tabs = ['all', 'photos', 'videos', 'posters'];
  tabs.forEach(t => {
    const btn = document.getElementById(`tab-media-${t}-${cardId}`);
    if (btn) {
      if (t === view) {
        btn.className = "media-nav-tab px-3 py-1.5 rounded text-[11px] font-label-sm uppercase font-bold tracking-wider transition-all bg-primary-fixed-dim text-on-primary-fixed shadow";
      } else {
        btn.className = "media-nav-tab px-3 py-1.5 rounded text-[11px] font-label-sm uppercase font-bold tracking-wider transition-all bg-surface-container text-on-surface-variant hover:text-primary border border-outline-variant/60 flex items-center gap-1";
      }
    }
  });
}

function switchCampaignVideo(cardId, videoIndex) {
  let tracker = videoTrackers[cardId];
  if (!tracker) {
    const fallbackVideos = [
      {
        "src": "assets/event/IMG_0285.mp4",
        "mov": "assets/event/IMG_0285.mov",
        "title": "Devangini Introducing the Myth Buster Quiz",
        "caption": "Opening the awareness booth and inviting participants to challenge what they know about e-waste.",
        "duration": "Clip 01",
        "poster": "assets/event/thumb_IMG_0295.jpg"
      },
      {
        "src": "assets/event/IMG_0293.mp4",
        "mov": "assets/event/IMG_0293.mov",
        "title": "Live Audience Discussion & Feedback",
        "caption": "Devangini responding to student inquiries regarding informal recycling hazards and PCB components.",
        "duration": "Clip 02",
        "poster": "assets/event/thumb_IMG_0295.jpg"
      },
      {
        "src": "assets/event/IMG_0300.mp4",
        "mov": "assets/event/IMG_0300.mov",
        "title": "Interactive Myth-Busting Question Round",
        "caption": "Live voting round where participants guess whether tiny earbuds and chargers count as e-waste.",
        "duration": "Clip 03",
        "poster": "assets/event/thumb_IMG_0303.jpg"
      },
      {
        "src": "assets/event/IMG_0302.mp4",
        "mov": "assets/event/IMG_0302.mov",
        "title": "Revealing the Science & Wrap-up",
        "caption": "Unveiling the science behind certified recycling centers and responsible electronic waste disposal.",
        "duration": "Clip 04",
        "poster": "assets/event/thumb_IMG_0361.jpg"
      }
    ];
    videoTrackers[cardId] = { current: 0, total: fallbackVideos.length, videos: fallbackVideos };
    tracker = videoTrackers[cardId];
  }
  if (!tracker) return;

  tracker.current = videoIndex;
  const v = tracker.videos[videoIndex];

  const player = document.getElementById(`campaign-video-player-${cardId}`);
  if (player) {
    if (v.poster) player.poster = v.poster;
    player.src = v.src;
    player.load();
    player.play().catch(() => {});
  }

  const linkEl = document.getElementById(`campaign-video-link-${cardId}`) || document.getElementById(`campaign-video-direct-${cardId}`);
  if (linkEl) linkEl.href = v.src;

  const titleEl = document.getElementById(`campaign-video-title-${cardId}`);
  if (titleEl) titleEl.textContent = v.title;

  const captionEl = document.getElementById(`campaign-video-caption-${cardId}`);
  if (captionEl) captionEl.textContent = v.caption;

  const indicator = document.getElementById(`video-indicator-${cardId}`);
  if (indicator) indicator.textContent = `${v.duration} (${videoIndex + 1} OF ${tracker.total})`;

  tracker.videos.forEach((_, idx) => {
    const btn = document.getElementById(`btn-video-${cardId}-${idx}`);
    if (btn) {
      if (idx === videoIndex) {
        btn.className = "video-tab-card p-3 rounded-lg border transition-all bg-secondary-fixed-dim/20 border-secondary-fixed-dim text-primary ring-1 ring-secondary-fixed-dim/50 cursor-pointer flex items-center justify-between gap-3 shadow-md";
      } else {
        btn.className = "video-tab-card p-3 rounded-lg border transition-all bg-surface-container border-outline-variant/60 text-on-surface-variant hover:text-primary hover:border-outline cursor-pointer flex items-center justify-between gap-3 shadow-md";
      }
    }
  });
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
