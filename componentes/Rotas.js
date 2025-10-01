import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "./Home";
import SplashScreen from "./SplashScreen";
import Cadastro from "./Cadastro";
import Alterar from "./Alterar";

const Stack = createNativeStackNavigator();

export default function Rotas() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Alterar" component={Alterar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
