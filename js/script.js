const weatherBlock = document.querySelector("#weather");

async function loadWeather() {
    weatherBlock.innerHTML = `
        <div class="weather__loading"> 
            <img src="img/loading.gif" alt="Loading...">
        </div>
    `;

    try {
        const serverURL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Minsk?unitGroup=metric&elements=datetime%2Ctemp%2Cfeelslike%2Cicon&include=current&key=5SC5QDPN7E62NNGZ5WBXMMPPN&contentType=json';

        const response = await fetch(serverURL, {
            method: "GET"
        });

        const responseResult = await response.json();

        if (response.ok) {
            getWeather(responseResult);
        } else {
            weatherBlock.innerHTML = responseResult.message;
        }
    } catch (e) {
        weatherBlock.innerHTML = "Что-то пошло не так:(";
    }

}

function getWeather(data) {
    const location = data.address;
    const temp = Math.round(data.currentConditions.temp);
    const feelsLike = Math.round(data.currentConditions.feelslike);
    const weatherStatus = data.currentConditions.icon;

    const template = `
        <div class="weather__header">
            <div class="weather__main">
                <div class="weather__city">${location}</div>
                <div class="weather__status">${weatherStatus[0].toUpperCase() + weatherStatus.slice(1)}</div>
            </div>
            <div class="weather__icon">
                <img src="img/${weatherStatus}.svg" alt="${weatherStatus}" />
            </div>
        </div>
        <div class="weather__temp">${temp}</div>
        <div class="weather__feels-like">Feels like: ${feelsLike}</div>
    `;

    weatherBlock.innerHTML = template;
}

if (weatherBlock) {
    loadWeather();
}