const mainnav = document.querySelector('.navigation');
const hambutton = document.querySelector('#menu');

hambutton.addEventListener('click', () => {
    mainnav.classList.toggle('show');
    hambutton.classList.toggle('active'); 
});


/*CARDS*/

fetch('data/wellness.json')
    .then(response => response.json())
    .then(products => {
        createProductCards(products);
    })
    .catch(error => console.error('Error loading JSON:', error));

function createProductCards(products) {
    const cardsContainer = document.querySelector('.cards');
    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img data-src="${product.icon}" alt="${product.product}" class="card-img" />
            <h3>${product.product}</h3>
            <p>${product.description.replace(/\n/g, '<br>')}</p>
            <a href="${product['more-info']}" target="_blank">More Info</a>
        `;
        cardsContainer.appendChild(card);
    });

    const images = document.querySelectorAll('.card img');

    const lazyLoad = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.onload = () => img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    };

    const observer = new IntersectionObserver(lazyLoad, {
        rootMargin: '0px 0px 200px 0px'
    });

    images.forEach(image => {
        observer.observe(image);
        image.src = '';
    });
}


/*Benefits*/

fetch('data/key-benefits.json')
    .then(response => response.json())
    .then(products => {
        createBenefitCards(products);
    })
    .catch(error => console.error('Error loading JSON:', error));

function createBenefitCards(products) {
    const cardsContainer = document.querySelector('.health');
    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('card2');
        card.innerHTML = `
            <div class="card2-icon">
                <img src="${product.icon}" alt="${product.product}" />
            </div>
            <h3 class="card2-product">${product.product.replace(/\n/g, '<br>')}</h3>
            <p class="card2-description">${product.description}</p>
        `;
        cardsContainer.appendChild(card);
    });
}


fetch('data/income.json')
    .then(response => response.json())
    .then(incomes => {
        createIncomeCards(incomes);
    })
    .catch(error => console.error('Error loading JSON:', error));

function createIncomeCards(incomes) {
    const cardsContainer = document.querySelector('.income');
    if (!cardsContainer) {
        console.error("Container with class 'income' not found.");
        return;
    }
    incomes.forEach(income => {
        const card = document.createElement('div');
        card.classList.add('card3');
        card.innerHTML = `
            <div class="card3-icon">
                <img src="${income.icon}" alt="${income.title}" />
            </div>
            <h3 class="card3-title">${income.title}</h3>
            <p class="card3-description">${income.description}</p>
        `;
        cardsContainer.appendChild(card);
    });
}

function saveName() {
    const nameInput = document.getElementById('yourname').value;
    if (nameInput) {
        localStorage.setItem('userName', nameInput);

        console.log('Nombre guardado:', nameInput);
    } else {
        console.log('No se ingresó ningún nombre');
    }
}


function displayName() {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
        document.getElementById('name-display').textContent = storedName;
        console.log('Nombre desplegado:', storedName);
    } else {
        console.log('No se encontró ningún nombre guardado');
    }
}

document.addEventListener('DOMContentLoaded', displayName);


/*MODAL*/

function getDaysDifference(lastVisit) {
    const today = new Date();
    const lastVisitDate = new Date(lastVisit);
    const timeDiff = today - lastVisitDate;
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
}

function showModal(message) {
    const messageElement = document.getElementById('message-text');
    const modal = document.getElementById('visit-modal');

    messageElement.textContent = message;
    modal.style.display = "block"; // Mostrar el modal
}

function handleVisit() {
    const lastVisit = localStorage.getItem('lastVisit');

    if (!lastVisit) {
        showModal('Welcome! Let us know if you have any questions. 🤗');
    } else {
        const daysDifference = getDaysDifference(lastVisit);

        if (daysDifference < 1) {
            showModal('Back so soon! Awesome! 🤩');
        } else {
            const dayText = daysDifference === 1 ? 'day' : 'days';
            showModal(`You last visited ${daysDifference} ${dayText} ago. Welcomr back! 👌🏽`);
        }
    }

    localStorage.setItem('lastVisit', new Date().toISOString());
}

document.getElementById('close-btn').addEventListener('click', function () {
    const modal = document.getElementById('visit-modal');
    modal.style.display = 'none'; // Cerrar el modal
});

window.onload = function () {
    handleVisit();
};
