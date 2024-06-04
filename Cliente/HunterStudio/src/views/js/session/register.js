function showAlert(message) {
    const alertContainer = document.createElement('div');
    alertContainer.className = 'alert-container';

    const alertMessage = document.createElement('span');
    alertMessage.className = 'alert-message';
    alertMessage.textContent = message;

    const closeButton = document.createElement('button');
    closeButton.className = 'alert-close';
    closeButton.innerHTML = '<i class="fi fi-ts-circle-xmark"></i>';
    closeButton.addEventListener('click', () => {
        document.body.removeChild(alertContainer);
    });

    alertContainer.appendChild(alertMessage);
    alertContainer.appendChild(closeButton);
    document.body.appendChild(alertContainer);

    setTimeout(() => {
        if (alertContainer.parentNode) {
            document.body.removeChild(alertContainer);
        }
    }, 5000);
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#register-button").addEventListener("click", (event) => {
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
            password: password,
            email: email
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
            if (!response.ok) {
                return response.text().then(errorMessage => {

                    if(errorMessage === 'Username and Email already exists') {
                        nameError.style.display = 'inline';
                        nameError.setAttribute('title', 'El nombre de usuario ya está en uso.');
                        emailError.style.display = 'inline';
                        emailError.setAttribute('title', 'Esta cuenta de correo ya está en uso.');

                    } if (errorMessage === 'Username already exists') {
                        nameError.style.display = 'inline';
                        nameError.setAttribute('title', 'El nombre de usuario ya está en uso.');

                    } else if (errorMessage === 'Email already exists') {
                        emailError.style.display = 'inline';
                        emailError.setAttribute('title', 'Esta cuenta de correo ya está en uso.');
 
                    } else {
                        console.error('Error no manejado:', errorMessage);
                    }
                    throw new Error(errorMessage);
                });
            }
            return response.json();
        })
        .then(data => {
            console.log(data);

            window.addEventListener('load', () => {
                document.getElementById('overlay').style.display = 'none';
                document.getElementById('spinner').style.display = 'none';
                window.location.href = "./login.html";
            });
        })
        .catch(error => {
            console.error('Error:', error);
            if (error instanceof TypeError) {
                document.getElementById('overlay').style.display = 'none';
                document.getElementById('spinner').style.display = 'none';
                showAlert('No se pudo establecer la conexión con el servidor. Por favor, inténtalo de nuevo más tarde.');
            }
        });
    });
});