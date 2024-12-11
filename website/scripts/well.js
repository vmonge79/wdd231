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
            <img src="${product.icon}" alt="${product.product}" />
            <h3>${product.product}</h3>
            <p>${product.description.replace(/\n/g, '<br>')}</p>
            <a href="${product['more-info']}" target="_blank">More Info</a>
        `;
        cardsContainer.appendChild(card);
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
    incomes.forEach(income => {
        const card = document.createElement('div');
        card.classList.add('card2');
        card.innerHTML = `
            <div class="card2-icon">
                <img src="${income.icon}" alt="${income.title}" />
            </div>
            <h3 class="card2-product">${income.title.replace(/\n/g, '<br>')}</h3>
            <p class="card2-description">${income.description}</p>
        `;
        cardsContainer.appendChild(card);
    });
}
