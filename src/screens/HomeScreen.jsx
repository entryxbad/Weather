import {debounce} from 'lodash'
import {useCallback, useEffect, useState} from 'react'
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import {MapPinIcon} from 'react-native-heroicons/solid'
import {CalendarDaysIcon} from 'react-native-heroicons/solid'
import * as Progress from 'react-native-progress'

import {fetchLocation, fetchWeatherForecast} from '../config/api'
import {weatherImages} from '../config/images'
import {getData, storeData} from '../utils/asyncStorage'

const HomeScreen = () => {
  const [toggleSearch, setToggleSearch] = useState(false)
  const [locations, setLocations] = useState([])
  const [weather, setWeather] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const handleLocation = (item) => {
    setLocations([])
    setIsLoading(true)
    setToggleSearch(false)
    fetchWeatherForecast({cityName: item.name, days: '7'}).then((data) => {
      setWeather(data)
      setIsLoading(false)
      storeData('city', item.name)
    })
  }

  const handleSearch = (value) => {
    if (value.length > 2) {
      fetchLocation({cityName: value})
        .then((data) => {
          setLocations(data)
        })
        .catch((error) => {
          console.log('Error in handleSearch:', error)
        })
    }
  }

  useEffect(() => {
    fetchMyWeatherData()
  }, [])

  const fetchMyWeatherData = async () => {
    let myCity = await getData('city')
    let cityName = 'Ufa'
    if (myCity) cityName = myCity
    fetchWeatherForecast({
      cityName,
      days: '7',
    }).then((data) => {
      setWeather(data)
      setIsLoading(false)
    })
  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), [])
  const {location, current} = weather

  return (
    <View className="flex-1 relative">
      <StatusBar barStyle={'light-content'} />
      <Image
        className="absolute h-full w-full"
        resizeMode="cover"
        blurRadius={70}
        source={require('../assets/images/bg.png')}
      />
      {isLoading ? (
        <View className="flex-1 flex-grow justify-center items-center">
          <Progress.CircleSnail size={140} thickness={10} color={'#0bb3b2'} />
        </View>
      ) : (
        <SafeAreaView className="flex-1 mt-3">
          {/* Search section */}
          <View className="mx-4 relative z-50">
            <View
              className="flex-row justify-end items-center rounded-full"
              style={{
                backgroundColor: toggleSearch
                  ? 'rgba(255, 255, 255, 0.2)'
                  : 'transparent',
              }}>
              {toggleSearch ? (
                <TextInput
                  onChangeText={handleTextDebounce}
                  className="flex-1 pl-6 text-base text-white"
                  placeholder="Search city"
                  placeholderTextColor={'lightgray'}
                />
              ) : null}
              <TouchableOpacity
                className="bg-white-rgba rounded-full p-3 m-1"
                onPress={() => setToggleSearch(!toggleSearch)}>
                <MagnifyingGlassIcon size={25} color={'white'} />
              </TouchableOpacity>
            </View>
            {locations.length > 0 && toggleSearch ? (
              <View className="absolute bg-gray-300 w-full rounded-3xl top-16">
                {locations.map((item, index) => {
                  let showBorder = index + 1 != locations.length
                  let borderClass = showBorder
                    ? ' border-b-2 border-b-gray-400'
                    : ''
                  return (
                    <TouchableOpacity
                      onPress={() => handleLocation(item)}
                      key={index}
                      className={
                        'flex-row items-center p-3 px-4 mb-1' + borderClass
                      }>
                      <MapPinIcon size={20} color={'gray'} />
                      <Text className="text-black text-lg ml-2">
                        {item?.name}, {item?.country}
                      </Text>
                    </TouchableOpacity>
                  )
                })}
              </View>
            ) : null}
          </View>
          <View className="flex-1 justify-around mx-4 mb-2">
            {/* Location */}
            <Text className="text-2xl text-white font-bold text-center">
              {location?.name},
              <Text className="text-lg text-gray-300 font-semibold">
                {' ' + location?.country}
              </Text>
            </Text>

            {/* Weather Image */}
            <View className="items-center">
              <Image
                className="w-52 h-52"
                source={weatherImages[current?.condition?.text]}
              />
            </View>

            {/* Degree celsius */}
            <View className="space-y-2">
              <Text className="text-center text-white text-6xl font-bold ml-5">
                {current?.temp_c}&#176;
              </Text>
              <Text className="text-center text-white text-xl tracking-widest">
                {current?.condition?.text}
              </Text>
            </View>

            {/* Other stats */}
            <View className="flex-row justify-between mx-4">
              <View className="flex-row space-x-2 items-center">
                <Image
                  source={require('../assets/icons/wind.png')}
                  className="h-6 w-6"
                />
                <Text className="text-white font-semibold text-base">
                  {current?.wind_kph}km
                </Text>
              </View>
              <View className="flex-row space-x-2 items-center">
                <Image
                  source={require('../assets/icons/drop.png')}
                  className="h-6 w-6"
                />
                <Text className="text-white font-semibold text-base">
                  {current?.humidity}%
                </Text>
              </View>
              <View className="flex-row space-x-2 items-center">
                <Image
                  source={require('../assets/icons/sun.png')}
                  className="h-6 w-6"
                />
                <Text className="text-white font-semibold text-base">
                  {weather?.forecast?.forecastday[0]?.astro?.sunrise}
                </Text>
              </View>
            </View>

            {/* Forecast for next days */}

            <View className="mb-2 space-y-1">
              <View className="flex-row items-center space-x-2">
                <CalendarDaysIcon size={22} color={'white'} />
                <Text className="text-white text-base">Daily forecast</Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {weather?.forecast?.forecastday?.map((item, index) => {
                  let date = new Date(item.date)
                  let options = {weekday: 'long'}
                  let dayName = date.toLocaleDateString('en-US', options)
                  dayName = dayName.split(',')[0]
                  return (
                    <View
                      key={index}
                      className="justify-center items-center w-24 rounded-3xl bg-white-rgba py-2 space-y-1 mr-4">
                      <Image
                        source={weatherImages[item?.day?.condition?.text]}
                        className="w-11 h-11"
                      />
                      <Text className="text-white">{dayName}</Text>
                      <Text className="text-white text-xl font-semibold">
                        {item?.day?.avgtemp_c}&#176;
                      </Text>
                    </View>
                  )
                })}
              </ScrollView>
            </View>
          </View>
        </SafeAreaView>
      )}
    </View>
  )
}

export default HomeScreen
