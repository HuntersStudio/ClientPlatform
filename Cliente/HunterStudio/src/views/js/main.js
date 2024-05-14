// Aqui se declaran las constantes 
const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const url = require('url');
const path = require('path');

// Declaramos variables
let main_window

app.on('ready', () => {
    // Evento de inicio de la aplicacion que llama a los html
    main_window = new BrowserWindow({
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

    main_window.loadURL(url.format({
        pathname: path.join(__dirname, '../html/login.html'),
        protocol: 'file',
        slashes: true
    }))

    main_window.setMenu(null); // Ocultar herramientas de dev

    // Aqui se cierra todo el programa al cerrar la ventana principal
    main_window.on('closed', () => {
        app.quit();
    })
});

// Crear ventana flotante secundaria
function crearVentana() {
    const ventana = new BrowserWindow({
        frame: false, 
        modal: true,
        parent: main_window,
        width: 800, 
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        }
    });
    ventana.loadFile('index.html');
}

// Escuchar solicitud para abrir una nueva ventana
ipcMain.on('abrir-ventana', (event, enlace_ventana) => {
    const ventana = new BrowserWindow({
        frame: false,
        modal: true,
        parent: main_window, 
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
    if (main_window) {
        main_window.minimize();
    }
});