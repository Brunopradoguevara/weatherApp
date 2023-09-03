import { useState } from "react"


const WeatherCard = ({weather,temp}) => {

    console.log(weather)
    const [isCelsius, setisCelsius] = useState(true)
    const handleChangeTemp = () =>{
      setisCelsius(!isCelsius)
    }
  return (
    <article className='card'>
      <div className="card__conteiner">
        <div className="card__header">
          <h1 className="card__title">Weather App</h1>
          <h2 className="card__location">{weather?.name}, {weather?.sys.country}</h2>
        </div>
        <div className="card__main">
          <div className="weather_img__conteiner">
            <img className="weather_img" src={weather && `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="" />
          </div>
          <section className="weather__information">
            <h3 className="weather__description">"{weather?.weather[0].description}"</h3>
            <ul className="weather__features">
              <li className="weather__feature"><span className="weather__feature--title">Wind Speed</span> <span className="weather__feature--value">{weather?.wind.speed}m/s</span></li>
              <li className="weather__feature"><span className="weather__feature--title">Clouds</span> <span className="weather__feature--value">{weather?.clouds.all}%</span></li>
              <li className="weather__feature"><span className="weather__feature--title">Pressure</span> <span className="weather__feature--value">{weather?.main.pressure.toLocaleString('en-US')}hPa</span></li>
            </ul>
          </section>
        </div>
        <div className="card__temperature">
          <h2 className="temperature__value">{isCelsius ?`${temp?.celsius}°C` : `${temp?.farenheit}°F`}</h2>
          <button className="btn__temperature--change" type="button" onClick={handleChangeTemp}>{isCelsius ? 'Change to °F': 'Change to °C'}</button>
        </div>
      </div>
      </article>
  )
}

export default WeatherCard