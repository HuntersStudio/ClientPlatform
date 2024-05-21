document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#register-button").addEventListener("click", (event) => {
        event.preventDefault(); // Evita el comportamiento por defecto del formulario

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

        // Restablecer mensajes de error
        nameError.textContent = '';
        emailError.textContent = '';
        passwordError.textContent = '';
        repeatPasswordError.textContent = '';
        termsError.textContent = '';

        let isValid = true;

        if (!name) {
            nameError.textContent = 'Por favor, introduce tu nombre.';
            isValid = false;
        }

        if (!email) {
            emailError.textContent = 'Por favor, introduce tu email.';
            isValid = false;
        }

        if (!password) {
            passwordError.textContent = 'Por favor, introduce tu contraseña.';
            isValid = false;
        } else if (password.length < 8) {
            passwordError.textContent = 'La contraseña debe tener al menos 8 caracteres.';
            isValid = false;
        }

        if (!repeatPassword) {
            repeatPasswordError.textContent = 'Por favor, repite tu contraseña.';
            isValid = false;
        } else if (password !== repeatPassword) {
            repeatPasswordError.textContent = 'Las contraseñas no coinciden.';
            isValid = false;
        }

        if (!terms) {
            termsError.textContent = 'Debes aceptar los términos y condiciones.';
            isValid = false;
        }

        if (isValid) {
            // Si todo está bien, enviar el formulario
            const userData = {
                name: name,
                email: email,
                password: password
            };

            fetch('http://localhost:8003/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('La respuesta de la red no fue correcta');
                }
                return response.json(); // Convertir la respuesta a JSON
            })
            .then(data => {
                console.log(data);
                alert("Registro exitoso");
                window.location.href = "./login.html"; // Redirigir al login después del registro exitoso
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Error en el registro");
            });
        }
    });
});