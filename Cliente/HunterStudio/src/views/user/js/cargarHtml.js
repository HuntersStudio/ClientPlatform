document.addEventListener('DOMContentLoaded', function () {
    cargarContenido('./html/inicio.html', 'contenedor');
});

function cargarContenido(url, claseContenedor) {
    fetch(url)
        .then(response => response.text())
        .then(htmlText => {
            var contenedor = document.getElementsByClassName(claseContenedor)[0];
            if (contenedor) {
                contenedor.innerHTML = htmlText;

                const contentReady = new CustomEvent('contentReady', {
                    detail: { contenedor: contenedor }
                });

                const scripts = contenedor.querySelectorAll('script');
                scripts.forEach(script => {
                    if (script.src) {
                        const newScript = document.createElement('script');
                        newScript.src = script.src;
                        newScript.onload = () => document.dispatchEvent(contentReady);
                        document.body.appendChild(newScript);

                    } else {
                        eval(script.textContent);
                        document.dispatchEvent(contentReady);
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

    if (!asideElement) {
        console.error("No se encontró ningún elemento con la clase 'menu-leteral'");
        return;
    }

    listItems.forEach(function(li) {
        var enlace = li.querySelector('a');
        enlace.removeAttribute('id');
    });

    enlaceClicado.setAttribute('id', 'nav_bar_clicked');
}

function configurarBorde(enlaceClicado){

    var navElement = enlaceClicado.closest('.menu');
    var listItems = navElement.querySelectorAll('ul li');

    listItems.forEach(function(li) {
        li.removeAttribute('id');
    });

    var liPadre = enlaceClicado.parentNode;

    liPadre.setAttribute('id','menu_clicked');
}