document.addEventListener('contentReady', () => {
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
});

async function sendMessageToServer(content) {
    const messageDto = {
        content: content,
        sender: 'Marcos',
        role: 'ADMIN',
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
}