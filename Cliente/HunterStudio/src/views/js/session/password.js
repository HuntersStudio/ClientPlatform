function savePassword(password) {
    localStorage.setItem('savedPassword', password);
}

function loadPassword() {
    return localStorage.getItem('savedPassword');
}

function deletePassword() {
    localStorage.removeItem('savedPassword');
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login-form");
    const passwordInput = document.querySelector("#password");
    const rememberCheckbox = document.querySelector("#remember");

    const savedPassword = loadPassword();
    if (savedPassword) {
        passwordInput.value = savedPassword;
        rememberCheckbox.checked = true;
    }

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        
        const email = document.querySelector("#email").value;
        const password = passwordInput.value;
        const rememberPassword = rememberCheckbox.checked;

        if (rememberPassword) {
            savePassword(password);
        } else {
            deletePassword();
        }
    });
});