let refreshInterval = setInterval(() => {
    next.click();
}, 5000);

function nextSlider() {
    let items = document.querySelectorAll('.slider .list .item');
    let thumbnails = document.querySelectorAll('.thumbnail .item');
    let contItem = items.length;
    let itemActive = 0;
    
    // Encuentra el ítem activo
    for (let i = 0; i < contItem; i++) {
        if (items[i].classList.contains('active')) {
            itemActive = i;
            break;
        }
    }
    
    // Incrementa el índice del ítem activo y muestra el slider
    itemActive++;
    if (itemActive >= contItem) {
        itemActive = 0;
    }
    showSlider(itemActive, items, thumbnails);
}

function prevSlider() {
    let items = document.querySelectorAll('.slider .list .item');
    let thumbnails = document.querySelectorAll('.thumbnail .item');
    let contItem = items.length;
    let itemActive = 0;
    
    // Encuentra el ítem activo
    for (let i = 0; i < contItem; i++) {
        if (items[i].classList.contains('active')) {
            itemActive = i;
            break;
        }
    }
    
    // Decrementa el índice del ítem activo y muestra el slider
    itemActive--;
    if (itemActive < 0) {
        itemActive = contItem - 1;
    }
    showSlider(itemActive, items, thumbnails);
}

function showSlider(itemActive, items, thumbnails) {
    // Quita la clase 'active' de todos los ítems
    items.forEach(item => item.classList.remove('active'));
    thumbnails.forEach(thumbnail => thumbnail.classList.remove('active'));
    
    // Añade la clase 'active' al ítem y miniatura activos
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 8000);
}

function thumbnail(){
    
    // Tu código aquí se ejecutará después de que la página haya cargado

    let thumbnails = document.querySelectorAll('.thumbnail .item');

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            itemActive = index;
            showSlider();
        });
    });

    console.log("ha");

}
