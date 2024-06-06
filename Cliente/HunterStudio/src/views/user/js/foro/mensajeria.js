// Verifica si las variables ya están definidas
if (typeof window.SockJS === 'undefined') {
    window.SockJS = require('sockjs-client');
}

if (typeof window.StompClient === 'undefined') {
    window.StompClient = require('@stomp/stompjs').Client;
}

(function() {
    // Encapsula tu código para evitar la contaminación global
    if (!window.myApp) {
        window.myApp = {};

        const socket = new window.SockJS('http://localhost:8003/websocket');
        const stompClient = new window.StompClient({
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
            const from = document.getElementById('from').value;
            const text = document.getElementById('text').value;
            stompClient.publish({
                destination: '/app/chat',
                body: JSON.stringify({ from, text })
            });
        }

        function showMessage(message) {
            const response = document.getElementById('response');
            if (response) {
                const p = document.createElement('p');
                p.appendChild(document.createTextNode(`${message.from}: ${message.text}`));
                response.appendChild(p);
            } else {
                console.error("El elemento 'response' no se encontró en el DOM.");
            }
        }

        document.getElementById('send').addEventListener('click', () => {
            sendMessage();
        });
    }
})();