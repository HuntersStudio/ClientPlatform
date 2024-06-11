// Función para cargar los mensajes de un canal específico
async function cargarMensajes(channelName) {
    try {
        // Realizar una solicitud GET al endpoint para obtener los mensajes del canal
        const response = await fetch(`http://localhost:8003/messages/getMessageByChannel/${channelName}`);

        // Verificar si la solicitud fue exitosa
        if (response.ok) {
            // Convertir la respuesta a formato JSON
            const messages = await response.json();
            
            // Procesar los mensajes y mostrarlos en el HTML
            const messagesContainer = document.getElementById('messages');
            messages.forEach(message => {
                const messageElement = document.createElement('div');
                messageElement.textContent = `${message.sender}: ${message.content}`;
                messagesContainer.appendChild(messageElement);
            });
        } else {
            // Manejar el caso en que la solicitud no sea exitosa
            console.error('Error al cargar los mensajes:', response.statusText);
        }
    } catch (error) {
        // Manejar cualquier error en la solicitud
        console.error('Error al cargar los mensajes:', error.message);
    }
}

// Llamar a la función cargarMensajes con el nombre del canal deseado
cargarMensajes('general');