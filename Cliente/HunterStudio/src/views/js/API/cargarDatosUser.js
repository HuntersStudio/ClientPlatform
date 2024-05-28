document.addEventListener('DOMContentLoaded', function () {

  const campoUser = document.querySelector('.user_name');
  const campoEmail = document.querySelector('.user_mail');
  const categoria = document.querySelector('.categoria');

  const token = sessionStorage.getItem('token');

  if (token) {
    const userUrl = 'http://localhost:8003/consumer/getUserDetails';

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
        campoUser.textContent = data.username;
        campoEmail.textContent = data.email;
        categoria.textContent = data.role;
      })
      .catch(error => {
        console.error('Error al obtener los detalles del usuario:', error);
      });
  } else {
    console.error('No hay token en sessionStorage');
  }
});