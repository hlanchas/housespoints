// Definimos las nuevas casas con los nombres de tus archivos
const houses = {
    dragon:   { name: "Dragón",   points: 14, logo: "images/Dragon.png" },
    kraken:   { name: "Kraken",   points: 32, logo: "images/Kraken.png" },
    pegasus:  { name: "Pegaso",   points: 30, logo: "images/Pegasus.png" },
    centauro: { name: "Centauro", points: 30, logo: "images/Centauro.png" }
};

// Cargar puntos guardados en el navegador (si existen)
const storedPoints = JSON.parse(localStorage.getItem('housePoints'));
if (storedPoints) {
    for (let house in houses) {
        houses[house].points = storedPoints[house] !== undefined ? storedPoints[house] : houses[house].points;
    }
}

const container = document.getElementById('houses-container');

// Función para dibujar las tarjetas en pantalla
function renderHouses() {
    container.innerHTML = ''; // Limpiamos el contenedor
    
    // Calculamos el total de puntos para la barra de progreso
    let totalPoints = 0;
    for (let key in houses) {
        totalPoints += houses[key].points;
    }
    
    // Si el total es 0, evitamos división por cero
    if (totalPoints === 0) totalPoints = 1;

    for (let key in houses) {
        const house = houses[key];
        const percentage = (house.points / totalPoints) * 100;
        
        const houseEl = document.createElement('div');
        houseEl.className = `house-card ${key}`;
        houseEl.innerHTML = `
            <img src="${house.logo}" alt="Logo de ${house.name}" class="house-logo">
            <h2>${house.name}</h2>
            <p class="points">${house.points} <span class="pts-label">pts</span></p>
            <div class="progress-bar">
                <div class="progress" style="width: ${percentage}%"></div>
            </div>
        `;
        container.appendChild(houseEl);
    }
}

// Dibujar al cargar la página
renderHouses();

// Función para actualizar puntos manualmente desde la consola (opcional)
// Uso: updatePoints('dragon', 500);
function updatePoints(houseKey, newPoints) {
    if (houses[houseKey]) {
        houses[houseKey].points = newPoints;
        localStorage.setItem('housePoints', JSON.stringify({
            dragon: houses.dragon.points,
            kraken: houses.kraken.points,
            pegasus: houses.pegasus.points,
            centauro: houses.centauro.points
        }));
        renderHouses(); // Vuelve a dibujar sin recargar la página
    }
}
