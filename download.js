const installerName = 'ComptaDesk-Setup-1.0.3.exe';
const downloadLink = document.querySelector('#download-link');

if (downloadLink) {
  downloadLink.addEventListener('click', (event) => {
    event.preventDefault();

    const hostnameParts = window.location.hostname.split('.');
    let downloadUrl = '#';

    if (hostnameParts[1] === 'github' && hostnameParts[2] === 'io') {
      const owner = hostnameParts[0];
      const pathParts = window.location.pathname.split('/').filter(Boolean);
      const repository = pathParts[0];

      if (owner && repository) {
        downloadUrl = `https://github.com/${owner}/${repository}/releases/latest/download/${installerName}`;
      }
    }

    if (downloadUrl !== '#') {
      window.location.href = downloadUrl;
    }
  });
}
