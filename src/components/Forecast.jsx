import {Image, ScrollView, Text, View} from 'react-native'
import {CalendarDaysIcon} from 'react-native-heroicons/solid'

const Forecast = ({loc, current}) => {
  return (
    <View className="flex-1 justify-around mx-4 mb-2">
      {/* Location */}
      <Text className="text-2xl text-white font-bold text-center">
        Ufa,
        <Text className="text-lg text-gray-300 font-semibold">
          Bashkortostan
        </Text>
      </Text>

      {/* Weather Image */}
      <View className="items-center">
        <Image
          className="w-52 h-52"
          source={require('../assets/images/partlycloudy.png')}
        />
      </View>

      {/* Degree celsius */}
      <View className="space-y-2">
        <Text className="text-center text-white text-6xl font-bold ml-5">
          30&#176;
        </Text>
        <Text className="text-center text-white text-xl tracking-widest">
          Partly cloudy
        </Text>
      </View>

      {/* Other stats */}
      <View className="flex-row justify-between mx-4">
        <View className="flex-row space-x-2 items-center">
          <Image
            source={require('../assets/icons/wind.png')}
            className="h-6 w-6"
          />
          <Text className="text-white font-semibold text-base">10km</Text>
        </View>
        <View className="flex-row space-x-2 items-center">
          <Image
            source={require('../assets/icons/drop.png')}
            className="h-6 w-6"
          />
          <Text className="text-white font-semibold text-base">24%</Text>
        </View>
        <View className="flex-row space-x-2 items-center">
          <Image
            source={require('../assets/icons/sun.png')}
            className="h-6 w-6"
          />
          <Text className="text-white font-semibold text-base">6:05 AM</Text>
        </View>
      </View>

      {/* Forecast for next days */}

      <View className="mb-2 space-y-1">
        <View className="flex-row items-center space-x-2">
          <CalendarDaysIcon size={22} color={'white'} />
          <Text className="text-white text-base">Daily forecast</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="justify-center items-center w-24 rounded-3xl bg-white-rgba py-2 space-y-1 mr-4">
            <Image
              source={require('../assets/images/heavyrain.png')}
              className="w-11 h-11"
            />
            <Text className="text-white">Monday</Text>
            <Text className="text-white text-xl font-semibold">23&#176;</Text>
          </View>
          <View className="justify-center items-center w-24 rounded-3xl bg-white-rgba py-2 space-y-1 mr-4">
            <Image
              source={require('../assets/images/heavyrain.png')}
              className="w-11 h-11"
            />
            <Text className="text-white">Tuesday</Text>
            <Text className="text-white text-xl font-semibold">23&#176;</Text>
          </View>
          <View className="justify-center items-center w-24 rounded-3xl bg-white-rgba py-2 space-y-1 mr-4">
            <Image
              source={require('../assets/images/heavyrain.png')}
              className="w-11 h-11"
            />
            <Text className="text-white">Monday</Text>
            <Text className="text-white text-xl font-semibold">23&#176;</Text>
          </View>
          <View className="justify-center items-center w-24 rounded-3xl bg-white-rgba py-2 space-y-1 mr-4">
            <Image
              source={require('../assets/images/heavyrain.png')}
              className="w-11 h-11"
            />
            <Text className="text-white">Monday</Text>
            <Text className="text-white text-xl font-semibold">23&#176;</Text>
          </View>
          <View className="justify-center items-center w-24 rounded-3xl bg-white-rgba py-2 space-y-1 mr-4">
            <Image
              source={require('../assets/images/heavyrain.png')}
              className="w-11 h-11"
            />
            <Text className="text-white">Monday</Text>
            <Text className="text-white text-xl font-semibold">23&#176;</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

export default Forecast
