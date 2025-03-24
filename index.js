const API_KEY = "db4d4bf6bf06bd7f055046e184629cc7";
let place = "india";

let input = document.getElementById("input-container");
let search = document.getElementById("search-id");
let loading = document.getElementById("loading");

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        let value = input.value.trim();
        if (!value) {
            alert("Please enter the city name");
            return;
        }
        place = value;
        fetchWeather();
    }
});

search.addEventListener("click", () => {
    let value = input.value.trim();
    if (!value) {
        alert("Please enter a value");
        return;
    }
    place = value;
    fetchWeather();
});

let fetchWeather = async () => {
    loading.style.display="block";
    const API_VALUE = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${API_KEY}&units=metric`;
    try {
        let response = await fetch(API_VALUE);
        if (!response.ok) {
            alert("City not found or error fetching data");
            return;
        }
        
        let data = await response.json();
        console.log(data);

        
            loading.style.display="none"
        
        
            
            let { feels_like, humidity, temp, temp_max, temp_min } = data.main;
            document.querySelector(".temp").innerHTML = ` ${temp}°C`;
            document.querySelector(".feels-like").innerHTML = `Feels Like: ${feels_like}°C`;
            document.querySelector(".temp_max").innerHTML = `${temp_max}°C`;
            document.querySelector(".temp_min").innerHTML = `${temp_min}°C`;
            document.getElementById("humidity").innerHTML = ` ${humidity}%`;
            
            // Weather description
            let { description } = data.weather[0];
            document.querySelector(".current-weather").innerHTML = ` ${description}`;
    
    
            // Wind speed
            const { speed } = data.wind;
            document.getElementById("wind-speed").innerHTML = `${speed} m/s`;
        
        

        // Update temperature and humidity
    //    data?datas(data):laoding.style.display="block"

    } catch (error) {
        alert(`There is an error: ${error}`);
    }
};
