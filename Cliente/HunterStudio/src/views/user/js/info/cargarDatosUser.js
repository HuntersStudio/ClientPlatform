document.addEventListener('contentReady', function(event) {
  
  const campoUser = document.querySelector('.user_name');
  const campoEmail = document.querySelector('.user_mail');
  const categoria = document.querySelector('.num_categoria');
  const fecha = document.querySelector('.fecha');

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
        campoUser.textContent = data.userName;
        campoEmail.textContent = data.email;
        categoria.textContent = data.categoryLevel;
        fecha.textContent = data.registrationDate;
      })
      .catch(error => {
        console.error('Error al obtener los detalles del usuario:', error);
      });
  } else {
    console.error('No hay token en sessionStorage');
  }
});