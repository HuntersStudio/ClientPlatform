document.addEventListener("DOMContentLoaded", function() {
    const COLORS = ["#fff2", "#fff4", "#fff7", "#fffc"];

    const generate_space_layer = (size, selector, total_starts, duration) => {
        const layer = [];

        for (let i = 0; i < total_starts; i++){
            const color = COLORS[Math.floor(Math.random() * COLORS.length)];
            const x = Math.floor(Math.random() * 100);
            const y = Math.floor(Math.random() * 100);
            layer.push(`${x}vw ${y}vh 0 ${color}, ${x}vw ${y + 100}vh 0 ${color}`);
        }

        const container = document.querySelector(selector);
        container.style.setProperty("--space-layer", layer.join(","));
        container.style.setProperty("--size", size);
        container.style.setProperty("--duration", duration);
    };

    generate_space_layer("1px", ".space-1", 200, "25s");
    generate_space_layer("2px", ".space-2", 100, "20s");
    generate_space_layer("4px", ".space-3", 25, "15s");
});