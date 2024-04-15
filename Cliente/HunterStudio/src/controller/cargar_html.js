function cargarContenido(url, contenedor) {
    // Utiliza fetch para obtener el contenido del archivo HTML
    fetch(url)
        .then(response => response.text())
        .then(data => {
            // Inserta el contenido en el contenedor
            document.getElementById(contenedor).innerHTML = data;
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
        li.style.setProperty("border-bottom-color", "black");
        li.style.setProperty("background-color", "gray");
    });

    var liPadre = enlaceClicado.parentNode;

    // Ponemos el borde del fondo en transparente
    liPadre.style.setProperty("border-bottom-color", "gray");
    liPadre.style.setProperty("background-color", "lightgreen");
}