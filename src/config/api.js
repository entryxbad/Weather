const apiKey = '2a4333ed5d5f4e93b50101803232807'

const forecastEndpoint = (params) =>
  `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`
const locationEndpoint = (params) =>
  `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`

const fetchData = async (endpoint) => {
  try {
    const response = await fetch(endpoint)
    if (!response.ok) {
      throw new Error('Error occured!')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.log('Error from fetchData', error)
    throw error
  }
}

export const fetchWeatherForecast = (params) => {
  return fetchData(forecastEndpoint(params))
}

export const fetchLocations = async (params) => {
  try {
    const data = await fetchData(locationEndpoint(params))
    // console.log('Location data:', data)
    return data
  } catch (error) {
    console.log('Error from fetchLocation', error)
    throw error
  }
}
