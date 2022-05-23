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

const List = ({countryList,displaySearch,showAll}) => {

  if(displaySearch.length > 10 && showAll === false){
    return(
      <div>
        <p>Too many matches, specify another filter</p>
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

      </div>
    )
  } 

  return(
    <div>
      <ul>{displaySearch.sort().map(cName => <li>{cName}</li>)}</ul>
    </div>
  )


}

const App = () => {
  const [countryList,setCountryList] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [search, setSearch] = useState()

  let country = countryList.map(item => item.name.common)
  const displaySearch = showAll ? country : country.filter((country) => country.toLowerCase().includes(search.toLowerCase()))

  useEffect( ()=>{
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(resp => setCountryList(resp.data))
  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
    if(event.target.value.length > 0) setShowAll(false)
    else setShowAll(true)
    
  }
  // console.log(search)
  // console.log(countryList);
  // console.log(displaySearch.length);

  return (
    <div>
      <h2>Country Finder</h2>
      <SearchBar input handleSearch={handleSearch}/>
      <List countryList={countryList} displaySearch={displaySearch} showAll={showAll} search={search}/>
    </div>
  )
}

export default App


// app logic
// when user fills in, list will be filtered based on search result
  // create a list component and fetch data from endpoint
  // if input is "", hide list
  // if input is given, filter based on input