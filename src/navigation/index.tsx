import {createNativeBottomTabNavigator} from '@bottom-tabs/react-navigation';
import {NavigationContainer} from '@react-navigation/native';
import Pokemon from '../screens/pokemon';
import Pokedex from '../screens/pokedex';
import Icon from 'react-native-vector-icons/MaterialIcons';

enum TabScreens {
  PokemonScreen = 'PokemonScreen',
  PokedexScreen = 'PokedexScreen',
}

const Tab = createNativeBottomTabNavigator();

const PokemonIcon = Icon.getImageSourceSync('catching-pokemon', 24);
const PokedexIcon = Icon.getImageSourceSync('library-add-check', 24);

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name={TabScreens.PokemonScreen}
          component={Pokemon}
          options={{
            title: 'Pokemon',
            tabBarIcon: () => PokemonIcon,
          }}
        />
        <Tab.Screen
          name={TabScreens.PokedexScreen}
          component={Pokedex}
          options={{
            title: 'Pokedex',
            tabBarIcon: () => PokedexIcon,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
