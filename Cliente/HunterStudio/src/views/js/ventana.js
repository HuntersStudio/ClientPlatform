function generar_ventana(enlace_ventana) {
    // Enviar solicitud al proceso principal para abrir la ventana
    require('electron').ipcRenderer.send('abrir-ventana', enlace_ventana);
}