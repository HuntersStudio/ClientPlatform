function mostrar(passwordFieldId, iconId) {
    const campoContraseña = document.getElementById(passwordFieldId);
    const icono = document.getElementById(iconId);

    if (campoContraseña && icono) {
        if (campoContraseña.type === 'password') {
            campoContraseña.type = 'text'; // Muestra la contraseña
            icono.classList.remove('fi-rr-eye-crossed'); // Elimina la clase para mostrar una X
            icono.classList.add('fi-rr-eye'); // Añade la clase para mostrar un ojo
        } else {
            campoContraseña.type = 'password'; // Oculta la contraseña
            icono.classList.remove('fi-rr-eye'); // Elimina la clase para mostrar un ojo
            icono.classList.add('fi-rr-eye-crossed'); // Añade la clase para mostrar una X
        }
    }
}