import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator }from '@react-navigation/native-stack'

import Home from './Pages/Home';
import CartScreen from './Pages/Carrinho';
import { CartProvider } from './Context/' 
import CheckoutScreen from './Pages/Formulario';
const Stack = createNativeStackNavigator();

export default function Router(){
    return(
        <CartProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="CartScreen" component={CartScreen} />
          <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} options={{ title: 'Checkout' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
    );
}