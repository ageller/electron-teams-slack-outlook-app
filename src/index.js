function toggleView(panelId) {
    console.log(event.target)
    const clickedButton = event.target.parentNode;
    clickedButton.classList.toggle('shown');
    const panels = document.querySelectorAll('.panel');
    panels.forEach(panel => {
        if (panel.id === panelId) {
            panel.classList.toggle('hidden');
        } 
    });
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