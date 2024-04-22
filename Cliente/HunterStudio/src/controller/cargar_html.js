document.addEventListener('DOMContentLoaded', function() {
    // Llama a cargarContenido al cargar la página
    cargarContenido('./html/inicio.html', 'contenedor');
});

function cargarContenido(url, claseContenedor) {
    // Utiliza fetch para obtener el contenido del archivo HTML
    fetch(url)
        .then(response => response.text())
        .then(data => {
            // Selecciona el primer elemento que tenga la clase especificada
            var contenedor = document.getElementsByClassName(claseContenedor)[0];
            if (contenedor) {
                // Inserta el contenido en el contenedor
                contenedor.innerHTML = data;
            } else {
                console.error('No se encontró ningún elemento con la clase:', claseContenedor);
            }
        })
        .catch(error => console.error('Error al cargar el contenido:', error));
}

function configurarLista(enlaceClicado){

    var asideElement = enlaceClicado.closest(".menu-leteral");
    var listItems = asideElement.querySelectorAll('ul li');

    // Si no se encuentra ningún elemento <aside> con la clase especificada, la función termina
    if (!asideElement) {
        console.error("No se encontró ningún elemento con la clase 'menu-leteral'");
        return;
    }

    listItems.forEach(function(li) {
        var enlace = li.querySelector('a');
        // Operaciones en cada elemento li
        enlace.removeAttribute('id');
        console.log(li);
    });

    // Resaltamos el elemento clicado
    enlaceClicado.setAttribute('id', 'element-clicked');
}

function configurarBorde(enlaceClicado){

    var navElement = enlaceClicado.closest('.menu');
    var listItems = navElement.querySelectorAll('ul li');

    listItems.forEach(function(li) {
        // Operaciones en cada elemento li
        li.removeAttribute('id');
    });

    var liPadre = enlaceClicado.parentNode;

    // Ponemos el borde del fondo en transparente
    liPadre.setAttribute('id','element-clicked');
}