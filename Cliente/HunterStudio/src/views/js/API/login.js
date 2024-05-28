document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#login-button").addEventListener("click", (event) => {
        event.preventDefault();

        const user = document.querySelector("#user").value;
        const password = document.querySelector("#password").value;

        const userError = document.querySelector("#email-error");
        const passError = document.querySelector("#password-error");

        userError.style.display = 'none';
        passError.style.display = 'none';

        let isValid = true;

        if (!user) {
            userError.style.display = 'inline';
            userError.setAttribute('title', 'Por favor, introduce tu email o nombre.');
            isValid = false;
        }

        if (!password) {
            passError.style.display = 'inline';
            passError.setAttribute('title', 'Por favor, introduce tu contraseña.');
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        const createUrl = 'http://localhost:8003/auth/login';

        const credentials = {
            name: user,
            password: password
        };

        fetch(createUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('La respuesta de la red no fue correcta');
            }
            return response.text();
        })
        .then(data => {
            console.log(data);
            sessionStorage.setItem("name", user); // Guarda el nombre de usuario en sessionStorage
            sessionStorage.setItem("token", data); // Aqui se guarda el token
            window.location.href = "../index.html";
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
