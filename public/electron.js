const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const url = require('url');

let mainWindow;

// let server = require('../server/index');
let server = require('../server/tof-nestjs/dist/main');

const isDev = require('electron-is-dev');

function createWindow() {
  var pathPreload = __dirname + '\\preload.js';

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1800,
    height: 800,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: pathPreload,
    },
  });

  ipcMain.on('notify', (_, message) => {
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let secs = date_ob.getSeconds();
    console.log(`You click at ${secs} second - ${date} ${month} ${year}`);
  });

  ipcMain.handle('some-name', async (event, someArgument) => {
    const result = 1 + 2;
    return result;
  });

  let startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '/../build/index.html'),
      protocol: 'file:',
      slashes: true,
    });

  // startUrl = mainWindow.loadURL(
  //   isDev
  //     ? 'http://localhost:5000'
  //     : `file://${path.join(__dirname, '../build/index.html')}`
  // );
  mainWindow.loadURL(startUrl);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
