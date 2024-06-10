// Aqui se declaran las constantes 
const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const url = require('url');
const path = require('path');

// Declaramos variables
let mainWindow

app.on('ready', () => {
    // Evento de inicio de la aplicacion que llama a los html
    mainWindow = new BrowserWindow({
        width: 1280, // Ancho predeterminado de la ventana
        height: 720, // Altura predeterminada de la ventana
        frame: false, // Quita el menu de arriba por defecto
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            enableRemoteModule: true
        }
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '../login.html'),
        protocol: 'file',
        slashes: true
    }))

    mainWindow.setMenu(null); // Ocultar herramientas de dev

    // Aqui se cierra todo el programa al cerrar la ventana principal
    mainWindow.on('closed', () => {
        app.quit();
    })
});

// Escuchar solicitud para abrir una nueva ventana
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

// Manejar el evento de minimizar ventana desde el proceso de renderizado
ipcMain.on('minimizar-ventana', () => {
    // Minimizar la ventana actual
    if (mainWindow) {
        mainWindow.minimize();
    }
});

// Manejar el evento de minimizar ventana desde el proceso de renderizado
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

// Redirigir al login si caduca el token
ipcMain.on('redirect-to-login', () => {
    mainWindow.loadFile('login.html');
});