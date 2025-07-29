
AOS.init({ duration: 1000, once: false });

// machine a ecrire effet //
const typing = document.querySelector('.projects-end');
if (typing) {
  const text = typing.textContent;
  typing.textContent = '';
  let i = 0;
  function type() {
    if (i < text.length) {
      typing.textContent += text.charAt(i);
      i++;
      setTimeout(type, 35);
    }
  }
  setTimeout(type, 800);
}

// Clic sur image/bouton suivant, change image active et description
function setupProjectImageDescriptionAndNext() {
  document.querySelectorAll('.project').forEach(project => {
    const desc = project.querySelector('.project-desc');
    const images = Array.from(project.querySelectorAll('img[data-text]'));
    const nextBtn = project.querySelector('.next-img-btn');
    if (!desc || images.length === 0 || !nextBtn) return;
    let current = 0;
    const originalText = desc.textContent;

    // Fonction pour activer une image et description
    function setActive(idx) {
      images.forEach((img, i) => {
        img.style.opacity = (i === idx) ? '1' : '0.5';
        img.style.filter = (i === idx) ? 'none' : 'grayscale(60%)';
      });
      desc.textContent = images[idx].getAttribute('data-text') || originalText;
      current = idx;
    }

    // Fonction pour ouvrir la modale avec l'image et la description
    function openModal(idx) {
      const modal = document.getElementById('img-modal');
      const modalImg = document.getElementById('img-modal-img');
      const modalDesc = document.getElementById('img-modal-desc');
      const modalNextBtn = document.getElementById('img-modal-next-btn');
      if (modal && modalImg && modalDesc && modalNextBtn) {
        modalImg.src = images[idx].src;
        modalDesc.textContent = images[idx].getAttribute('data-text') || '';
        modal.style.display = 'flex';
        // On retire l'ancien listener pour éviter les doublons
        modalNextBtn.replaceWith(modalNextBtn.cloneNode(true));
        const newModalNextBtn = document.getElementById('img-modal-next-btn');
        newModalNextBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          let next = (idx + 1) % images.length;
          setActive(next);
          openModal(next);
        });
      }
    }

    // Clic sur image : affiche la modale
    images.forEach((img, idx) => {
      img.addEventListener('click', () => {
        setActive(idx);
        openModal(idx);
      });
    });

    // Clic sur bouton suivant : affiche la modale
    nextBtn.addEventListener('click', () => {
      let next = (current + 1) % images.length;
      setActive(next);
      openModal(next);
    });

    // Init état par défaut
    setActive(0);
  });
}
setupProjectImageDescriptionAndNext();

// Gestion fermeture modale image
function setupImgModalClose() {
  const modal = document.getElementById('img-modal');
  const closeBtn = document.querySelector('.img-modal-close');
  if (!modal || !closeBtn) return;
  
  // Ferme sur la croix
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  
  // Ferme si on clique en dehors du contenu
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}

// Initialise la fermeture de la modale
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupImgModalClose);
} else {
  setupImgModalClose();
}



// bouton decouvrir
document.addEventListener('DOMContentLoaded', function() {
  const showBtn = document.getElementById('show-images-btn');
  const imagesContainer = document.getElementById('discover-images-container');
  if (showBtn && imagesContainer) {
    showBtn.addEventListener('click', function() {
      if (!imagesContainer.innerHTML) {
        imagesContainer.innerHTML = `
          <div class="discover-flex-row">
            <div class="discover-flex-item">
              <img src="assets/image.png" alt="Découverte 1" class="discover-img" />
              <div class="discover-quote">
                <p>
                  La créativité, c'est aussi savoir sortir du cadre professionnel pour explorer de nouveaux horizons. Chaque passion nourrit l'inspiration et l'envie d'aller plus loin.
                </p>
              </div>
            </div>
            <div class="discover-flex-item reverse">
              <div class="discover-quote">
                <p>
                  Savoir s'entourer de moments simples, c'est aussi se donner la chance de se ressourcer et de revenir plus fort dans ses projets.
                </p>
              </div>
              <img src="assets/photo.png" alt="Découverte 2" class="discover-img" />
            </div>
          </div>
        `;
      }
      imagesContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
});

// Carrousel d'icônes
document.querySelectorAll('.carousel-languages').forEach(carousel => {
  const track = carousel.querySelector('.carousel-track');
  if (!track) return;
  const icons = Array.from(track.children);
  let trackWidth = track.scrollWidth;
  let containerWidth = carousel.offsetWidth;
  // On duplique 
  while (trackWidth < containerWidth * 2 && icons.length > 0) {
    icons.forEach(icon => {
      const clone = icon.cloneNode(true);
      track.appendChild(clone);
    });
    trackWidth = track.scrollWidth;
  }
});

