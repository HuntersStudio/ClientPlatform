// Aqui se declaran las constantes 
const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const url = require('url');
const path = require('path');

// Mientras este activo el proceso se refresacaran todos los cambios
/*if (process.env.NODE_ENV !== 'production') {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
    });
}*/

// Declaramos variables
let main_window
let new_product_window

app.on('ready', () => {
    // Evento de inicio de la aplicacion que llama a los html
    main_window = new BrowserWindow({
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            enableRemoteModule: true
        }
    });
    main_window.loadURL(url.format({
        pathname: path.join(__dirname, '../views/index.html'),
        protocol: 'file',
        slashes: true
    }))

    //main_window.setMenu(null);

    // Aqui se cierra todo el programa al cerrar la ventana principal
    main_window.on('closed', () => {
        app.quit();
    })
});