(async function() {

    let stompClient = null;

    try {
        await connectWebSocket();
        const stompClient = getStompClient();

        stompClient.subscribe('/topic/messages', (message) => {
            showMessage(JSON.parse(message.body));
        });

        console.log('WebSocket connection and subscription setup complete.');
    } catch (error) {
        console.error('Error setting up WebSocket connection:', error);
    }

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

    function connectWebSocket() {
        const socket = new SockJS('http://localhost:8003/ws');
        stompClient = Stomp.over(socket);

        return new Promise((resolve, reject) => {
            stompClient.connect({}, (frame) => {
                console.log('Connected: ' + frame);
                resolve(stompClient);
            }, (error) => {
                console.error('Error connecting to WebSocket:', error);
                reject(error);
            });
        });
    }

    function getStompClient() {
        if (!stompClient) {
            throw new Error('WebSocket is not connected. Call connectWebSocket first.');
        }
        return stompClient;
    }

    async function showMessage(message) {
        const messagesContainer = document.getElementById('messages');
        const messageElement = document.createElement('div');
        
        console.log(message);

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
        } catch (error) {
            console.error('Error obteniendo la información del usuario:', error);
        }
    }

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

            const stompClient = getStompClient();
            stompClient.send("/app/chat", {}, JSON.stringify(messageDto));
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
})();