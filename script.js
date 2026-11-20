/* =========================================================
   1. DATOS DE LAS CASAS Y PUNTOS
   ========================================================= */
// Aquí defines la capacidad máxima visual que tendrán los tubos
const MAX_CAPACITY = 500; 

const houses = {
    dragon:   { name: "Dragon",   nameEs: "Dragón",   points: 14, color: "var(--dragon)",   glow: "var(--dragon-glow)",   logo: "images/Dragon.png" },
    kraken:   { name: "Kraken",   nameEs: "Kraken",   points: 32, color: "var(--kraken)",   glow: "var(--kraken-glow)",   logo: "images/Kraken.png" },
    pegasus:  { name: "Pegasus",  nameEs: "Pegaso",   points: 30, color: "var(--pegasus)",  glow: "var(--pegasus-glow)",  logo: "images/Pegasus.png" },
    centauro: { name: "Centaur",  nameEs: "Centauro", points: 30, color: "var(--centauro)", glow: "var(--centauro-glow)", logo: "images/Centauro.png" }
};

// Cargar puntos guardados en el navegador (localStorage)
const storedPoints = JSON.parse(localStorage.getItem('housePoints'));
if (storedPoints) {
    for (let house in houses) {
        if (storedPoints[house] !== undefined) {
            houses[house].points = storedPoints[house];
        }
    }
}

/* =========================================================
   2. REFERENCIAS DEL DOM
   ========================================================= */
const container = document.getElementById('houses-container');
const candlesLayer = document.getElementById('candlesLayer');
const bgMusic = document.getElementById('bgMusic');
const muteBtn = document.getElementById('muteBtn');
const volumeSlider = document.getElementById('volumeSlider');

/* =========================================================
   3. FONDO: VELAS FLOTANTES
   ========================================================= */
(function createCandles(){
    const numCandles = 25;
    for (let i = 0; i < numCandles; i++){
        const candle = document.createElement('div');
        candle.className = 'candle';
        candle.style.left = Math.random() * 100 + 'vw';
        candle.style.top = (10 + Math.random() * 80) + 'vh';
        candle.style.animationDuration = (4 + Math.random() * 4) + 's';
        candle.style.animationDelay = (Math.random() * -6) + 's';
        candle.style.transform = `scale(${0.6 + Math.random() * 0.8})`;
        candlesLayer.appendChild(candle);
    }
})();

/* =========================================================
   4. AUDIO
   ========================================================= */
bgMusic.volume = 0.5;

window.addEventListener('DOMContentLoaded', () => {
    bgMusic.play().catch(e => {
        const startMusicOnInteract = () => {
            bgMusic.play().catch(err => console.log(err));
            document.body.removeEventListener('click', startMusicOnInteract);
        };
        document.body.addEventListener('click', startMusicOnInteract);
    });
});

volumeSlider.addEventListener('input', (e) => {
    const vol = parseFloat(e.target.value);
    bgMusic.volume = vol;
    if (vol > 0 && muteBtn.textContent === '🔇') {
        muteBtn.textContent = '🔊';
        bgMusic.play().catch(() => {});
    } else if (vol === 0) {
        muteBtn.textContent = '🔇';
    }
});

muteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (muteBtn.textContent === '🔊') {
        bgMusic.pause();
        muteBtn.textContent = '🔇';
    } else {
        muteBtn.textContent = '🔊';
        bgMusic.play().catch(e => console.log(e));
    }
});

/* =========================================================
   5. RENDERIZADO DE LOS TUBOS
   ========================================================= */
function renderHouses() {
    container.innerHTML = ''; 

    for (let key in houses) {
        const house = houses[key];
        
        // El porcentaje se calcula sobre la capacidad máxima (500)
        let percentage = (house.points / MAX_CAPACITY) * 100;
        
        // Evitar que pase del 100% si superan los 500 puntos
        if (percentage > 100) percentage = 100; 
        
        // Si tiene puntos pero es muy poquito (ej. 2 puntos), le damos un mínimo del 3% para que se vea el color
        if (house.points > 0 && percentage < 3) percentage = 3;

        const houseEl = document.createElement('div');
        houseEl.className = `house-card`;
        houseEl.style.setProperty('--color', house.color);
        houseEl.style.setProperty('--glow', house.glow);
        
        houseEl.innerHTML = `
            <img src="${house.logo}" alt="Logo de ${house.name}" class="house-logo">
            <div class="house-name">
                ${house.name}
                <span class="lang-es">${house.nameEs}</span>
            </div>
            
            <div class="tube-wrapper">
                <div class="points-display">${house.points}</div>
                <div class="tube">
                    <div class="tube-fill" style="height: ${percentage}%"></div>
                </div>
                <div class="max-capacity-label">/ ${MAX_CAPACITY} pts</div>
            </div>
        `;
        container.appendChild(houseEl);
    }
}

// Dibujar al cargar la página
renderHouses();

/* =========================================================
   6. FUNCIÓN PARA ACTUALIZAR PUNTOS POR CONSOLA (Opcional)
   Uso: updatePoints('dragon', 50);
   ========================================================= */
function updatePoints(houseKey, newPoints) {
    if (houses[houseKey]) {
        houses[houseKey].points = newPoints;
        localStorage.setItem('housePoints', JSON.stringify({
            dragon: houses.dragon.points,
            kraken: houses.kraken.points,
            pegasus: houses.pegasus.points,
            centauro: houses.centauro.points
        }));
        renderHouses(); // Vuelve a dibujar los tubos
    }
}
