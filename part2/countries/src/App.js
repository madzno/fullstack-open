import { useState, useEffect } from 'react'
import axios from 'axios'

const CountriesList = ({ countriesArr, showHandler }) => {
  return (
    <>
      <ul>
        {countriesArr.map(country => {
          return <li key={country.name.common}>
            {country.name.common}
            <button onClick={showHandler}>show</button>
          </li>
        })}
      </ul>
    </>
  )
}

const CountryInfo = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map(language => {
          return <li key={language}>{language}</li>
        })}
      </ul>
      <img src={country.flags.png}></img>
    </>
  )
}

const Countries = ({ countries, name, handler }) => {
  if (!name) {
    return;
  } else if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (countries.length > 1) {
    return (
      <CountriesList countriesArr={countries} showHandler={handler} />
    )
  } else if (countries.length === 0) {
    return (
      <p>No matches for that filter</p>
    )
  } else {
    return (
      <CountryInfo country={countries[0]} />
    )
  }
}

const App = () => {

  const [countryName, setCountryName] = useState('');
  const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setAllCountries(response.data))
  }, [])

  const countriesToShow = (countryName === '')
    ? allCountries
    : allCountries.filter(country => country.name.common.toLowerCase().includes(countryName))

  const handleSearch = (event) => {
    setCountryName(event.target.value.toLowerCase());
  }

  const handleShow = (event) => {
    console.log('show')
  }

  return (
    <>
      find countries <input value={countryName} onChange={handleSearch} />
      <Countries
        countries={countriesToShow}
        name={countryName}
        handler={handleShow}
      />
    </>
  )
}

export default App;
