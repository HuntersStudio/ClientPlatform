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
                if (!response.ok) {
                    return response.text().then(errorMessage => {

                        document.getElementById('overlay').style.display = 'none';
                        document.getElementById('spinner').style.display = 'none';

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

                localStorage.setItem("name", user);
                sessionStorage.setItem("token", data.token);

                window.onload = function() {
                    document.getElementById('overlay').style.display = 'none';
                    document.getElementById('spinner').style.display = 'none';
                    window.location.href = "../index.html";
                };
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
