const { ipcRenderer } = require('electron');

document.getElementById('close-btn').addEventListener('click', () => {
    // Cerrar la ventana actual
    window.close();
});

// Agregar un evento de clic al botón de minimizar
document.getElementById('minimized-btn').addEventListener('click', () => {
    // Enviar un mensaje al proceso principal para minimizar la ventana
    ipcRenderer.send('minimizar-ventana');
});

document.getElementById('maximized-btn').addEventListener('click', () => {
    // Enviar un mensaje al proceso principal para maximizar la ventana
    ipcRenderer.send('maximizar-ventana');
});

document.getElementById('ShowHidenMenus').addEventListener('click', () => {
    const lists = document.getElementsByClassName('left-menu');
    for (let i = 0; i < lists.length; i++) {
        if (lists[i].style.display === "block") {
            lists[i].style.display = "none"; // Si está mostrado, lo ocultamos
        } else {
            lists[i].style.display = "block"; // Si está oculto, lo mostramos
        }
    }
});

document.getElementById('reload-btn').addEventListener('click', () => {
    // Recargar la ventana actual
    location.reload();
});
