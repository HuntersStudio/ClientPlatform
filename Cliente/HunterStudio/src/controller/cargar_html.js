var enlaces = document.querySelectorAll('#menu a');

// Asigna el evento clic a cada enlace

enlaces.forEach(function(enlace) {
    enlace.addEventListener('click', function(event) {
        // Evita que el enlace siga el enlace predeterminado
        event.preventDefault();

        // Carga el contenido dinámico
        cargarContenido(this.getAttribute('href'));
    });
});

function cargarContenido(url) {
    // Utiliza fetch para obtener el contenido del archivo HTML
    fetch(url)
        .then(response => response.text())
        .then(data => {
            // Inserta el contenido en el contenedor
            document.getElementById('contenedor').innerHTML = data;
        })
        
        .catch(error => console.error('Error al cargar el contenido:', error));
}

function configurarBorde(enlaceClicado){

    var navElement = enlaceClicado.closest('.menu');
    var listItems = navElement.querySelectorAll('ul li');

    listItems.forEach(function(li) {
        // Operaciones en cada elemento li
        li.style.setProperty("border-bottom-color", "black");
    });

    var liPadre = enlaceClicado.parentNode;

    // Ponemos el borde del fondo en transparente
    liPadre.style.setProperty("border-bottom-color", "gray");
}