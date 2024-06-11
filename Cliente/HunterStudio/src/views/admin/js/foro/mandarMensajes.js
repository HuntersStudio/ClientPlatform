// Obtener referencia al botón de enviar mensaje y al área de entrada de texto
const sendButton = document.getElementById('send');
const messageInput = document.getElementById('messageInput');

// Manejador de evento para el clic en el botón de enviar mensaje
sendButton.addEventListener('click', async () => {
    // Obtener el contenido del mensaje del área de entrada de texto
    const messageContent = messageInput.value;
    // Obtener el nombre del canal desde algún lugar (puede ser fijo o dinámico)
    const channelName = 'general';

    try {
        // Realizar una solicitud POST al endpoint de agregar mensaje
        const response = await fetch('http://localhost:8003/messages/addMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: messageContent,
                sender: 'Marcos', // Aquí puedes definir el remitente del mensaje
                role: 'ADMIN', // Puedes definir el rol del remitente
                channelName: channelName // Nombre del canal al que se enviará el mensaje
            })
        });

        // Verificar si la solicitud fue exitosa
        if (response.ok) {
            // Limpiar el área de entrada de texto después de enviar el mensaje
            messageInput.value = '';
            console.log('Mensaje enviado con éxito');
        } else {
            // Manejar el caso en que la solicitud no sea exitosa
            console.error('Error al enviar el mensaje:', response.statusText);
        }
    } catch (error) {
        // Manejar cualquier error en la solicitud
        console.error('Error al enviar el mensaje:', error.message);
    }
});