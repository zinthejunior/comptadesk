const installerName = 'ComptaDesk-Setup-1.0.3.exe';

function getDownloadUrl() {
  const hostnameParts = window.location.hostname.split('.');

  if (hostnameParts[1] === 'github' && hostnameParts[2] === 'io') {
    const owner = hostnameParts[0];
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    const repository = pathParts[0];

    if (owner && repository) {
      return `https://github.com/${owner}/${repository}/releases/latest/download/${installerName}`;
    }
  }

  return '#';
}

const downloadUrl = getDownloadUrl();
for (const link of document.querySelectorAll('#download-link, #nav-download-link, #ecosystem-download-link, #final-download-link')) {
  if (!link) continue;

  if (downloadUrl !== '#') {
    link.href = downloadUrl;
  } else {
    link.addEventListener('click', (event) => event.preventDefault());
  }
}

const screenNames = [
  'Connexion',
  'Tableau de bord',
  'Opérations',
  'Dons',
  'Désignations',
  'Catégories',
  'Bilans',
  'Analyse personnalisée',
  'Rapports',
  'Historique',
  'Paramètres',
  'Administration',
  'Synchronisation',
  'Rôles et permissions',
  'Sauvegardes',
];

const galleries = {
  desktop: screenNames.map((title, index) => ({
    title,
    file: `assets/desktop/${String(index + 1).padStart(2, '0')}_${[
      'connexion', 'tableau_de_bord', 'operations', 'dons', 'designations',
      'categories', 'bilans', 'analyse', 'rapports', 'historique', 'parametres',
      'administration', 'synchronisation', 'roles_permissions', 'sauvegardes',
    ][index]}.png`,
  })),
};

const galleryRoot = document.querySelector('#screen-gallery');
const dialog = document.querySelector('#screen-dialog');
const dialogImage = document.querySelector('#dialog-image');
const dialogTitle = document.querySelector('#dialog-title');
const dialogIndex = document.querySelector('#dialog-index');

function renderGallery(type) {
  if (!galleryRoot) return;
  galleryRoot.innerHTML = galleries[type].map((screen, index) => `
    <button class="screen-card" type="button" data-index="${index}" data-type="${type}" aria-label="Afficher ${screen.title}">
      <span class="screen-index">${String(index + 1).padStart(2, '0')}</span>
      <img src="${screen.file}" alt="Capture ${screen.title}" loading="lazy">
      <span class="screen-label"><strong>${screen.title}</strong><small>Afficher</small></span>
    </button>
  `).join('');

  galleryRoot.querySelectorAll('.screen-card').forEach((card) => {
    card.addEventListener('click', () => openScreen(card.dataset.type, Number(card.dataset.index)));
  });
}

function openScreen(type, index) {
  if (!dialog || !dialogImage || !dialogTitle || !dialogIndex) return;
  const screen = galleries[type][index];
  dialogImage.src = screen.file;
  dialogImage.alt = `Capture ${screen.title}`;
  dialogTitle.textContent = screen.title;
  dialogIndex.textContent = `${index + 1} / ${galleries[type].length}`;
  dialog.showModal();
}

document.querySelector('.dialog-close')?.addEventListener('click', () => dialog?.close());
dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

renderGallery('desktop');
