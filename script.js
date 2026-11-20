const houses = {
    gryffindor: { name: "Gryffindor", points: 450, logo: "images/gryffindor.svg" },
    slytherin:  { name: "Slytherin",  points: 420, logo: "images/slytherin.svg" },
    ravenclaw:  { name: "Ravenclaw",  points: 480, logo: "images/ravenclaw.svg" },
    hufflepuff: { name: "Hufflepuff", points: 390, logo: "images/hufflepuff.svg" }
};

// Cargar puntos guardados (si existen)
const storedPoints = JSON.parse(localStorage.getItem('housePoints'));
if (storedPoints) {
    for (let house in houses) {
        houses[house].points = storedPoints[house] || houses[house].points;
    }
}

const container = document.getElementById('houses-container');
for (let key in houses) {
    const house = houses[key];
    const houseEl = document.createElement('div');
    houseEl.className = `house-card ${key}`;
    houseEl.innerHTML = `
        <img src="${house.logo}" alt="Logo de ${house.name}" class="house-logo">
        <h2>${house.name}</h2>
        <p class="points">${house.points}</p>
        <div class="progress-bar">
            <div class="progress" style="width: ${(house.points / 1000) * 100}%"></div>
        </div>
    `;
    container.appendChild(houseEl);
}

// Función para actualizar puntos (ejemplo)
function updatePoints(houseKey, newPoints) {
    houses[houseKey].points = newPoints;
    localStorage.setItem('housePoints', JSON.stringify({
        gryffindor: houses.gryffindor.points,
        slytherin: houses.slytherin.points,
        ravenclaw: houses.ravenclaw.points,
        hufflepuff: houses.hufflepuff.points
    }));
    // Recargar la página para reflejar los cambios (o actualizar el DOM)
    location.reload();
}
