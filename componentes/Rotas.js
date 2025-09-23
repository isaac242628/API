import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../componentes/Home";
import Cadastro from "../componentes/Cadastro";
import Alterar from "../componentes/Alterar";
import SplashScreen from "../componentes/SplashScreen";

const Stack = createStackNavigator();

export default function Rotas() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Spalsh"
          component={SplashScreen}
          options={{ headerShowm: false }}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Alterar" component={Alterar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
