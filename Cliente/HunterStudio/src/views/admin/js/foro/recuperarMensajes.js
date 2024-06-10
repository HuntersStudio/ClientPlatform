// Función para cargar los mensajes del canal seleccionado
function cargarMensajes(channelId) {
    fetch(`/messages/getMessageByChannel/${channelId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los mensajes');
            }
            return response.json();
        })
        .then(data => {
            // Renderizar los mensajes en la interfaz de usuario
            renderizarMensajes(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Función para renderizar los mensajes en la interfaz de usuario
function renderizarMensajes(messages) {
    const messagesContainer = document.getElementById('messages-container');
    // Limpiar el contenedor de mensajes antes de renderizar nuevos mensajes
    messagesContainer.innerHTML = '';
    // Iterar sobre cada mensaje y renderizarlo en la interfaz de usuario
    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.textContent = `${message.sender}: ${message.content}`;
        messagesContainer.appendChild(messageElement);
    });
}

// Evento cuando se selecciona un canal
document.getElementById('channel-select').addEventListener('change', function(event) {
    const channelId = event.target.value;
    cargarMensajes(channelId);
});