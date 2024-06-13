(function () {
    const changeMailButton = document.querySelector(".change_mail");
    const userMailInput = document.querySelector(".user_mail");
    const loadingGif = document.querySelector(".loading-gif");

    changeMailButton.addEventListener("click", function () {
        if (changeMailButton.textContent === "Confirmar") {
            const url = 'http://localhost:8004/service/updateMail';
            const token = sessionStorage.getItem('token');

            // Mostrar el GIF de carga
            loadingGif.style.display = "absolute";

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({ mail: userMailInput.value })
            })
            .then(response => response.json())
            .then(data => {
                // Ocultar el GIF de carga
                loadingGif.style.display = "none";

                if (data.success) {
                    changeMailButton.textContent = "Cambiar Correo";
                    userMailInput.readOnly = true;
                } else {
                    alert("Error al cambiar el correo: " + data.message);
                }
            })
            .catch(error => {
                // Ocultar el GIF de carga
                loadingGif.style.display = "none";

                console.error("Error:", error);
                alert("Error al cambiar el correo. Por favor, inténtelo de nuevo.");
            });
        } else {
            changeMailButton.textContent = "Confirmar";
            userMailInput.readOnly = false;
            userMailInput.focus();
        }
    });
})();