window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type]);
    }
});

/*document.addEventListener('DOMContentLoaded', () => {
    const electron = require('electron');
    const print = (num = 10) => document.getElementById('txtCount').innerText = num;
  
    document.getElementById('btnCount').onclick = () => electron.ipcRenderer.send('reqCount');
    document.getElementById('btnSteal').onclick = () => electron.ipcRenderer.send('reqSteal');
    document.getElementById('btnBroadcast').onclick = () => electron.ipcRenderer.send('reqBroadcast');
  
    electron.ipcRenderer.on('count', (e, count) => print(count));
    print();
  });*/