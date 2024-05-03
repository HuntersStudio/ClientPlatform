function mostrar(icono, passwordClass) {
    const campoContraseñaClass = passwordClass;
    const campoContraseña = icono.parentElement.querySelector('.' + campoContraseñaClass);

    if (campoContraseña) {
        if (campoContraseña.type === 'password') {
            campoContraseña.type = 'text';
            icono.classList.remove('fi-rr-eye-crossed');
            icono.classList.add('fi-rr-eye');
        } else {
            campoContraseña.type = 'password';
            icono.classList.remove('fi-rr-eye');
            icono.classList.add('fi-rr-eye-crossed');
        }
    }
}