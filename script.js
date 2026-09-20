/* =========================================================
   Birthday website interactions
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  document.body.classList.add('pre-open');

  /* ---------- Ambient floating hearts ---------- */
  const heartsField = document.getElementById('heartsField');
  const heartSymbols = ['♡', '💗', '💕'];

  function spawnHeart(){
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    const left = Math.random() * 100;
    const duration = 9 + Math.random() * 8;
    const drift = (Math.random() * 120 - 60) + 'px';
    heart.style.left = left + 'vw';
    heart.style.fontSize = (14 + Math.random() * 14) + 'px';
    heart.style.setProperty('--drift', drift);
    heart.style.animationDuration = duration + 's';
    heartsField.appendChild(heart);
    setTimeout(() => heart.remove(), duration * 1000 + 500);
  }
  setInterval(spawnHeart, 900);
  for (let i = 0; i < 5; i++) setTimeout(spawnHeart, i * 300);

  /* ---------- Music toggle ---------- */
  const musicToggle = document.getElementById('musicToggle');
  const bgMusic = document.getElementById('bgMusic');
  let musicPlaying = false;

  musicToggle.addEventListener('click', () => {
    if (!musicPlaying) {
      bgMusic.play().catch(() => {
        /* File may not exist yet — that's fine, this is a placeholder */
      });
      musicToggle.classList.add('playing');
      musicToggle.querySelector('.music-icon').textContent = '❚❚';
      musicToggle.setAttribute('aria-label', 'Pause birthday music');
    } else {
      bgMusic.pause();
      musicToggle.classList.remove('playing');
      musicToggle.querySelector('.music-icon').textContent = '♪';
      musicToggle.setAttribute('aria-label', 'Play birthday music');
    }
    musicPlaying = !musicPlaying;
  });

  /* ---------- Opening gift box ---------- */
  const openGiftBtn = document.getElementById('openGiftBtn');
  const opening = document.getElementById('opening');
  const mainSite = document.getElementById('mainSite');
  let giftOpened = false;

  openGiftBtn.addEventListener('click', () => {
    if (giftOpened) return;
    giftOpened = true;
    openGiftBtn.classList.add('opened');
    burstFrom(openGiftBtn, ['✨','♡','💗','🎉']);

    setTimeout(() => {
      opening.classList.add('hidden');
      document.body.classList.remove('pre-open');
      mainSite.classList.add('visible');
      setTimeout(() => {
        document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }, 900);
  });

  function burstFrom(el, symbols){
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    for (let i = 0; i < 18; i++) {
      const piece = document.createElement('span');
      piece.className = 'burst-piece';
      piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      const angle = Math.random() * Math.PI * 2;
      const dist = 80 + Math.random() * 140;
      piece.style.setProperty('--bx', Math.cos(angle) * dist + 'px');
      piece.style.setProperty('--by', Math.sin(angle) * dist + 'px');
      piece.style.left = cx + 'px';
      piece.style.top = cy + 'px';
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 1200);
    }
  }

  /* ---------- Timeline reveal on scroll ---------- */
  const chapters = document.querySelectorAll('.chapter.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });
  chapters.forEach(ch => revealObserver.observe(ch));

  /* ---------- Envelope / letter ---------- */
  const envelopeBtn = document.getElementById('envelopeBtn');
  const envelopeHint = document.getElementById('envelopeHint');
  const letterPaper = document.getElementById('letterPaper');
  const letterTextEl = document.getElementById('letterText');
  let letterOpened = false;

  const letterFull = `My Dearest Girl,

Happy Birthday to one of the most special people in my life. ♡

Sometimes I think about how our friendship started back in 7th class, and it makes me smile. We had no idea that life would take us to different cities, different fields, and completely different routines.

You're out there pursuing BS Nursing, and I'm here doing BS Computer Science. Life is getting busy for both of us, and we don't get to meet as often as we wish.

But you know what I love the most about us?

We don't have to talk every single day to know that we still have each other. We can go months without meeting, but whenever we finally talk, it never feels like we missed anything. It's always the same comfort, the same laughter, and the same connection.

I wish we could have more random meetups, more long conversations, more silly moments, and more memories together. I wish distance didn't make seeing you such a special occasion that we have to wait months for.

But until we get those moments, I hope you always know that you are loved, remembered, and cherished.

I'm so proud of the dreams you're chasing. I hope your journey in Nursing brings you happiness, success, and everything your beautiful heart deserves.

And no matter how much life changes, I hope we never lose this little piece of our lives that belongs to us.

Thank you for being my 7th-class friend, my precious memory, and one of those rare people who make distance feel so small.

Happy Birthday, meri jaan. May this year bring you endless happiness, beautiful opportunities, peaceful days, and all the love you deserve.

I love you more than these words could ever explain.

Here's to us, to our friendship, and to all the meetups we're still waiting for. ♡

Forever your friend,
Your 7th-Class Girl 💗`;

  function typeLetter(text, el, speed = 14){
    let i = 0;
    el.textContent = '';
    function step(){
      if (i < text.length) {
        el.textContent += text[i];
        i++;
        setTimeout(step, speed);
      }
    }
    step();
  }

  envelopeBtn.addEventListener('click', () => {
    if (letterOpened) return;
    letterOpened = true;
    envelopeBtn.classList.add('opened');
    envelopeHint.textContent = 'Your letter ♡';
    letterPaper.classList.add('open');
    typeLetter(letterFull, letterTextEl, 12);
  });

  /* ---------- Gallery lightbox ---------- */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxPhoto = document.getElementById('lightboxPhoto');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const caption = item.getAttribute('data-caption');
      lightboxCaption.textContent = caption;
      lightboxPhoto.textContent = item.querySelector('.polaroid-photo').textContent;
      lightbox.classList.add('open');
    });
  });
  function closeLightbox(){ lightbox.classList.remove('open'); }
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

  /* ---------- Reasons heart cards ---------- */
  document.querySelectorAll('.heart-card').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('flipped'));
  });

  /* ---------- Cake / candles ---------- */
  const blowBtn = document.getElementById('blowBtn');
  const cakeScene = document.getElementById('cakeScene');
  const wishMessage = document.getElementById('wishMessage');

  blowBtn.addEventListener('click', () => {
    cakeScene.classList.add('blown');
    blowBtn.disabled = true;
    blowBtn.textContent = 'Wish Made ✨';
    launchConfettiAndHearts();
    setTimeout(() => wishMessage.classList.add('show'), 500);
  });

  function launchConfettiAndHearts(){
    const colors = ['#C98F65', '#F0C987', '#F8D7E3', '#E4D4F4'];
    for (let i = 0; i < 40; i++) {
      const piece = document.createElement('span');
      const isHeart = Math.random() < 0.3;
      piece.className = 'confetti-piece';
      if (isHeart) {
        piece.textContent = '♡';
        piece.style.color = colors[Math.floor(Math.random() * colors.length)];
        piece.style.fontSize = '16px';
        piece.style.background = 'transparent';
      } else {
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.borderRadius = Math.random() < 0.5 ? '50%' : '2px';
      }
      const startX = window.innerWidth / 2 + (Math.random() * 300 - 150);
      piece.style.left = startX + 'px';
      piece.style.top = (cakeScene.getBoundingClientRect().top + window.scrollY) + 'px';
      piece.style.setProperty('--cx', (Math.random() * 240 - 120) + 'px');
      piece.style.setProperty('--cr', (Math.random() * 480 - 240) + 'deg');
      piece.style.animationDelay = (Math.random() * 0.3) + 's';
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 2600);
    }
  }

  /* ---------- Final reveal ---------- */
  const finalBtn = document.getElementById('finalBtn');
  const finalReveal = document.getElementById('finalReveal');

  finalBtn.addEventListener('click', () => {
    finalReveal.classList.add('show');
    finalBtn.classList.add('hidden');
    burstFrom(finalBtn, ['♡','💗','✨']);
  });

});
