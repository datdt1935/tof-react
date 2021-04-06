// https://github.com/electron/electron/issues/21437

const { contextBridge, ipcRenderer } = require('electron');

console.log(ipcRenderer);
contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: ipcRenderer,
});
console.log(`LOADDED - PRELOAD`);

// window.ipcRenderer = require('electron').ipcRenderer;
