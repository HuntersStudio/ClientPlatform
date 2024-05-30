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

        const credentials = {
            name: user,
            password: password
        };

        fetch('http://localhost:8003/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(errorMessage => {

                        if (errorMessage === 'Username not exists') {
                            userError.style.display = 'inline';
                            userError.setAttribute('title', 'El nombre de usuario no existe.');
                        }
                        
                         if (errorMessage === 'Incorrect credentials') {
                            userError.style.display = 'inline';
                            userError.setAttribute('title', 'Usuario o contraseña incorrecta.');
                            passError.style.display = 'inline';
                            passError.setAttribute('title', 'Usuario o contraseña incorrecta.');

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

                sessionStorage.setItem("name", user);
                sessionStorage.setItem("token", data);
                window.location.href = "../index.html";
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});
