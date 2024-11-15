const year = document.querySelector("#year");
const today = new Date();

year.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;


const lastModifiedElement = document.querySelector("#lastModified");
const lastModified = new Date(document.lastModified);
const formattedDate = `${lastModified.getDate()}/${lastModified.getMonth() + 1}/${lastModified.getFullYear()} ${lastModified.getHours()}:${lastModified.getMinutes()}`;
lastModifiedElement.textContent = `Last modified: ${formattedDate}`;
