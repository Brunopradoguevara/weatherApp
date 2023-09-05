
import { useEffect, useRef, useState } from 'react'
import './App.css'
import './components/weatherCard.css'
import './components/modalAlert.css'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'
import ModalAlert from './components/ModalAlert'

function App() {

  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [image, setImage] = useState()
  const [inputValue, setInputValue] = useState()

  //loader
  useEffect(() => {
    const loader = document.querySelector('.loader');
    loader.classList.add('loader--hidden');
  }, [inputValue]);
  
    //Api navigator
   useEffect(() => {
    const success = pos =>{
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setCoords(obj) 
    }
    const error = () => {
      setInputValue("london")
      console.log(inputValue)
    }
    navigator.geolocation.getCurrentPosition(success,error)

  },[])

      //Api geo
     useEffect(()=>{
      if(inputValue){
        const apiKey = "43be0da6a4d12a1f3d653a5f3389d21b"
        const cityName= inputValue
        const url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`
        axios.get(url)
        .then(res =>{
          console.log(res.data[0])
          const obj = {
          lat: res.data[0].lat,
          lon: res.data[0].lon
          }
          setCoords(obj)
        })
      }
    },[inputValue]) 


    // Api weatherApi
  useEffect(()=>{
    if(coords){
      const apiKey = "43be0da6a4d12a1f3d653a5f3389d21b"
      const units = "metric"
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=${units}&appid=${apiKey}`  
      axios.get(url)
      .then(res => {
        setWeather(res.data)
        const obj = {
          celsius: (res.data.main.temp).toFixed(1),
          farenheit: ((res.data.main.temp)*9/5 + 32).toFixed(1)
        }
        setTemp(obj)
      })
      .catch(err => console.log(err))
    }

  },[coords])

  //Api pixabay
  useEffect(()=>{
    const apiKey = "39164433-94ec2e1273f88ab80880706f0"
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${weather?.weather[0].description}`
    if(weather?.weather[0].description==="moderate rain"){
      const newUrl=`https://pixabay.com/api/?key=${apiKey}&q=rain}`
      axios.get(newUrl)
      .then(res => setImage(res.data))
      .catch(err => console.log(err))
    }else{
      axios.get(url)
      .then(res => setImage(res.data))
      .catch(err => console.log(err))
    }
    console.log(weather?.weather[0].description)
    
  },[weather])

  const objStile = {
    backgroundImage: `url(${image?.hits[0]?.largeImageURL})`,
    backgroundSize: 'cover',
  }
  console.log(image?.hits[0]?.largeImageURL)
  const inputSearch = useRef()

  const handleSubmit = (e)=>{
    e.preventDefault()
    setInputValue(inputSearch.current.value.trim())
    console.log(inputValue)
    inputSearch.current.value= ""
  }

  return (
    <div style={objStile} className='container'>
      <div className="content__container">  
        <div class="loader">
          <div class='loader__container'></div>
        </div>
        <div className='form__container'>
          <form className='form--search-city' onSubmit={handleSubmit}>
            <input className='input--search-city' ref={inputSearch}  type='text'placeholder='Search for another city'  />
            <button className='btn--search-city'>Search🔍</button>
          </form>
        </div>
        <WeatherCard
          weather = {weather}
          temp = {temp}
        />
        <ModalAlert/>
      </div>
    </div>
  )
}

export default App
