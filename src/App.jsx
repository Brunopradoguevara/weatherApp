
import { useEffect, useState } from 'react'
import './App.css'
import './components/weatherCard.css'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'

function App() {

  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [image, setImage] = useState()
  
   useEffect(() => {
    const success = pos =>{
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setCoords(obj) 
    }
    const error = () => {
      window.alert("No se permitio acceder a la ubicación")
    }
    navigator.geolocation.getCurrentPosition(success,error)

  },[])
 
  useEffect(()=>{
    if(coords){
      const apiKey = "43be0da6a4d12a1f3d653a5f3389d21b"
      const units = "metric"
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=${units}&appid=${apiKey}`  
      axios.get(url)
      .then(res => {setWeather(res.data)
        const obj = {
          celsius: (res.data.main.temp).toFixed(1),
          farenheit: ((res.data.main.temp)*9/5 + 32).toFixed(1)
        }
        setTemp(obj)
      })
      .catch(err => console.log(err))
    }

  },[coords])

  useEffect(()=>{
    const apiKey = "39164433-94ec2e1273f88ab80880706f0"
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${weather?.weather[0].description}`
    axios.get(url)
    .then(res => setImage(res.data))
    .catch(err => console.log(err))
  },[weather])

  const objStile = {
    backgroundImage: `url(${image?.hits[0].largeImageURL})`,
    backgroundSize: 'cover',
  }

  return (
    <div style={objStile}>
      <WeatherCard
        weather = {weather}
        temp = {temp}
      />
    </div>
  )
}

export default App
