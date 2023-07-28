import {useState} from 'react'
import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import {MapPinIcon} from 'react-native-heroicons/solid'

const HomeScreen = () => {
  const [toggleSearch, setToggleSearch] = useState(false)
  const [location, setLocation] = useState([1, 2, 3])

  return (
    <View className="flex-1 relative">
      <StatusBar barStyle={'light-content'} />
      <Image
        className="absolute h-full w-full"
        resizeMode="cover"
        blurRadius={70}
        source={require('../assets/images/bg.png')}
      />
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
              {location.map((item, index) => {
                let showBorder = index + 1 != location.length
                let borderClass = showBorder ? 'border-b-2 border-gray-400' : ''
                return (
                  <TouchableOpacity
                    key={index}
                    className={
                      'flex-row items-center p-3 px-4 mb-1' + borderClass
                    }>
                    <MapPinIcon size={20} color={'gray'} />
                    <Text>Ufa, Bashkortostan</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          ) : null}
        </View>
      </SafeAreaView>
    </View>
  )
}

export default HomeScreen
