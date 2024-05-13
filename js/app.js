const changeLocation = document.getElementById('change-location')
const card = document.getElementById('card')
const details = document.getElementById('details')
const weatherIcon = document.getElementById('weather-icon')
const overlay = document.getElementById('overlay')
const error = document.querySelector("#error")

changeLocation.city.focus()
const loader = (state)=>{
    if (state) {
        overlay.classList.remove("d-none")
    }else{
        overlay.classList.add("d-none")

    }
}
const update = (weatherdata)=>{
    console.log(weatherdata.cod);
    if (weatherdata.cod === 200) {
        error.classList.add("d-none")
        details.innerHTML = `
        <h5 class="mb-3">${weatherdata.name}, ${weatherdata.sys.country}</h5>
        <p class="mb-3">${weatherdata.weather[0].main}</p>
        <div class="display-4 mb-3">
          <span>${Math.round(weatherdata.main.temp)}</span>
          <span>&deg;C</span>`
          if (card.classList.contains('d-none')) {
            card.classList.remove('d-none')
          }
          weatherIcon.src = `https://openweathermap.org/img/wn/${weatherdata.weather[0].icon}@2x.png`
    } else{
        error.classList.remove("d-none")
        card.classList.add('d-none')
        setTimeout(() => {
            error.classList.add("d-none")
        }, 8000);
    }
   
}

const getWeather = async (cityName) => {
    const data = await getData(cityName)
    return data
}
changeLocation.addEventListener('submit', (e) => {
    e.preventDefault()
    const cityName = changeLocation.city.value.trim()
    changeLocation.reset()
    getWeather(cityName).then((data)=>update(data))
})