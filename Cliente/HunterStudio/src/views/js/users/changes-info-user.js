(function () {
    const changeMailButton = document.querySelector(".change_mail");
    const usersMailInput = document.querySelector(".users_mail");

    changeMailButton.addEventListener("click", function () {
        if (changeMailButton.textContent === "Confirmar") {

            console.log(usersMailInput.value);   

            const url = 'http://localhost:8004/service/updateMail/' + usersMailInput.value;
            const token = sessionStorage.getItem('token');


            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            })
            .then(response => {
                if (response.ok) {
                    return { success: true };
                } else {
                    throw new Error('Error en la solicitud');
                }
            })
            .then(data => {
                if (data.success) {
                    changeMailButton.textContent = "Cambiar Correo";
                    usersMailInput.readOnly = true;
                } else {
                    console.log("Error al cambiar el correo");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Error al cambiar el correo. Por favor, inténtelo de nuevo.");
            });
        } else {
            changeMailButton.textContent = "Confirmar";
            usersMailInput.readOnly = false;
            usersMailInput.focus();
        }
    });
})();