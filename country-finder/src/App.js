import { useState, useEffect } from 'react'
import axios from 'axios'

const SearchBar = ({input,handleSearch}) => {
  return(
    <div>
      <label>Find Countries:</label><input onChange={handleSearch}/> 
      {input}
    </div>
  )
}

const List = ({countryList,displaySearch,handleClick,showAll}) => {

  if(displaySearch.length > 10 && showAll === false){
    return(
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  } 

  if(showAll === true){
    return(
      <div>
        <ul>
          {displaySearch.sort().map(
            cName => 
              <li>{cName}</li>
            )}
        </ul>
      </div>
    )
  }

  if(displaySearch.length === 1){
    let countryInfo = countryList.filter((country) => country.name.common === displaySearch[0])
    let countryName = displaySearch
    let capital = countryInfo.map(country => country.capital)
    let countryArea = countryInfo.map(country => country.area)
    let countryFlag = countryInfo.map(country => country.flags["png"])

    let countryLanguage = countryInfo.map(country => country.languages)
    const languageList = Object.values(countryLanguage[0]);

    return(
      <div>
        <h2>{countryName}</h2>
        <p>Capital: {capital}</p>
        <p>Area: {countryArea}</p>
        <p><strong>languages</strong></p>
        <ul>
          {languageList.map(lang => <li>{lang}</li>)}
        </ul>
        <img src={countryFlag} alt={countryName}/>
        <Weather capital={capital}/>

      </div>
    )
  } 
  return(
    <div>
      <ul>
        {displaySearch.sort().map(
          cName => 
            <li>{cName} <button id={cName} onClick={handleClick}>show</button> </li>
          )}
      </ul>
    </div>
  )


}

const Weather = ({capital}) => {
  const [countryWeather, setCountryWeather] = useState()
  const [wind, setWind] = useState()
  const [temp, setTemp] = useState()
  const [iconName, setIconName] = useState()
  const weather_api_key = process.env.REACT_APP_WEATHER_API_KEY
  const WEATHER_URL= `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${weather_api_key}`
  let iconUrl = `http://openweathermap.org/img/wn/${iconName}@2x.png`


  const weatherHook = () => {
    axios
      .get(WEATHER_URL)
      .then(resp => {
        setCountryWeather(resp.data)
        setWind(resp.data["wind"].speed);
        setTemp(((resp.data["main"].temp - 32) * 5 / 9).toFixed(2))
        setIconName(resp.data["weather"][0].icon)
      })
    }
  useEffect(weatherHook,[WEATHER_URL])
  // console.log(countryWeather["weather"])
  // console.log(countryWeather,iconName)
  
  return(
    <div>
      <h3>Weather in {capital}</h3>
      <p>temperature: {temp} celsius</p>
      <img src= {iconUrl} alt="weather icon"/>
      <p>wind: {wind} m/s</p>
  
    </div>
  )
}

const App = () => {
  const [countryList,setCountryList] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [search, setSearch] = useState()

  let country = countryList.map(item => item.name.common)
  const displaySearch = showAll ? country : country.filter((country) => country.toLowerCase().includes(search.toLowerCase()))

  const countryListHook = ()=>{
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(resp => setCountryList(resp.data))
  }

  // console.log(country)

  useEffect(countryListHook,[])



  const handleSearch = (event) => {
    setSearch(event.target.value)
    if(event.target.value.length > 0) setShowAll(false)
    else setShowAll(true)
    
  }

  const handleClick = (event) => {
    setSearch(event.target.id)
  }

  return (
    <div>
      <h2>Country Finder</h2>
      <SearchBar input handleSearch={handleSearch}/>
      <List countryList={countryList} displaySearch={displaySearch} showAll={showAll} search={search} handleClick={handleClick} />
    </div>
  )
}

export default App


// app logic
// when user fills in, list will be filtered based on search result
  // create a list component and fetch data from endpoint
  // if input is "", hide list
  // if input is given, filter based on input