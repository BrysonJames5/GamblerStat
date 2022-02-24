import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Scheduler from './Scheduler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Scheduler}
        />
        
      </Stack.Navigator>


    </NavigationContainer>
    
      
  
  );
}

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingTop: 100,
    padding: 5
  },
});
