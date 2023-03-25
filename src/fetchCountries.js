async function fetchCountries(name) {
    const response = await fetch(`https://restcountries.com/v2/name/${name}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const countries = await response.json()
    return countries
  }
  
  export { fetchCountries };