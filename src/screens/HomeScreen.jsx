import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native'

const HomeScreen = () => {
  return (
    <View>
      <StatusBar barStyle={'light-content'} />
      <Image
        blurRadius={100}
        resizeMode="cover"
        source={require('../assets/images/bg.jpg')}
      />
      <SafeAreaView style={{flex: 1}}>
        {/* Search section */}
        <View>
          <View>
            <TextInput placeholder="Search city" />
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default HomeScreen
