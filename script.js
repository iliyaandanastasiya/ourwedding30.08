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
            // Часть звёзд делаем крупными и золотыми
            if (Math.random() < 0.08) {
                star.classList.add('large');
                star.style.width = `${1.5 + Math.random() * 1.5}px`;
                star.style.height = star.style.width;
            } else {
                star.style.width = `${0.8 + Math.random() * 0.6}px`;
                star.style.height = star.style.width;
            }
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            star.style.left = `${x}%`;
            star.style.top = `${y}%`;
            skyLayer.appendChild(star);
            stars.push({ el: star, x, y });
        }

        // Добавляем один общий SVG-слой для линий созвездий
        const svgNS = 'http://www.w3.org/2000/svg';
        const svgLines = document.createElementNS(svgNS, 'svg');
        svgLines.style.position = 'absolute';
        svgLines.style.top = '0';
        svgLines.style.left = '0';
        svgLines.style.width = '100%';
        svgLines.style.height = '100%';
        svgLines.style.pointerEvents = 'none';
        svgLines.style.zIndex = '2';
        skyLayer.appendChild(svgLines);

        // Рисуем линии между случайными звёздами
        const lineCount = 18;
        for (let i = 0; i < lineCount; i++) {
            const s1 = stars[Math.floor(Math.random() * stars.length)];
            const s2 = stars[Math.floor(Math.random() * stars.length)];

            const line = document.createElementNS(svgNS, 'line');
            line.setAttribute('x1', s1.x);
            line.setAttribute('y1', s1.y);
            line.setAttribute('x2', s2.x);
            line.setAttribute('y2', s2.y);
            line.classList.add('constellation-line');
            svgLines.appendChild(line);
        }
    }

    createStarsAndConstellations();


    // --- Таймер обратного отсчёта ---
    const weddingDate = new Date('2026-08-30T00:00:00'); // Дата свадьбы

    function updateTimer() {
        const now = new Date();
        const diff = weddingDate - now;

        if (diff <= 0) {
            timerContainer.innerHTML = '<p style="color:#c5a133; font-family:Cinzel;">Свадьба уже сегодня!</p>';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        timerContainer.innerHTML = `
            <div class="timer-item">
                <span class="timer-value">${days}</span>
                <span class="timer-label">дней</span>
            </div>
            <div class="timer-item">
                <span class="timer-value">${hours}</span>
                <span class="timer-label">часов</span>
            </div>
            <div class="timer-item">
                <span class="timer-value">${minutes}</span>
                <span class="timer-label">минут</span>
            </div>
            <div class="timer-item">
                <span class="timer-value">${seconds}</span>
                <span class="timer-label">секунд</span>
            </div>
        `;
    }

    updateTimer();
    setInterval(updateTimer, 1000);


    // --- Плавное появление секций при скролле ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease-out';
        observer.observe(section);
    });
});
