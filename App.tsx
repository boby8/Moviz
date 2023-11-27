import AppNavigator from './src/navigation/routes';
import {View} from 'react-native';
function App(): JSX.Element {
  return (
    <View style={{flex: 1}}>
      <AppNavigator />
    </View>
  );
}

export default App;
