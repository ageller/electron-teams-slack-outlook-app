const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 3000,
        height: 900,
        webPreferences: {
            preload: path.join(__dirname, 'src/preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
            webviewTag: true, 
        },
    });

    mainWindow.loadFile('src/index.html');

}
app.once('ready', () => {
    app.userAgentFallback =
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36';
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
