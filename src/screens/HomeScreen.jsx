import {Image, SafeAreaView, StatusBar, View} from 'react-native'

import Forecast from '../components/Forecast'
import Search from '../components/Search'

const HomeScreen = () => {
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
        <Search />
        {/* Forecast section */}
        <Forecast />
      </SafeAreaView>
    </View>
  )
}

export default HomeScreen
