import { useState, useContext } from 'react'
import './Screen.css'
import LoadingIndicator from '../../LoadingIndicator/LoadingIndicator';
import { usePokemonListQuery, useSelectedPokemonQuery, SelectedPokemonContext } from '../api.tsx';

export default function Pokedex() {
  const [imageLoaded, setImageLoaded] = useState(false);

  const selectedPokemon = useSelectedPokemonQuery(useContext(SelectedPokemonContext));

  function showPokemon() {
    setImageLoaded(true);
  }

  if (usePokemonListQuery().error || selectedPokemon.error) return 'An error has occurred: ' + usePokemonListQuery().error?.message ?? selectedPokemon.error?.message

  return (
    <>
      <figure className="screen" aria-live='polite'>
        {
          (selectedPokemon.isPending || !imageLoaded) && (
            <div className={'pokemon-image__container chromatic-aberration show'}><LoadingIndicator /></div>
          )
        }
        {
          (!selectedPokemon.isPending) && (
            <picture className={'pokemon-image__container' + (imageLoaded && ' show')}>
              {
                selectedPokemon.data?.sprites?.front_default && (

                  <img onLoad={() => showPokemon()} className={'pokemon-image chromatic-aberration'} src={selectedPokemon.data.sprites.other['official-artwork'].front_default} alt={selectedPokemon.data.name + ' sprite'} height="100" />
                )
              }
            </picture>
          )
        }
        <div className='screen__top-dots'></div>
        <div className='screen__bottom-dot'></div>
        <div className='screen__speaker'></div>
      </figure>
    </>
  )
}




