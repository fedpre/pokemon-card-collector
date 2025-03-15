import {useQuery} from '@tanstack/react-query';
import {Text, StyleSheet, SafeAreaView, ActivityIndicator} from 'react-native';
import {fetchPokemonList} from '../api/queries';
import {PokemonType} from '../types';
import {PokemonCard} from '../components/pokemon-card';

export default function Pokemon() {
  const {data, isLoading, isError} = useQuery({
    queryKey: ['pokemonList'],
    queryFn: fetchPokemonList,
  });

  if (isLoading) {
    return <ActivityIndicator size="large" color="#000" />;
  }

  if (isError) {
    return <Text>Error</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>
      {data?.results.map((pokemon: PokemonType, index: number) => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} index={index} />
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  name: {
    fontSize: 16,
    color: '#333',
  },
});
