const {app, BrowserWindow, ipcMain} = require('electron');
const { webContents } = require('electron/main');
const path = require('path');

const createWindow = () => {
    const win = {
        width: 640,
        height: 480,
        webPreferences: {preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
        contextIsolation: false,
    }
    };

    const first = new BrowserWindow(win);
    const second = new BrowserWindow(win);
    const third = new BrowserWindow(win);

    first.loadFile('index.html');
    second.loadFile('index2.html');
    third.loadFile('index2.html');
}

app.whenReady().then(()=>{
    createWindow();

    let apples = 10;

    ipcMain.on('reqCount', (e) => {
        e.reply('count', apples);
    });

    ipcMain.on('reqSteal', (e) => {
        apples--;
        e.reply('count', apples);
    });

    ipcMain.on('reqBroadcast', (e) => {
        const contents = webContents.getAllWebContents();
        for (const c of contents) c.send('count', apples);
    });

    app.on('activate', ()=> {
        if (BrowserWindow.getAllWindows.length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

