const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const url = require('url');

let mainWindow;

const netList = require('network-list');

const getAllIpNetwork = function async() {
  return new Promise((rel) => {
    console.log('Start scan net list');
    netList.scan({}, (err, arr) => {
      console.log(arr);
      return rel(
        arr.filter((e) => {
          return e.alive;
        })
      );
    });
  });
};

// let server = require('../server/index');
let server = require('../server/dist/main');

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

  ipcMain.handle('scanLocalIP', async (event, someArgument) => {
    var ips = await getAllIpNetwork();
    return ips;
  });

  ipcMain.handle('mdnsFetch', async (event, someArgument) => {
    return finalData;
  });
  ipcMain.handle('resetMDNS', async (event, someArgument) => {
    finalData.splice(0, finalData.length);
    return true;
  });
  ipcMain.handle('startMDNS', async (event, someArgument) => {
    startMDNS();
    return `Start the mDNS`;
  });
  ipcMain.handle('stopMDNS', async (event, someArgument) => {
    stopMDNS();
    return `Stop the mDNS`;
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

// Service Worker scan

var finalData = [];
var mdns;
var _ = require('lodash');
function stopMDNS() {
  mdns.destroy();
  console.log(`Destroy MDNS!!`);
}
function startMDNS() {
  mdns = require('multicast-dns')();
  mdns.on('response', (response) => {
    if (response.answers.length > 0) {
      var answers = response.answers;
      // console.log(answers);
      for (var i = 0; i < answers.length - 1; i++) {
        var item = answers[i];
        // if (item.type == "A") {
        //   continue;
        // }

        var notFound =
          // eslint-disable-next-line no-loop-func
          _.findIndex(finalData, function (o) {
            return o.data === item.data;
          }) === -1;
        if (notFound) {
          console.log(item);
          finalData.push(item);
        }
      }
    }
  });

  mdns.on('query', function (query) {
    // console.log("got a query packet:", query);
  });

  // lets query for an A record for 'brunhilde.local'
  mdns.query({
    questions: [
      {
        name: '_services._dns-sd._udp.local',
        type: 'A',
      },
    ],
  });
}
