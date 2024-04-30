function expand_card() {
    const expandButtons = document.querySelectorAll('.expand-button');

    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.card');
            card.classList.toggle('expanded');
        });
    });
}