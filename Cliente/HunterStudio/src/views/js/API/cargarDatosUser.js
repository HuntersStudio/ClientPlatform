    const campoUser = document.getElementById('user_name')
    const campoEmail = document.getElementById('email')
    var contraseña = document.getElementById('pass')
    const categoria = document.getElementById('categoria')
    const userName = sessionStorage.getItem('userName')
    const createUrl = 'http://localhost:8003/consumer/getUserByName/' + encodeURIComponent(userName)
  
    fetch(createUrl, {
      method: 'GET'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('La respuesta de la red no fue correcta')
        }
        return response.json()
      })
      .then(data => {
        if (data.username) {
          campoUser.textContent = data.username
          campoEmail.textContent = data.email
          categoria.textContent = data.role
          contraseña.value = data.password        
        } else {
          console.error('La respuesta no contiene el nombre de usuario esperado')
        }
      })
      .catch(error => {
        console.error('Error:', error)
      })