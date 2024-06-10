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

  function loadMessages(channelId) {
    const url = `http://localhost:8003/messages/getMessageByChannel/${channelId}`;

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => response.json())
      .then(messages => {
        messages.forEach(message => showMessage(message));
      })
      .catch(error => {
        console.error('Error al cargar los mensajes del canal:', error);
      });
  }

  window.onload = connect;
  loadMessages(1);
});