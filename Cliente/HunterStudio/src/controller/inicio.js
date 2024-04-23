let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');
let contItem = items.length;
let itemActive = 0;
   
next.onclick = function(){
    itemActive++;
    if(itemActive >= contItem){
        itemActive = 0;
    }
    showSlider();
}

prev.onclick = function(){
    itemActive--;
    if(itemActive < 0){
        itemActive = contItem -1;
    }
    showSlider();
}

let refreshInterval = setInterval(() => {
    next.click();
}, 5000);

function showSlider() {

    var elemento = document.querySelector(".active");

    if(elemento != null){
        let itemActiveOld = document.querySelector('.slider .list .item.active');
        let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
        itemActiveOld.classList.remove('active');
        thumbnailActiveOld.classList.remove('active');
        
        // Añade la clase 'active' al ítem y miniatura activos
        items[itemActive].classList.add('active');
        thumbnails[itemActive].classList.add('active');
    }
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 8000);
}

thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    });
});
