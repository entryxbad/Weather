import {useState} from 'react'
import {Text, TextInput, TouchableOpacity, View} from 'react-native'
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import {MapPinIcon} from 'react-native-heroicons/solid'

const Search = () => {
  const [toggleSearch, setToggleSearch] = useState(false)
  const [location, setLocation] = useState([1, 2, 3])

  const handleLocation = (loc) => {
    console.log('location')
  }

  return (
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
      {location.length > 0 && toggleSearch ? (
        <View className="absolute bg-gray-300 w-full rounded-3xl top-16">
          // TODO: add data from api
          {location.map((item, index) => {
            let showBorder = index + 1 != location.length
            let borderClass = showBorder ? ' border-b-2 border-b-gray-400' : ''
            return (
              <TouchableOpacity
                onPress={() => handleLocation(loc)}
                key={index}
                className={'flex-row items-center p-3 px-4 mb-1' + borderClass}>
                <MapPinIcon size={20} color={'gray'} />
                <Text className="text-black text-lg ml-2">
                  Ufa, Bashkortostan
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>
      ) : null}
    </View>
  )
}

export default Search
