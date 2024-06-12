import { showAlert } from './showAlert.js';

const urlParams = new URLSearchParams(window.location.search);
const registrationSuccess = urlParams.get('registrationSuccess');

if (registrationSuccess === 'true') {
    showAlert('Usuario agregado correctamente.', true);
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#login-button").addEventListener("click", (event) => {
        event.preventDefault();

        const user = document.querySelector("#user").value;
        const password = document.querySelector("#password").value;
        const remember = document.querySelector("#remember").value;

        const userError = document.querySelector("#email-error");
        const passError = document.querySelector("#password-error");

        userError.style.display = 'none';
        passError.style.display = 'none';

        let isValid = true;

        if (!user) {
            userError.style.display = 'inline';
            userError.setAttribute('title', 'Por favor, introduce tu nombre o email.');
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

        const credentials = {
            username: user,
            password: password
        };

        document.getElementById('overlay').style.display = 'block';
        document.getElementById('spinner').style.display = 'block';

        fetch('http://localhost:8004/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
            .then(response => {

                document.getElementById('overlay').style.display = 'none';
                document.getElementById('spinner').style.display = 'none';

                if (!response.ok) {
                    return response.text().then(errorMessage => {

                        if (errorMessage === 'Username not exists') {
                            userError.style.display = 'inline';
                            userError.setAttribute('title', 'El nombre de usuario o email no existen.');
                        }

                        if (errorMessage === 'Incorrect credentials') {
                            userError.style.display = 'inline';
                            userError.setAttribute('title', 'Usuario o Email incorrectos.');
                            passError.style.display = 'inline';
                            passError.setAttribute('title', 'Contraseña incorrecta.');

                        } else {
                            console.error('Error:', errorMessage);
                        }
                        throw new Error(errorMessage);
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log(data);

                sessionStorage.setItem("token", data.token);

                const role = data.role[0].role;

                // Redirigir según el rol del usuario
                if (role === 'ADMIN') {
                    window.location.href = "./admin/admin-index.html";
                } else if (role === 'USER') {
                    window.location.href = "./user/user-index.html";
                } else {
                    throw new Error("Error de permisos");
                }

            })
            .catch(error => {

                document.getElementById('overlay').style.display = 'none';
                document.getElementById('spinner').style.display = 'none';

                console.error('Error:', error);
                if (error instanceof TypeError) {
                    showAlert('No se pudo establecer la conexión con el servidor. Por favor, inténtalo de nuevo más tarde.');
                }
            });
    });
});
