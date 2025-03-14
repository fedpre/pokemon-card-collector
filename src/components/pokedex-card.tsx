import Icon from 'react-native-vector-icons/MaterialIcons';
import {PokemonDetailsType} from '../types';
import {View, Text, Image, StyleSheet} from 'react-native';

export function PokedexCard({pokemon}: {pokemon: PokemonDetailsType}) {
  return (
    <View style={styles.container}>
      <View style={styles.pokemonInfo}>
        <Image source={{uri: pokemon.image}} style={styles.sprite} />
        <Text style={styles.pokemonName}>{pokemon.name}</Text>
      </View>
      <Icon name="bookmark" size={24} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  sprite: {
    width: 100,
    height: 100,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 16,
    borderBottomColor: '#999',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 16,
  },
  pokemonInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pokemonName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
