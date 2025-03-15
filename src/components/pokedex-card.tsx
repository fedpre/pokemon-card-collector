import Icon from 'react-native-vector-icons/MaterialIcons';
import {PokemonDetailsType} from '../types';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, {SharedValue, useAnimatedStyle} from 'react-native-reanimated';
import {usePokedexStore} from '../store';
import {memo} from 'react';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function RightAction(
  prog: SharedValue<number>,
  drag: SharedValue<number>,
  pokemon: PokemonDetailsType,
) {
  const {removePokemon} = usePokedexStore();

  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{translateX: drag.value + 50}],
    };
  });

  return (
    <AnimatedPressable
      style={[styles.pressable, styleAnimation]}
      onPress={() => removePokemon(pokemon)}>
      <Icon name="delete" size={24} color="white" />
    </AnimatedPressable>
  );
}

export const PokedexCard = memo(({pokemon}: {pokemon: PokemonDetailsType}) => {
  return (
    <ReanimatedSwipeable
      containerStyle={[styles.container, styles.divider]}
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      renderRightActions={(progress, dragX) =>
        RightAction(progress, dragX, pokemon)
      }>
      <View id={pokemon.id.toString()} style={styles.container}>
        <View style={styles.pokemonInfo}>
          <Image source={{uri: pokemon.image}} style={styles.sprite} />
          <Text style={styles.pokemonName}>{pokemon.name}</Text>
        </View>
        <View style={styles.bookmarkContainer}>
          <Icon name="bookmark" size={24} color="red" />
        </View>
      </View>
    </ReanimatedSwipeable>
  );
});

const styles = StyleSheet.create({
  sprite: {
    width: 100,
    height: 100,
  },
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#999',
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
  bookmarkContainer: {
    paddingRight: 16,
  },
  pressable: {
    width: 50,
    height: '100%',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
