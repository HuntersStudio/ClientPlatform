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
})();