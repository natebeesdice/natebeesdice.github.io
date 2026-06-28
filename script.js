
  // Simple gallery lightbox + mobile menu toggle
  (function(){
    const galleryImgs = Array.from(document.querySelectorAll('.hex img'));
    const galleryNames = Array.from(document.querySelectorAll('.hex h2'));
    const hexButtons = Array.from(document.querySelectorAll('.hex'));
    const lightbox = document.getElementById('lightbox');
    const lbImage = document.getElementById('lbImage');
    const lbName = document.getElementById('lbName');
    const lbClose = document.getElementById('lbClose');
    const lbPrev = document.getElementById('lbPrev');
    const lbNext = document.getElementById('lbNext');
    let current = 0;

    function open(index){
      current = index;
      const src = galleryImgs[current].src;
      const alt = galleryImgs[current].alt || '';
      const name = galleryNames[current]?.textContent || '';
      lbImage.src = src;
      lbImage.alt = alt;
      lbName.textContent = name;
      lightbox.setAttribute('aria-hidden','false');
      document.body.style.overflow = 'hidden';
    }
    function close(){
      lightbox.setAttribute('aria-hidden','true');
      lbImage.src = '';
      document.body.style.overflow = '';
    }
    function show(n){
      current = (n + galleryImgs.length) % galleryImgs.length;
      lbImage.src = galleryImgs[current].src;
      lbImage.alt = galleryImgs[current].alt || '';
      lbName.textContent = galleryNames[current]?.textContent || '';
    }

    hexButtons.forEach(btn => {
      const idx = Number(btn.dataset.index);
      btn.addEventListener('click', () => open(idx));
      btn.addEventListener('keydown', (e) => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(idx); }});
    });

    lbClose.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
    lbPrev.addEventListener('click', () => show(current - 1));
    lbNext.addEventListener('click', () => show(current + 1));

    window.addEventListener('keydown', (e) => {
      if (lightbox.getAttribute('aria-hidden') === 'false') {
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') show(current - 1);
        if (e.key === 'ArrowRight') show(current + 1);
      }
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navList = document.getElementById('navList');
    menuToggle && menuToggle.addEventListener('click', () => navList.classList.toggle('open'));
  })();