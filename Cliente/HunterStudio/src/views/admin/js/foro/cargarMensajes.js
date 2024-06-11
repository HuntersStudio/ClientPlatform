async function checkOrCreateChannel(channelName) {
    const response = await fetch(`http://localhost:8003/channels/getChannelByName/${channelName}`);
    if (response.ok) {
        const channel = await response.json();
        return channel;
    } else {
        const newChannel = { name: channelName, type: "publico" };
        const createResponse = await fetch('http://localhost:8003/channels/addChannel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newChannel)
        });
        if (createResponse.ok) {
            // Si se crea el canal correctamente, retornar el canal creado
            const createdChannel = await createResponse.json();
            return createdChannel;
        } else {
            // Manejar el caso en que no se pueda crear el canal
            console.error('No se pudo crear el canal.');
            return null;
        }
    }
}

// Ejemplo de uso:
const channelName = 'general';
checkOrCreateChannel(channelName)
    .then(channel => {
        if (channel) {
            console.log('El canal existe o se creó con éxito:', channel);
        } else {
            console.log('No se pudo obtener o crear el canal.');
        }
    })
    .catch(error => {
        console.error('Error al obtener o crear el canal:', error);
    });