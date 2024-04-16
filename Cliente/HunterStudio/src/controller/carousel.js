document.addEventListener('DOMContentLoaded', () => {
    const elementosCarousel = document.querySelectorAll('.carousel'); // Sacamos los elementos del div 'carousel'
    M.Carousel.init(elementosCarousel, { // Aqui se llama al script de internet para llamar al metodo M.Carousel
        duration: 150 // 
    });
});