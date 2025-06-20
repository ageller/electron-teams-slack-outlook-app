function toggleView(button, panelId) {
    const panel = document.getElementById(panelId);
    if (panel.classList.contains('hidden')) {
        panel.classList.remove('hidden');
        button.classList.add('shown');
    } else {
        panel.classList.add('hidden');
        button.classList.remove('shown');
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const webviews = document.querySelectorAll('webview');
    webviews.forEach(wv => {
        if (wv.shadowRoot) {
            const iframe = wv.shadowRoot.querySelector('iframe');
            if (iframe) {
                iframe.style.height = '100%';
                iframe.style.width = '100%';
            } 
        }

        wv.addEventListener('dom-ready', () => {
            console.log(`${wv.id} webview is ready`);
        });
        
        // This is the key event handler for new windows
        wv.addEventListener('new-window', (e) => {
            console.log('New window requested:', e.url);
            e.preventDefault(); // Prevent the default new window
            
            // Open in system browser instead
            window.electronAPI.openExternal(e.url);

            // Also try setting up handlers after dom-ready
            wv.addEventListener('new-window', (e) => {
                console.log('new-window (post dom-ready):', e.url);
                e.preventDefault();
                window.electronAPI.openExternal(e.url);
            });
        });
        
        // Alternative: if new-window doesn't work, try this
        wv.addEventListener('will-navigate', (e) => {
            console.log('Navigation requested:', e.url);
            // You can add logic here to handle certain URLs differently
        });

        // This is another event that might fire for popups
        wv.addEventListener('permissionrequest', (e) => {
            console.log('Permission request:', e.permission);
            if (e.permission === 'openExternal') {
                e.preventDefault();
                window.electronAPI.openExternal(e.request.url);
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const webviews = document.querySelectorAll('webview');
    
    webviews.forEach(webview => {
        webview.addEventListener('dom-ready', () => {
            console.log(`${webview.id} webview is ready`);
        });
        
        // This is the key event handler for new windows
        webview.addEventListener('new-window', (e) => {
            console.log('New window requested:', e.url);
            e.preventDefault(); // Prevent the default new window
            
            // Open in system browser instead
            window.electronAPI.openExternal(e.url);
        });
        
        // Alternative: if new-window doesn't work, try this
        webview.addEventListener('will-navigate', (e) => {
            console.log('Navigation requested:', e.url);
            // You can add logic here to handle certain URLs differently
        });
    });
});