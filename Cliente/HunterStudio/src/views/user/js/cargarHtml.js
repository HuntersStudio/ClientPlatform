document.addEventListener('DOMContentLoaded', function () {
    // Llama a cargarContenido al cargar la página
    cargarContenido('./html/inicio.html', 'contenedor');
});

function cargarContenido(url, claseContenedor) {
    // Utiliza fetch para obtener el contenido del archivo HTML
    fetch(url)
        .then(response => response.text())
        .then(htmlText => {
            // Selecciona el primer elemento que tenga la clase especificada
            var contenedor = document.getElementsByClassName(claseContenedor)[0];
            if (contenedor) {
                // Inserta el contenido en el contenedor
                contenedor.innerHTML = htmlText;

                // Crear y despachar un evento personalizado
                const contentReady = new CustomEvent('contentReady', {
                    detail: { contenedor: contenedor }
                });

                // Buscar y ejecutar los scripts en el contenido insertado
                const scripts = contenedor.querySelectorAll('script');
                scripts.forEach(script => {
                    if (script.src) {
                        // Si es un script externo, crear un nuevo elemento <script> y agregarlo al documento
                        const newScript = document.createElement('script');
                        newScript.src = script.src;
                        newScript.onload = () => document.dispatchEvent(contentReady); // Despachar el evento cuando el script se cargue
                        document.body.appendChild(newScript);
                    } else {
                        // Si es un script interno, ejecutarlo con eval()
                        eval(script.textContent);
                        document.dispatchEvent(contentReady); // Despachar el evento después de ejecutar el script interno
                    }
                });
            } else {
                console.error('No se encontró ningún elemento con la clase:', claseContenedor);
            }
        })
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
    });

    // Resaltamos el elemento clicado
    enlaceClicado.setAttribute('id', 'nav_bar_clicked');
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
    liPadre.setAttribute('id','menu_clicked');
}