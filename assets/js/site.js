// Shared behavior for every page: mobile menu open/close + active nav highlight.
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('close-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && closeBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('translate-x-full');
    });
    closeBtn.addEventListener('click', () => {
      mobileMenu.classList.add('translate-x-full');
    });
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => mobileMenu.classList.add('translate-x-full'));
    });
  }

  // Highlight the current page in the nav (matches data-page on <body> to href).
  const currentPage = document.body.dataset.page;
  if (currentPage) {
    document.querySelectorAll('[data-nav-link]').forEach((link) => {
      if (link.dataset.navLink === currentPage) {
        link.classList.add('text-primary', 'border-primary');
        link.classList.remove('text-on-surface-variant');
      }
    });
  }

  // Animated Typewriter effect for name display
  const nameElement = document.getElementById('animated-name-text');

  if (nameElement) {
    const targetName = nameElement.textContent.trim() || 'DEVANGINI JADHAV';

    function typeName(textToType) {
      let index = 0;
      nameElement.textContent = '';
      
      const interval = setInterval(() => {
        if (index < textToType.length) {
          nameElement.textContent += textToType.charAt(index);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 90);
    }

    // Initial typing animation on load
    typeName(targetName);
  }

  // Pledge poster lightbox modal behavior
  const posterTrigger = document.getElementById('pledge-poster-trigger');
  const pledgeModal = document.getElementById('pledge-modal');
  const closePledgeModal = document.getElementById('close-pledge-modal');

  if (posterTrigger && pledgeModal) {
    posterTrigger.addEventListener('click', () => {
      pledgeModal.classList.remove('hidden');
      pledgeModal.classList.add('flex');
      document.body.style.overflow = 'hidden';
    });

    const closeModal = () => {
      pledgeModal.classList.add('hidden');
      pledgeModal.classList.remove('flex');
      document.body.style.overflow = '';
    };

    if (closePledgeModal) {
      closePledgeModal.addEventListener('click', closeModal);
    }

    pledgeModal.addEventListener('click', (e) => {
      if (e.target === pledgeModal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !pledgeModal.classList.contains('hidden')) {
        closeModal();
      }
    });
  }
});
