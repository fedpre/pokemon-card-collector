export const fetchPokemonList = async () => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1');
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const fetchPokemon = async (url: string) => {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
