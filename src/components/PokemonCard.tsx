import {Dimensions, Image, StyleSheet, Text} from 'react-native';
import {Pokemon} from '../screens/pokemon';
import {useQuery} from '@tanstack/react-query';
import {fetchPokemon} from '../api/queries';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface PokemonCardProps {
  pokemon: Pokemon;
}

const {width, height} = Dimensions.get('screen');

export default function PokemonCard({pokemon}: PokemonCardProps) {
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);

  const {data, isLoading, isError} = useQuery({
    queryKey: ['pokemon', pokemon.url],
    queryFn: () => fetchPokemon(pokemon.url),
  });

  const panGesture = Gesture.Pan()
    .onStart(() => {
      prevTranslationX.value = translationX.value;
      prevTranslationY.value = translationY.value;
    })
    .onUpdate(event => {
      translationX.value = event.translationX;
      translationY.value = event.translationY;
      console.log(event.translationX, event.translationY);
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {translateX: prevTranslationX.value + translationX.value},
      {translateY: prevTranslationY.value + translationY.value},
    ],
  }));

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error</Text>;
  }

  const {sprites, base_experience} = data;

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[animatedStyles, styles.container]}>
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
  },
  sprites: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
