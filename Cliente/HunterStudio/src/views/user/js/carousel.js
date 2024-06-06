function expand_card() {
    const expandButtons = document.querySelectorAll('.expand-button');

    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.card_destacadas'); // Corregir la clase aquí
            card.classList.toggle('expanded');
        });
    });
}