import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import SendOtp from './src/components/SendOtp';
import VerifyOtp from './src/components/VerifyOtp';
import Dashboard from './src/components/Dashboard';
import store from './src/store';

const Stack = createStackNavigator();

function Otp() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Otp" component={SendOtp} options={{ headerShown: false }} />
      <Stack.Screen name="verifyOtp" component={VerifyOtp} options={{ title: 'Verify Otp' }} />
    </Stack.Navigator>
  )
}

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Otp" component={Otp}  options={{ headerShown: false }} />
          <Stack.Screen name="dashboard" component={Dashboard} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;