import { useQuery } from "@tanstack/react-query";
import { useAppContext } from "../AppContext/AppContext";

const POKEMON_LIST_QUERY_KEY = "listPokemon";
export const usePokemonListQuery = () =>
  useQuery({
    queryKey: [POKEMON_LIST_QUERY_KEY],
    queryFn: () =>
      fetch("https://pokeapi.co/api/v2/pokemon?limit=10000").then((res) =>
        res.json()
      ),
  });

const POKEMON_QUERY_KEY = "getPokemon";
export const useSelectedPokemonQuery = (id?: number) => {
  const { selectedPokemonId } = useAppContext();
  const pokemonId = id ?? selectedPokemonId;

  return useQuery({
    queryKey: [POKEMON_QUERY_KEY, pokemonId],
    queryFn: () =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`).then((res) =>
        res.json()
      ),
  });
};
