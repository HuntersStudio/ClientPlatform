const textarea = document.getElementById('texto');

textarea.addEventListener('input', function() {
    this.style.height = 'auto'; // Restablece la altura automática
    this.style.height = (this.scrollHeight) + 'px'; // Ajusta la altura según el contenido
});