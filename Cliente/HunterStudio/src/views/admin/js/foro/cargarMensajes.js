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

    await cargarMensajes(channelName);
    
    await scrollToBottom();
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
            messages.forEach(message => {
                showMessage({ body: message });
            });
        } else {
            console.error('Error al cargar los mensajes:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error al cargar los mensajes:', error.message);
    }
}

async function showMessage(message) {
    const messagesContainer = document.getElementById('messages');
    const messageElement = document.createElement('div');

    try {
        const info = await getInfo();
        
        if (info.userName === message.body.sender) {
            messageElement.classList.add('self');
        }

        if (message.body.role === 'ADMIN') {
            messageElement.classList.add('admin');
        }

        messageElement.classList.add('message');
        messageElement.textContent = `${message.body.sender}: ${message.body.content}`;
        messagesContainer.appendChild(messageElement);

        await scrollToBottom(); // Desplazar hacia abajo después de añadir el mensaje
    } catch (error) {
        console.error('Error obteniendo la información del usuario:', error);
    }
}

async function getInfo() {
    const token = sessionStorage.getItem('token');

    if (!token) {
        console.error('No hay token en sessionStorage');
        throw new Error('No hay token en sessionStorage');
    }

    const userUrl = 'http://localhost:8004/service/getUserDetails';

    try {
        const response = await fetch(userUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        if (!response.ok) {
            throw new Error('La respuesta de la red no fue correcta');
        }

        const data = await response.json();
        return {
            userName: data.userName,
            role: data.userRoles[0].role
        };
    } catch (error) {
        console.error('Error al obtener los detalles del usuario:', error);
        throw error;
    }
}

async function scrollToBottom() {
    const messagesContainer = document.getElementById('messages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}