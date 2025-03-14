import {useQuery} from '@tanstack/react-query';
import {Text, StyleSheet, SafeAreaView} from 'react-native';
import {fetchPokemonList} from '../api/queries';
import PokemonCard from '../components/PokemonCard';

export interface Pokemon {
  name: string;
  url: string;
}

export default function Pokemon() {
  const {data, isLoading, isError} = useQuery({
    queryKey: ['pokemonList'],
    queryFn: fetchPokemonList,
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Pokemon</Text>
      {data?.results.map((pokemon: Pokemon) => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} />
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
