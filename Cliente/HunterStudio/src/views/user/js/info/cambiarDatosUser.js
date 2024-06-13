(function () {
    const changeMailButton = document.querySelector(".change_mail");
    const userMailInput = document.querySelector(".user_mail");

    changeMailButton.addEventListener("click", function () {
        if (changeMailButton.textContent === "Confirmar") {

            console.log(userMailInput.value);   

            const url = 'http://localhost:8004/service/updateMail/' + userMailInput.value;
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
                    userMailInput.readOnly = true;
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
            userMailInput.readOnly = false;
            userMailInput.focus();
        }
    });
})();