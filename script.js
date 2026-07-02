document.addEventListener('DOMContentLoaded', () => {
    const skyLayer = document.getElementById('skyLayer');
    const timerContainer = document.getElementById('timerContainer');

    // --- Генерация звёзд и созвездий ---
    function createStarsAndConstellations() {
        const starCount = 250;
        const stars = [];

        // Создаём звёзды
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            if (Math.random()
