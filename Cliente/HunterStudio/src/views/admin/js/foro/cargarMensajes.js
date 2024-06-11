const res = require("express/lib/response");

async function checkOrCreateChannel(channelName) {

    const token = sessionStorage.getItem('token');

    const response = await fetch(`http://localhost:8003/channels/getChannelByName/${channelName}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(async response => {
            const channel = await response.json();
            return channel;
        })
        .catch(async error => {
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
        });
}

document.addEventListener('contentReady', () => {
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
});