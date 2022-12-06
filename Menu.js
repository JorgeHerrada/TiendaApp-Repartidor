import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// pantallas que saldran en el proyecto
import LOGIN from "./Login";
import SIGNIN from "./SignIn";
import PEDIDOS from "./Pedidos";
import MAPAPEDIDO from './MapaPedido';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator >
        <Stack.Screen 
          name="Login" 
          component={LOGIN} 
          options={{ headerShown: false }} // header wont show
        />
        <Stack.Screen 
          name="SignIn" 
          component={SIGNIN} 
          options={{ headerShown: false }} // header wont show
        />
        <Stack.Screen 
          name="Pedidos" 
          component={PEDIDOS} 
          options={{ headerShown: false }} // header wont show
        />
        <Stack.Screen 
          name="MapaPedido" 
          component={MAPAPEDIDO} 
          options={{ headerShown: false }} // header wont show
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;