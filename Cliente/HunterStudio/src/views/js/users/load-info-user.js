document.addEventListener('contentReady', function(event) {
  
  const campousers = document.querySelector('.users_name');
  const campoEmail = document.querySelector('.users_mail');
  const category = document.querySelector('.num_category');
  const fecha = document.querySelector('.fecha');

  const token = sessionStorage.getItem('token');

  if (token) {
    const usersUrl = 'http://localhost:8004/service/getusersDetails';

    fetch(usersUrl, {
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
        campousers.textContent = data.usersName;
        campoEmail.textContent = data.email;
        category.textContent = data.categoryLevel;
        fecha.textContent = data.registrationDate;
      })
      .catch(error => {
        console.error('Error al obtener los detalles del users:', error);
      });
  } else {
    console.error('No hay token en sessionStorage');
  }
});