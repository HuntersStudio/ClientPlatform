(function() {
    // Variable que almacena las imágenes del slider
    let sliderImages;

    // Función para inicializar el slider
    function initializeSlider() {
        // Verifica si sliderImages aún no ha sido inicializada
        if (!sliderImages) {
            // Obtiene las imágenes del slider
            sliderImages = document.querySelectorAll('.slider-img');

            // Asigna el manejador de eventos de clic a cada imagen
            sliderImages.forEach(function(sliderImage) {
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
        }
    }

    // Llama a la función para inicializar el slider
    initializeSlider();
})();