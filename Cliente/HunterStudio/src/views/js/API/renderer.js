const axios = require('axios');
const io = require('socket.io-client');
const socket = io('http://localhost:8001');

document.addEventListener('DOMContentLoaded', () => {
    const messagesDiv = document.getElementById('messages');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');

    const loadMessages = async () => {
        try {
            console.log("Enviando solicitud GET a /api/messages");
            const response = await axios.get('http://localhost:8001/api/messages');
            console.log("Respuesta recibida: ", response.data);
            messagesDiv.innerHTML = '';
            response.data.forEach(message => {
                const messageElement = document.createElement('div');
                messageElement.textContent = message.content;
                messagesDiv.appendChild(messageElement);
            });
        } catch (error) {
            console.error('Error loading messages:', error);
        }
    };

    sendButton.addEventListener('click', async () => {
        const message = messageInput.value;
        if (message.trim()) {
            try {
                console.log("Enviando solicitud POST a /api/messages con contenido: ", message);
                await axios.post('http://localhost:8001/api/messages', { content: message });
                messageInput.value = '';
                loadMessages();
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    });

    loadMessages();
});


socket.on('connect', () => {
    console.log('Conectado al servidor de WebSocket');
});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor de WebSocket');
});