const API_KEY = "db4d4bf6bf06bd7f055046e184629cc7";
let place ="india" ;
let weather_images = {
    "Rain":"images/rainy.jpg",
    "Clouds": "images/partlysunny.jpg",
    "Clear":"images/sunny.jpg",
    "default":"images/morning.jpg"
}

let input = document.getElementById("input-text")
let search = document.getElementById("search-id")

input.addEventListener("keypress",(e)=>{
    if(e.key ==="Enter"){
        let value = input.value.trim();
        if(!value){
            alert("please Enter the city name")
            return;
        }
        place = value;
        fetchWeather();
    }
})

search.addEventListener("click",()=>{
    let value = input.value.trim();
    if(!value){
        alert("Please Enter a value");
        return;
    }
    place = value;
    fetchWeather();
})

let fetchWeather = async () => {
    const API_VALUE = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${API_KEY}&units=metric`;
    try{
        let response = await fetch(`${API_VALUE}`);
        if(!response.ok){
            alert("There is something wrong here");
            return;
        }
        let data = await response.json();

        //temperature and humidity details
        let {feels_like,humidity, temp, temp_max, temp_min} = data.main;
        document.getElementsByClassName("temp")[0].innerHTML = `Temperature: ${temp}`
        document.getElementsByClassName("feels-like")[0].innerHTML = `Feels Like: ${feels_like}`;
        document.getElementsByClassName("max-temp")[0].innerHTML = `Maximum: ${temp_max}`;
        document.getElementsByClassName("min-temp")[0].innerHTML = `Minimum: ${temp_min}`

        //cloud and rain details
        let weatherImg = document.querySelector(".child2-children1 img");
        let weatherText = document.getElementById("current-weather");
        let {description,main} = data.weather[0];
        let matchKey = weather_images[main] || weather_images["default"]
        weatherImg.src = matchKey;
        weatherText.innerText = `${description}`;

        //wind speed details
        const {speed} = data.wind;
        document.getElementById("wind-speed").innerHTML = `wind speed: ${speed} m/s`



    }catch(error){
        alert(`There is an error: ${error}`)
    }
}


