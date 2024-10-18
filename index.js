const form = document.querySelector('form');
const loader = document.querySelector('#loading');
const weatherinfor = document.querySelector('#weather-info');

form.addEventListener("submit", async function(event){
    event.preventDefault();

    const loc = document.querySelector('#location').value;
    loader.style.display = 'block';
    weatherinfor.textContent = '';

    const weatherData = await weather(loc);
    loader.style.display = 'none';

    if(weatherData){
        weatherinfor.textContent = `${weatherData.city}, ${weatherData.temperature},
        ${weatherData.weather}`;
    }


});






async function weather(location){
    const apiKey = '51a32e3ec3af9c700d8de6de89e0ea9e';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try{
        const response = await fetch(url);

        if(!response.ok){
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return weatherinfo(data);
    }

    catch (error){
        console.error('Error fetching weather data:', error);
    }
       



function weatherinfo(data){
    const list = {
        city: data.name,
        temperature: data.main.temp,
        weather: data.weather[0].description
    }

    console.log(list);
    return list;
}

weather(1701668)
}