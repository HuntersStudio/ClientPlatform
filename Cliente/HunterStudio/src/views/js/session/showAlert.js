function showAlert(message, isSuccess) {
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
    
    if (isSuccess) {
        alertContainer.style.backgroundColor = 'green';
    } else {
        alertContainer.style.backgroundColor = '#cc372d';
    }
    
    setTimeout(() => {
        if (alertContainer.parentNode) {
            document.body.removeChild(alertContainer);
        }
    }, 5000);
}

export { showAlert };
