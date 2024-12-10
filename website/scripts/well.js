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
