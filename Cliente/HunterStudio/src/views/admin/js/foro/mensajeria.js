document.addEventListener('contentReady', function (event) {
    const token = sessionStorage.getItem('token');
    let userName = '';
    let userRole = '';

    if (token) {
        const userUrl = 'http://localhost:8004/service/getUserDetails';

        fetch(userUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('La respuesta de la red no fue correcta');
                }
                return response.json();
            })
            .then(data => {
                userName = data.userName;
                userRole = data.role[0].role;
            })
            .catch(error => {
                console.error('Error al obtener los detalles del usuario:', error);
            });
    } else {
        console.error('No hay token en sessionStorage');
    }

    if (!window.myApp) {
        window.myApp = {};

        const SockJS = require('sockjs-client');
        const { Client } = require('@stomp/stompjs');

        const socket = new SockJS('http://localhost:8003/websocket');
        const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: (frame) => {
                console.log('Connected: ' + frame);

                // Suscribirse al tema "/topic/messages"
                stompClient.subscribe('/topic/messages', (message) => {
                    console.log("Mensaje recibido:", message);
                    try {
                        const parsedMessage = JSON.parse(message.body);
                        showMessage(parsedMessage);
                    } catch (error) {
                        console.error("Error al analizar el mensaje:", error);
                    }
                });
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            }
        });

        stompClient.activate();

        function sendMessage() {
            const text = document.getElementById('messageInput').value;

            if (text.trim() === '') {
                alert('El mensaje no puede estar vacío');
                return;
            }

            stompClient.publish({
                destination: '/app/chat',
                body: JSON.stringify({ from: userName, text, role: userRole })
            });
        }

        function showMessage(message) {
            const response = document.getElementById('messages');
            if (response) {
                const p = document.createElement('p');
                p.classList.add('message');

                if (message.role === 'ADMIN') {
                    p.classList.add('admin-message');
                } else {
                    p.classList.add('regular-message');
                }

                const fromSpan = document.createElement('span');
                fromSpan.classList.add('message-from');
                fromSpan.textContent = `${message.from}`;

                const roleSpan = document.createElement('span');
                roleSpan.classList.add('message-role');
                roleSpan.textContent = `(${message.role})`;

                const textSpan = document.createElement('span');
                textSpan.classList.add('message-text');
                textSpan.textContent = `${message.text}`;

                p.appendChild(fromSpan);
                p.appendChild(document.createTextNode(' '));
                p.appendChild(roleSpan);
                p.appendChild(document.createTextNode(': '));
                p.appendChild(textSpan);

                response.appendChild(p);
            } else {
                console.error("El elemento 'response' no se encontró en el DOM.");
            }

        }

        document.getElementById('send').addEventListener('click', () => {
            sendMessage();
        });
    }
});