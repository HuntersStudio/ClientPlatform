let sliderImages = document.querySelectorAll('.slider-img');

sliderImages.forEach(function(sliderImage) {

    // Añade un manejador de eventos de clic a cada imagen
    sliderImage.addEventListener('click', function() {
        
        // Quita la clase 'active' de todas las imágenes del slider excepto la imagen clicada
        sliderImages.forEach(function(img) {
            if (img !== sliderImage) {
                img.classList.remove('active');
            }
        });

        // Alterna la clase 'active' en la imagen clicada
        sliderImage.classList.toggle('active');
    });
});