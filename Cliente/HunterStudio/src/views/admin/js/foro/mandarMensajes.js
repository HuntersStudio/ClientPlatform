(async function() {
    const sendButton = document.getElementById('send');
    const messageInput = document.getElementById('messageInput');

    sendButton.addEventListener('click', async () => {
        const messageContent = messageInput.value.trim();
        if (messageContent) {
            try {
                await sendMessageToServer(messageContent);
                messageInput.value = '';
            } catch (error) {
                console.error('Error al enviar el mensaje:', error);
            }
        }
    });
})();

async function sendMessageToServer(content) {
    try {
        const info = await getInfo();

        if (!info || !info.userName || !info.role) {
            console.error('Información de usuario incompleta:', info);
            throw new Error('Información de usuario incompleta');
        }

        const messageDto = {
            content: content,
            sender: info.userName,
            role: info.role,
            channelName: 'general'
        };

        const response = await fetch('http://localhost:8003/messages/addMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(messageDto)
        });

        if (!response.ok) {
            throw new Error('Error al enviar el mensaje');
        }

        const message = await response.json();
        console.log('Mensaje enviado:', message);
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
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