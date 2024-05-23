document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#login-button").addEventListener("click", (event) => {
        event.preventDefault(); // Evita el comportamiento por defecto del formulario

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

        const createUrl = 'http://localhost:8003/auth/login/' + user;

        sessionStorage.setItem("userName", user);

        fetch(createUrl, {
            method: 'GET'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('La respuesta de la red no fue correcta');
                }
                return response.text(); // Convertir la respuesta a texto
            })
            .then(data => {
                console.log(data);
                window.location.href = "../index.html";
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});