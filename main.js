const { app, BrowserWindow } = require('electron');

// Replace this URL once your Render backend is live
const CLOUD_URL = 'https://qz-meeting-pro.onrender.com';

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false
        }
    });

    mainWindow.loadURL(CLOUD_URL);
    mainWindow.setMenuBarVisibility(false);
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
