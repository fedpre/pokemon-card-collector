import {create} from 'zustand';
import {PokemonDetailsType} from '../types';

interface PokedexState {
  pokemon: PokemonDetailsType[];
  addPokemon: (pokemon: PokemonDetailsType) => void;
}

export const usePokedexStore = create<PokedexState>()(set => ({
  pokemon: [],
  addPokemon: pokemon => set(state => ({pokemon: [...state.pokemon, pokemon]})),
}));
