const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    redirectToLogin: () => ipcRenderer.send('redirect-to-login')
});