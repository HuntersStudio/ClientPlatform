import { showAlert } from '../../views/js/session/showAlert.js';

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#register-form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.querySelector("#name").value;
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        const repeatPassword = document.querySelector("#repeat-password").value;
        const terms = document.querySelector("#terms").checked;

        const nameError = document.querySelector("#name-error");
        const emailError = document.querySelector("#email-error");
        const passwordError = document.querySelector("#password-error");
        const repeatPasswordError = document.querySelector("#repeat-password-error");
        const termsError = document.querySelector("#terms-error");

        nameError.style.display = 'none';
        emailError.style.display = 'none';
        passwordError.style.display = 'none';
        repeatPasswordError.style.display = 'none';
        termsError.style.display = 'none';

        let isValid = true;

        if (!name) {
            nameError.style.display = 'inline';
            nameError.setAttribute('title', 'Por favor, introduce tu nombre.');
            isValid = false;
        }

        if (!email) {
            emailError.style.display = 'inline';
            emailError.setAttribute('title', 'Por favor, introduce tu email.');
            isValid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            emailError.style.display = 'inline';
            emailError.setAttribute('title', 'Por favor, introduce un email válido.');
            isValid = false;
        }

        if (!password) {
            passwordError.style.display = 'inline';
            passwordError.setAttribute('title', 'Por favor, introduce tu contraseña.');
            isValid = false;
        } else if (password.length < 8) {
            passwordError.style.display = 'inline';
            passwordError.setAttribute('title', 'La contraseña debe tener al menos 8 caracteres.');
            isValid = false;
        }

        if (!repeatPassword) {
            repeatPasswordError.style.display = 'inline';
            repeatPasswordError.setAttribute('title', 'Por favor, repite tu contraseña.');
            isValid = false;
        } else if (password !== repeatPassword) {
            repeatPasswordError.style.display = 'inline';
            repeatPasswordError.setAttribute('title', 'Las contraseñas no coinciden.');
            isValid = false;
        }

        if (!terms) {
            termsError.style.display = 'inline';
            termsError.setAttribute('title', 'Debes aceptar los términos y condiciones.');
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        const userData = {
            userName: name,
            email: email,
            password: password
        };

        document.getElementById('overlay').style.display = 'block';
        document.getElementById('spinner').style.display = 'block';

        fetch('http://localhost:8004/service/addUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            document.getElementById('overlay').style.display = 'none';
            document.getElementById('spinner').style.display = 'none';
            
            return response.json().then(data => {
                if (!response.ok) {
                    if (data.error === 'Username and Email already exists') {
                        nameError.style.display = 'inline';
                        nameError.setAttribute('title', 'El nombre de usuario ya está en uso.');
                        emailError.style.display = 'inline';
                        emailError.setAttribute('title', 'Esta cuenta de correo ya está en uso.');
                    } else if (data.error === 'Username already exists') {
                        nameError.style.display = 'inline';
                        nameError.setAttribute('title', 'El nombre de usuario ya está en uso.');
                    } else if (data.error === 'Email already exists') {
                        emailError.style.display = 'inline';
                        emailError.setAttribute('title', 'Esta cuenta de correo ya está en uso.');
                    } else {
                        console.error('Error no manejado:', data.error);
                    }
                    throw new Error(data.error);
                }
                return data;
            });
        })
        .then(data => {
            console.log(data);
            
            window.location.href = "login.html?registrationSuccess=true";
            
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