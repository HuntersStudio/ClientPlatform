const generate_space_layer = () => {
    const layer = [];
    const total_starts = 200;

    for (let i = 0; i < total_starts; i++){
        const x = Math.floor(Math.random() *100);
        const y = Math.floor(Math.random() *100);
        layer.push('${x} ${y} 0 white');
    }

    const container = document.
}