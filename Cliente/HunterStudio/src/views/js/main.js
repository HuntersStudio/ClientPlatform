const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const url = require('url');
const path = require('path');
const { exec } = require('child_process');

let mainWindow

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        frame: false,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            enableRemoteModule: true,
            preload: path.join('preload.js')
        }
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '../login.html'),
        protocol: 'file',
        slashes: true
    }))

    mainWindow.setMenu(null);
    mainWindow.on('closed', () => {
        app.quit();
    })
});

ipcMain.on('abrir-ventana', (event, enlace_ventana) => {
    const ventana = new BrowserWindow({
        frame: false,
        modal: true,
        parent: mainWindow,
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        }
    });
    ventana.loadFile(enlace_ventana);
});

ipcMain.on('minimizar-ventana', () => {
    if (mainWindow) {
        mainWindow.minimize();
    }
});

ipcMain.on('maximizar-ventana', () => {
    if (mainWindow.isMaximized()) {
        mainWindow.restore();
    } else {
        mainWindow.maximize();
    }
});

ipcMain.on('show-dev-tools', () => {
    if (mainWindow) {
        if (mainWindow.webContents.isDevToolsOpened()) {
            mainWindow.webContents.closeDevTools();
        } else {
            mainWindow.webContents.openDevTools();
        }
    }
});

ipcMain.on('redirect-to-login', () => {
    mainWindow.loadFile('login.html');
});

ipcMain.on('execute-exe', (event, arg) => {
    exec(arg, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });
  });