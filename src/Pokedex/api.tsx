import { createContext } from 'react'
import { useQuery } from '@tanstack/react-query';

export const SelectedPokemonContext = createContext(1);

export const usePokemonListQuery = () => useQuery({
  queryKey: ['pokemonList'],
  queryFn: () => {
    return fetch('https://pokeapi.co/api/v2/pokemon?limit=10000')
      .then((res) => {
        return res.json()
      })
  }
})

export const useSelectedPokemonQuery = (selectedPokemonId: number) => useQuery({
  queryKey: [`https://pokeapi.co/api/v2/pokemon/${selectedPokemonId}/`],
  queryFn: () => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemonId}/`)
      .then((res) => {
        return res.json()
      })
  }
})