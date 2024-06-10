document.addEventListener('contentReady', function () {

    let stompClient = null;
    const userName = "Usuario";
    const userRole = "USER";
    const currentChannelName = "default-channel";
  
    const token = sessionStorage.getItem('token');
  
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
          userName.textContent = data.userName;
          userRole = data.userRole[0].role;
        })
        .catch(error => {
          console.error('Error al obtener los detalles del usuario:', error);
        });
    } else {
      console.error('No hay token en sessionStorage');
    }
  
  
    function connect() {
      const socket = new SockJS('/ws');
      stompClient = Stomp.over(socket);
  
      stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/messages', function (messageOutput) {
          showMessage(JSON.parse(messageOutput.body));
        });
      });
    }
  
    function sendMessage() {
      const messageInput = document.getElementById('messageInput');
      const content = messageInput.value.trim();
  
      if (content === '') {
        alert('El mensaje no puede estar vacío');
        return;
      }
  
      const message = {
        sender: userName,
        content: content,
        role: userRole,
        channelName: currentChannelName
      };
  
      if (currentChannelName) {
        stompClient.send("/app/chat", {}, JSON.stringify(message));
        messageInput.value = '';
      } else {
        alert('Por favor, selecciona un canal primero.');
      }
    }
  
    function showMessage(message) {
      const messagesContainer = document.getElementById('messages');
  
      if (messagesContainer) {
        const messageElement = document.createElement('p');
        messageElement.classList.add('message');
  
        if (message.role === 'ADMIN') {
          messageElement.classList.add('admin-message');
        } else {
          messageElement.classList.add('regular-message');
        }
  
        const senderSpan = document.createElement('span');
        senderSpan.classList.add('message-from');
        senderSpan.textContent = message.sender;
  
        const roleSpan = document.createElement('span');
        roleSpan.classList.add('message-role');
        roleSpan.textContent = `(${message.role})`;
  
        const contextSpan = document.createElement('span');
        contextSpan.classList.add('message-text');
        contextSpan.textContent = message.content;
  
        messageElement.appendChild(senderSpan);
        messageElement.appendChild(document.createTextNode(' '));
        messageElement.appendChild(roleSpan);
        messageElement.appendChild(document.createTextNode(': '));
        messageElement.appendChild(contextSpan);
  
        messagesContainer.appendChild(messageElement);
      } else {
        console.error("El elemento 'messages' no se encontró en el DOM.");
      }
    }
  
    window.onload = connect;
  });