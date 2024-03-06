const buttonSearch = document.getElementById('button-search'); 

const countryName = document.getElementById('country-name'); 
const countryRegion = document.getElementById('region'); 
const countrySubregion = document.getElementById('subregion'); 
const countryCapital = document.getElementById('capital'); 
const countryFlag = document.getElementById('country'); 

buttonSearch.addEventListener('click', () => {
    const countryInput = document.getElementById('country-input').value;
    
    fetchDataApi(countryInput); 
}); 

const fetchDataApi = (countryInput) => {

    const url_base = `https://restcountries.com/v3.1/name/${countryInput}`; 

    fetch(url_base)

    .then(response => response.json())
    .then(data => 

        printDataInScreen(data, countryInput)
    )
    
    .catch(error => {
        console.log('Error to fetch data from the API: ', error); 

        countryName.innerText = "Not found";
        countryRegion.textContent = "Not found";
        countrySubregion.textContent = "Not found"; 
        countryCapital.textContent = "Not found"; 
        countryFlag.src = "./assets/images/default-image.jfif"; 
    })
}

const printDataInScreen = (data, countryInput) => {

    countryName.textContent = countryInput; 
    countryRegion.innerHTML = `<strong> Region: </strong> ${data[0].region}`; 
    countrySubregion.innerHTML = `<strong> Subregion: </strong> ${data[0].subregion}`; 
    countryCapital.innerHTML = `<strong> Capital: </strong> ${data[0].capital}`;

    countryFlag.src = data[0].flags.svg;  
    countryFlag.alt = data[0].flags.alt;  
    document.getElementById('country-input').value = "";
}
