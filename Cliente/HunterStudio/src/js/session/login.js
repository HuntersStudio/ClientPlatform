import { showAlert } from '../../views/js/session/showAlert.js';

const urlParams = new URLSearchParams(window.location.search);
const registrationSuccess = urlParams.get('registrationSuccess');

if (registrationSuccess === 'true') {
    showAlert('Usuario agregado correctamente.', true);
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#login-form");
    const usernameInput = document.querySelector("#user");
    const passwordInput = document.querySelector("#password");
    const rememberMeCheckbox = document.querySelector("#remember");

    // Cargar datos guardados
    if (localStorage.getItem("rememberMe") === "true") {
        usernameInput.value = localStorage.getItem("username") || "";
        passwordInput.value = localStorage.getItem("password") || "";
        rememberMeCheckbox.checked = true;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const user = usernameInput.value;
        const password = passwordInput.value;
        const remember = rememberMeCheckbox.checked;

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
            password: password,
            remember: remember
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
                        } else if (errorMessage === 'Incorrect credentials') {
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

                if (remember) {
                    localStorage.setItem("username", user);
                    localStorage.setItem("password", password);
                    localStorage.setItem("rememberMe", true);
                } else {
                    localStorage.removeItem("username");
                    localStorage.removeItem("password");
                    localStorage.removeItem("rememberMe");
                }

                window.location.href = "index.html";

                /* PARTE PARA LA APLICACION DE ADMIN*/

                //const role = data.role[0].role;

                // Redirigir según el rol del usuario
                /*if (role === 'ADMIN') {
                    window.location.href = "./admin/admin-index.html";
                } else if (role === 'USER') {
                    window.location.href = "./user/user-index.html";
                */
            })
            .catch(error => {
                document.getElementById('overlay').style.display = 'none';
                document.getElementById('spinner').style.display = 'none';

                console.error('Error:', error);
                if (error instanceof TypeError) {
                    showAlert('No se pudo establecer la conexión con el servidor. Por favor, inténtalo de nuevo más tarde.');
                } else {
                    showAlert('Ocurrió un error inesperado. Por favor, inténtalo de nuevo.');
                }
            });
    });
});
