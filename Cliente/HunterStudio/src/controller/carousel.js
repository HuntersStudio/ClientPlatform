let carousel_controller = document.querySelectorAll('.carousel');
let carousel_controls_controller = document.querySelectorAll('.carousel-controls');
let carousel_items = document.querySelectorAll('.item-carousel');
let contItem = items.length;
let itemActive = 0;


function showCarousel() {

    // Añade la clase 'active' al ítem y miniatura activos
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 8000);
}

carousel_items.forEach((carousel_items, index) => {
    carousel_items.addEventListener('click', () => {
        itemActive = index;
        showCarousel();
    });
});


class Carousel {

    constructor(container, items, controls) {
        this.carouselContainer = container;
        this.carouselControls = controls;       
        this.carouselArray = [...items];
    }

    updateCarousel() {
        this.carouselArray.forEach(el => {
            el.classList.remove('.item-carousel-1');
            el.classList.remove('.item-carousel-2');
            el.classList.remove('.item-carousel-3');
            el.classList.remove('.item-carousel-4');
            el.classList.remove('.item-carousel-5');            
        });

        this.carouselArray.slice(0, 5).forEach((el, i) => {
            el.classList.add('.item-carousel-${i+1}');
        });
    }

    setCurrentState(direction) {
        if(direction.className == 'carousel-controls-prev') {
            this.carouselArray.unshift(this.carouselArray.pop());
        } else {
            this.carouselArray.push(this.carouselArray.shift());
        }
        this.updateCarousel();
    }

    setControlls() {
        this.carouselControls.forEach(control => {
            carousel_controls_controller.appendChild(document.createElement('button')).className = 'carousel-controls-${control}';
            document.querySelector('carousel-controls-${control}').innerText = control;
        });
    }

    useControls() {
        const triggers = [...carousel_controls_controller.childNodes];
        triggers.forEach(control => {
            control.addEventListener('click', e => {
                e.preventDefault();
                this.setCurrentState(control);
            });
        });
    }
}

const carousel_main = new Carousel(carousel_controller, carousel_items, carousel_controls);

carousel_main.setControlls();
carousel_main.useControls();