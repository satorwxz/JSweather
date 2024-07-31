const country = 'https://restcountries.com/v3.1/all';
const searchField = document.querySelector('#select');
const div = document.querySelector('#div');
const submit=document.querySelector("#submit");
const apiKey='e916b7b27a1346b7b7a42957241607'
const row=document.querySelector('#row');
const searchField2 = document.querySelector('#searchField');
const container=document.querySelector('#container');


let dateAll = [];
let str=''
let countries=[]


fetch(country)
    .then(res => res.json())
    .then(data => {
        dateAll = data;
        searchField.innerHTML += data.map(country => {
            return `
<option class="options" id="${country.name.common}">${country.name.common}</option>`;
        }).join('');
    })
   ;

fetch(country)
    .then(res => res.json())
    .then(data =>{
        countries=data
        div.innerHTML=countries.map(country =>{
            return `
        <div class="col-4" >
            <div class="card">
                    <img src="${country.flags.png}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h3 class="card-title">${country.name.common}</h3>
                    <p class="card-text">${country.capital}</p>
                </div>
            </div>

        </div>

        `
        }).join('')
    })


searchField.addEventListener('change', (e) => {
    const selectedOption = e.target.selectedOptions[0];
    console.log(selectedOption.id);
    dateAll.forEach((item) => {
        let array = Object.keys(item.languages);
        let cur = Object.keys(item.currencies);
        if (item.name.common === selectedOption.id) {
            div.innerHTML = `

                <img src="${item.flags.png}" alt="Flag of ${item.name.common}">
                <div class="card">
                <span>Country: ${item.name.common}</span>
                <span>Страна: ${item.translations.rus.common}</span>
                <span>Capital: ${item.capital}</span>
                <span>Languages: ${item.languages[array[0]]}</span>
                <span>Currencies: ${item.currencies[cur[0]].name}</span>
                <span>Population: ${item.population}</span>
                <div class="map">
                     <a class="url" href="${item.maps.googleMaps}" target="_blank">Map</a>
                </div>
                </div>




            `;
            handleCheck(item.capital);
        }
    });
});

function handleCheck(capital) {

    const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${capital}`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(wData => {
            const weatherDiv = `
                    <div class="weath-card">
                    <span>Погода в ${capital}</span>
                    <span>Температура: ${wData.current.temp_c}°C</span>
                    </div>

                `
            div.innerHTML += weatherDiv;
        })

}






