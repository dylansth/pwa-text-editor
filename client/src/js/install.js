const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    deferredPrompt = event;
    butInstall.classList.remove('hidden');
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', () => {
    if (deferredPrompt) {
        deferredPrompt.prompt().then((userChoice) => {
          if (userChoice.outcome === 'accepted') {
            // Installation successful
          }
          deferredPrompt = null;
          butInstall.classList.add('hidden');
        }).catch((error) => {
          console.error('Error Installing:', error);
        });
      }
  });

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('Installed.');
    butInstall.classList.add('hidden');
});
