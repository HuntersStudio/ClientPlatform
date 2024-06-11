async function cargarMensajes(channelName) {
    try {
        const response = await fetch(`http://localhost:8003/messages/getMessageByChannel/${channelName}`);

        if (response.ok) {
            const messages = await response.json();
            
            const messagesContainer = document.getElementById('messages');
            messages.forEach(message => {
                const messageElement = document.createElement('div');
                messageElement.textContent = `${message.sender}: ${message.content}`;
                messagesContainer.appendChild(messageElement);
            });
        } else {
            console.error('Error al cargar los mensajes:', response.statusText);
        }
    } catch (error) {
        console.error('Error al cargar los mensajes:', error.message);
    }
}

document.addEventListener('contentReady', () => {
    cargarMensajes('general');
});