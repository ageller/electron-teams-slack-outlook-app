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
    });
});

