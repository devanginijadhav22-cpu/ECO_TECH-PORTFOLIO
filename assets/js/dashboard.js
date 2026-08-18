// Reads assets/data/assignments.json and renders it as cards with image lightbox support.

async function loadAssignments() {
  const grid = document.getElementById('assignments-grid');
  const emptyState = document.getElementById('assignments-empty');
  const statTotal = document.getElementById('stat-total');
  const statComplete = document.getElementById('stat-complete');
  const statProgress = document.getElementById('stat-progress');

  try {
    const res = await fetch('assets/data/assignments.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to load assignments.json');
    const assignments = await res.json();

    if (!assignments.length) {
      emptyState.classList.remove('hidden');
      return;
    }

    // Keep natural order (A01, A02...)
    statTotal.textContent = assignments.length;
    statComplete.textContent = assignments.filter(a => a.status === 'COMPLETE').length;
    statProgress.textContent = assignments.filter(a => a.status !== 'COMPLETE').length;

    grid.innerHTML = assignments.map(renderCard).join('');
    setupModalListeners();
  } catch (err) {
    console.error(err);
    emptyState.classList.remove('hidden');
    emptyState.querySelector('p').textContent =
      "Couldn't load assignments.json — if you opened this file directly in your browser, run it through a local server instead (see README.md).";
  }
}

function renderCard(a) {
  const statusColor = a.status === 'COMPLETE'
    ? 'text-primary-fixed-dim border-primary-fixed-dim/40 bg-primary-fixed-dim/10'
    : 'text-secondary-fixed-dim border-secondary-fixed-dim/40 bg-secondary-fixed-dim/10';

  const tags = (a.tags || []).map(
    t => `<span class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant border border-outline-variant px-2 py-0.5">${escapeHtml(t)}</span>`
  ).join('');

  const dateLabel = a.date ? new Date(a.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }) : '';
  const titleInner = escapeHtml(a.title || 'Untitled Assignment');
  const titleHtml = a.link
    ? `<a href="${escapeAttr(a.link)}" class="hover:text-primary-fixed-dim transition-colors" target="_blank" rel="noopener">${titleInner}</a>`
    : titleInner;

  const imageHtml = a.image
    ? `
    <div class="mb-4 overflow-hidden rounded border border-outline-variant/60 bg-surface-container-lowest relative group cursor-pointer shadow-md" onclick="openAssignmentModal('${escapeAttr(a.image)}', '${escapeAttr(a.title)}')">
      <img src="${escapeAttr(a.image)}" alt="${escapeAttr(a.title)}" class="w-full h-48 sm:h-64 object-cover object-top group-hover:scale-105 transition-transform duration-300" />
      <div class="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-primary font-bold font-label-sm tracking-wider uppercase text-[12px] backdrop-blur-[2px]">
        <span class="material-symbols-outlined text-[20px]">zoom_in</span> View Image
      </div>
    </div>
    `
    : '';

  return `
    <article class="border border-slate-800 bg-surface-container p-4 sm:p-5 relative rounded-none hover:border-outline-variant transition-colors">
      <div class="flex justify-between items-start mb-2">
        <span class="font-data-display text-[12px] px-2 py-0.5 border ${statusColor} flex items-center gap-1.5 font-bold">
          <span class="material-symbols-outlined text-[14px]">folder_open</span>
          ${escapeHtml(a.status || 'STATUS UNKNOWN')}
        </span>
        <span class="font-label-sm text-label-sm text-on-surface-variant opacity-60 font-bold">${escapeHtml(a.id || '')}</span>
      </div>

      <h3 class="font-headline-lg-mobile text-[20px] sm:text-[22px] font-bold text-primary mb-1 leading-snug">${titleHtml}</h3>
      <p class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-4">${escapeHtml(a.course || '')} ${dateLabel ? '// ' + dateLabel : ''}</p>
      
      ${imageHtml}

      <p class="font-body-md text-body-md text-on-surface-variant mb-4 opacity-90 leading-relaxed">${escapeHtml(a.summary || '')}</p>
      <div class="flex flex-wrap gap-2">${tags}</div>
    </article>
  `;
}

function openAssignmentModal(imgSrc, title) {
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

function setupModalListeners() {
  const modal = document.getElementById('assignment-modal');
  const closeBtn = document.getElementById('close-assignment-modal');
  if (modal && closeBtn) {
    const closeModal = () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = '';
    };
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
    });
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
function escapeAttr(str) {
  return String(str).replace(/"/g, '&quot;');
}

document.addEventListener('DOMContentLoaded', loadAssignments);
