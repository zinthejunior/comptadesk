const installerName = 'ComptaDesk-Setup-1.0.3.exe';
const downloadLink = document.querySelector('#download-link');
const navDownloadLink = document.querySelector('#nav-download-link');
const finalDownloadLink = document.querySelector('#final-download-link');

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
for (const link of [downloadLink, navDownloadLink, finalDownloadLink]) {
  if (!link) continue;

  if (downloadUrl !== '#') {
    link.href = downloadUrl;
  } else {
    link.addEventListener('click', (event) => event.preventDefault());
  }
}
