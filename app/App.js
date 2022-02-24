import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Scheduler from './Scheduler';

export default function App() {
  return (
    <View style={styles.container}>
      <Scheduler/>
    </View>
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
