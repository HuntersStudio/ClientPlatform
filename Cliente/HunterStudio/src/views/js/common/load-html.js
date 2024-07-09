document.addEventListener('DOMContentLoaded', function () {
    loadContent('../primary/news.html', 'container');
});

function loadContent(url, clasecontainer) {
    fetch(url)
        .then(response => response.text())
        .then(htmlText => {
            var container = document.getElementsByClassName(clasecontainer)[0];
            if (container) {
                container.innerHTML = htmlText;

                const contentReady = new CustomEvent('contentReady', {
                    detail: { container: container }
                });

                const scripts = container.querySelectorAll('script');
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
                console.error('No se encontró ningún elemento con la clase:', clasecontainer);
            }
        })
}

function loadList(enlaceClicado){

    var asideElement = enlaceClicado.closest(".sub-menu");
    var listItems = asideElement.querySelectorAll('ul li');

    if (!asideElement) {
        console.error("No se encontró ningún elemento con la clase 'sub-menu'");
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