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
