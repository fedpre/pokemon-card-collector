import {Dimensions, Image, StyleSheet, Text} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {fetchPokemon} from '../api/queries';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  interpolateColor,
} from 'react-native-reanimated';
import {PokemonDetailsType, PokemonType} from '../types';
import {usePokedexStore} from '../store';
interface PokemonCardProps {
  pokemon: PokemonType;
  index: number;
}

const {width, height} = Dimensions.get('screen');

export default function PokemonCard({pokemon, index}: PokemonCardProps) {
  const {addPokemon} = usePokedexStore();
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);
  const rotation = useSharedValue(0);

  const {data, isLoading, isError} = useQuery({
    queryKey: ['pokemon', pokemon.url],
    queryFn: () => fetchPokemon(pokemon.url),
  });

  const pokemonDetails: PokemonDetailsType = {
    id: data?.id,
    name: data?.name,
    image: data?.sprites.front_shiny,
  };

  const panGesture = Gesture.Pan()
    .onStart(() => {
      prevTranslationX.value = translationX.value;
      prevTranslationY.value = translationY.value;
    })
    .onUpdate(event => {
      translationX.value = event.translationX;
      translationY.value = event.translationY;
      rotation.value = event.translationX / 10;
    })
    .onEnd(() => {
      if (translationX.value > width * 0.3) {
        translationX.value = withTiming(width * 2);
        runOnJS(addPokemon)(pokemonDetails);
        return;
      }
      if (translationX.value < -width * 0.3) {
        translationX.value = withTiming(-width * 2);
        return;
      }
      translationX.value = withTiming(0);
      translationY.value = withTiming(0);
      rotation.value = withTiming(0);
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {translateX: prevTranslationX.value + translationX.value},
      {translateY: prevTranslationY.value + translationY.value},
      {rotate: `${rotation.value}deg`},
    ],
    backgroundColor: interpolateColor(
      translationX.value,
      [-width * 0.7, 0, width * 0.7],
      ['#ff0000', '#fff', '#00ff00'],
    ),
  }));

  if (isLoading) {
    return null;
  }

  if (isError) {
    return <Text>Error</Text>;
  }

  const {sprites, base_experience} = data;

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[
          animatedStyles,
          styles.container,
          {
            top: height * 0.1 + index * 4,
            zIndex: index,
          },
        ]}>
        <Image source={{uri: sprites.front_shiny}} style={styles.sprites} />
        <Text style={styles.name}>{pokemon.name}</Text>
        <Text style={styles.name}>{base_experience}</Text>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    alignSelf: 'center',
    width: width * 0.8,
    height: height * 0.6,
    position: 'absolute',
    top: height * 0.15,
  },
  sprites: {
    width: 300,
    height: 300,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
