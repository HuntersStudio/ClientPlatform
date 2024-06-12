(async function() {
    const channelName = 'general';

    try {
        const channel = await checkOrCreateChannel(channelName);
        if (channel) {
            console.log('El canal existe o se creó con éxito:', channel);
        } else {
            console.log('No se pudo obtener o crear el canal.');
        }
    } catch (error) {
        console.error('Error al obtener o crear el canal:', error);
    }

    cargarMensajes(channelName);

})();

async function checkOrCreateChannel(channelName) {
    const token = sessionStorage.getItem('token');

    try {
        const response = await fetch(`http://localhost:8003/channels/getChannelByName/${channelName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });

        if (response.ok) {
            const channel = await response.json();
            return channel;
        } else if (response.status === 404) {
            const newChannel = { name: channelName, type: "publico" };
            const createResponse = await fetch('http://localhost:8003/channels/addChannel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newChannel)
            });

            if (createResponse.ok) {
                const createdChannel = await createResponse.json();
                return createdChannel;
            } else {
                console.error('No se pudo crear el canal.');
                return null;
            }
        } else {
            console.error('Error al obtener el canal:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error al obtener o crear el canal:', error);
        return null;
    }
}

async function cargarMensajes(channelName) {
    try {
        const response = await fetch(`http://localhost:8003/messages/getMessageByChannel/${channelName}`);

        if (response.ok) {
            const messages = await response.json();
            
            const messagesContainer = document.getElementById('messages');
            if (messagesContainer) {
                messages.forEach(message => {
                    const messageElement = document.createElement('div');
                    messageElement.textContent = `${message.sender}: ${message.content}`;
                    messagesContainer.appendChild(messageElement);
                });
            } else {
                console.error('El contenedor de mensajes no se encontró en el DOM.');
            }
        } else {
            console.error('Error al cargar los mensajes:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error al cargar los mensajes:', error.message);
    }
}