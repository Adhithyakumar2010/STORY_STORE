/* STORY STORE ADMIN ANALYTICS JAVASCRIPT */
document.addEventListener('DOMContentLoaded', () => {
    // Animated Counters for Stat Cards
    const counterElements = document.querySelectorAll('.stat-val-anim');
    counterElements.forEach(el => {
        const target = parseFloat(el.getAttribute('data-target') || '0');
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        let count = 0;
        const speed = target / 25;

        const updateCounter = () => {
            count += speed;
            if (count < target) {
                el.innerText = prefix + Math.ceil(count).toLocaleString() + suffix;
                setTimeout(updateCounter, 20);
            } else {
                el.innerText = prefix + Math.round(target).toLocaleString() + suffix;
            }
        };
        updateCounter();
    });
});
