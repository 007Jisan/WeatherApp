async function getWeather() {
    let city = document.getElementById('city').value
    let weatherInfo = document.getElementById('weatherInfo')

    if (!city) {
        weatherInfo.innerHTML = "<p class='danger'>Please enter a city name</p>"
        return
    }

    let apiKey = "d596334928a6f620c8438d518f7b2bd8" // Ensure this API key is valid/active
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    try {
        let response = await fetch(url)
        if (!response.ok) {
            throw new Error("City not found")
        }

        let data = await response.json()

        displayWeather(data)

    } catch (error) {
        console.log(error);
        // Optional: Display error to user
        weatherInfo.innerHTML = `<p class='danger'>${error.message}</p>`
    }
}

function displayWeather(data) {
    let { name, weather, timezone, coord } = data
    let weatherInfo = document.getElementById('weatherInfo')
    
    // Fixed: Used 'weather[0].description' instead of 'description[0].description'
    weatherInfo.innerHTML = `
        <div>
            <h3>Weather in ${name}</h3>
            <p>Timezone: ${timezone}</p>
            <p>Description: ${weather[0].description}</p>
            <p>Lat: ${coord.lat}</p>
            <p>Lon: ${coord.lon}</p>
        </div>
    `
}