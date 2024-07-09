function generate_window(enlace_ventana) {
    // Enviar solicitud al proceso principal para abrir la ventana
    require('electron').ipcRenderer.send('open-windows', enlace_ventana);
}