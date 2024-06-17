const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  executeExe: (path) => ipcRenderer.send('execute-exe', path)
});