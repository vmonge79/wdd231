const mainnav = document.querySelector('.navigation');
const hambutton = document.querySelector('#menu');

hambutton.addEventListener('click', () => {
    mainnav.classList.toggle('show');
    hambutton.classList.toggle('show');
});



const cardsSection = document.querySelector('.cards');


async function fetchAndDisplayMembers() {
    try {

        const response = await fetch('data/members.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const members = await response.json();

        members.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
        <img src="${member.icon}" alt="${member.name} Logo">
        <h2>${member.name}</h2>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Membership Level:</strong> ${getMembershipLevel(member.membershipLevel)}</p>
        <p><strong>Industry:</strong> ${member.industry}</p>
        <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
      `;
            cardsSection.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching the members data:', error);
    }
}

function getMembershipLevel(level) {
    switch (level) {
        case 1:
            return 'Member';
        case 2:
            return 'Silver';
        case 3:
            return 'Gold';
        default:
            return 'Unknown';
    }
}

fetchAndDisplayMembers();

/*RANDOM FOR INDEX*/

document.addEventListener("DOMContentLoaded", async () => {
    try {

        const response = await fetch('data/members.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }


        const members = await response.json();


        const randomMembers = getRandomMembers(members, 3);


        displayRandomMembers(randomMembers);
    } catch (error) {
        console.error('Error fetching or displaying the members data:', error);
    }
});

 
function getRandomMembers(members, count) {
    const shuffled = [...members].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

 
function displayRandomMembers(members) {
    const cardsContainer = document.querySelector('#cards2');
    if (!cardsContainer) throw new Error('No se encontró el contenedor con ID "cards2".');

    cardsContainer.innerHTML = '';  

    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${member.icon}" alt="${member.name} Logo">
            <h2>${member.name}</h2>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Membership Level:</strong> ${getMembershipLevel(member.membershipLevel)}</p>
            <p><strong>Industry:</strong> ${member.industry}</p>
            <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
        `;
        cardsContainer.appendChild(card);
    });
}

 
function getMembershipLevel(level) {
    switch (level) {
        case 1:
            return 'Member';
        case 2:
            return 'Silver';
        case 3:
            return 'Gold';
        default:
            return 'Unknown';
    }
}


/* VISTAS LIST O GRID */

document.addEventListener('DOMContentLoaded', () => {
    const cardsSection = document.querySelector('.cards');
    const gridButton = document.getElementById('grid');
    const listButton = document.getElementById('list');

    gridButton.addEventListener('click', () => {
        cardsSection.classList.remove('list-view');
        cardsSection.classList.add('grid-view');
    });

    listButton.addEventListener('click', () => {
        cardsSection.classList.remove('grid-view');
        cardsSection.classList.add('list-view');
    });
});


/*WEATHER*/

const apiKey = '1f9d79c19d9a69c120dee7b36a764e0f';
const city = 'San Jose';
const units = 'metric';
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;

async function fetchWeather() {
    try {
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        let weatherIcon = '';


        if (weatherData.weather[0].description.includes("clear")) {
            weatherIcon = "☀️";
        } else if (weatherData.weather[0].description.includes("cloud")) {
            weatherIcon = "☁️";
        } else if (weatherData.weather[0].description.includes("rain")) {
            weatherIcon = "🌧️";

        } else {
            weatherIcon = "🌈";
        }

        document.getElementById('weather').innerHTML = `
      <p>${weatherIcon}</p>
      <p><strong>Weather:</strong> ${weatherData.weather[0].description}</p>
      <p>Temperature: ${weatherData.main.temp}°C</p>
      <p>Feels Like: ${weatherData.main.feels_like}°C</p>
      <p>Humidity: ${weatherData.main.humidity}%</p>
      <p>Wind Speed: ${weatherData.wind.speed} m/s</p>
    `;

        const forecastDiv = document.getElementById('forecast');
        forecastDiv.innerHTML = '';

        for (let i = 1; i <= 3; i++) {
            const forecast = forecastData.list[i * 8 - 1];
            const day = new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
            forecastDiv.innerHTML += `
        <div>
          <h4>${day}</h4>
          <p>${forecast.main.temp}°C</p>
        </div>
      `;
        }
    } catch (error) {
        document.getElementById('weather').textContent = 'Error loading weather data.';
        document.getElementById('forecast').textContent = 'Error loading forecast data.';
    }
}

fetchWeather();

/*MODAL*/

function openModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "block";
}

function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "none";
}

window.onclick = function (event) {
    var modals = document.getElementsByClassName("modal");
    for (var i = 0; i < modals.length; i++) {
        if (event.target == modals[i]) {
            modals[i].style.display = "none";
        }
    }
}
