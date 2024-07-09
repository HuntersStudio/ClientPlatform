document.getElementById('executeButton').addEventListener('click', () => {
    const filePath = '"..\\Juego\juego.exe"';
    require('electron').ipcRenderer.send('execute-exe', filePath);
});