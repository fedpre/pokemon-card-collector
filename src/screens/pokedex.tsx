import {FlatList, SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {usePokedexStore} from '../store';
import {PokedexCard} from '../components/pokedex-card';

export default function Pokedex() {
  const {pokemon} = usePokedexStore();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={pokemon}
        renderItem={({item}) => <PokedexCard key={item.name} pokemon={item} />}
        ListEmptyComponent={EmptyComponent}
      />
    </SafeAreaView>
  );
}

function EmptyComponent() {
  return (
    <View style={styles.emptyContainer}>
      <Text>No pokemon in your pokedex yet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
