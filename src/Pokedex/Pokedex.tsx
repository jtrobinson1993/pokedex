import { SyntheticEvent, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import './Pokedex.css'
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

export default function Pokedex() {

  const [selectedPokemonId, setSelectedPokemonId] = useState(1);
  const [selectedPokemonURL, setSelectedPokemonURL] = useState(`https://pokeapi.co/api/v2/pokemon/${selectedPokemonId}/`);
  const [imageLoaded, setImageLoaded] = useState(false);

  const pokemonListQuery = useQuery({
    queryKey: ['pokemonList'],
    queryFn: () => {
      return fetch('https://pokeapi.co/api/v2/pokemon?limit=10000')
        .then((res) => {

          return res.json()
        })
    }
  })

  const selectedPokemonQuery = useQuery({
    queryKey: [selectedPokemonURL],
    queryFn: () => {
      return fetch(selectedPokemonURL)
        .then((res) => {
          return res.json()
        })
    }
  })

  function getPokemon(id: number) {
    setSelectedPokemonId(id);
    setSelectedPokemonURL(pokemonListQuery.data.results[id - 1].url);
  }

  function getPreviousPokemon() {
    setImageLoaded(false);
    getPokemon(selectedPokemonId === 1 ? pokemonListQuery.data.count : selectedPokemonId - 1)
  }

  function getNextPokemon() {
    setImageLoaded(false);
    getPokemon(selectedPokemonId < pokemonListQuery.data.count ? selectedPokemonId + 1 : 1);
  }

  function showPokemon(event: SyntheticEvent) {
    setImageLoaded(true);
  }

  if (pokemonListQuery.error || selectedPokemonQuery.error) return 'An error has occurred: ' + pokemonListQuery.error?.message ?? selectedPokemonQuery.error?.message

  return (
    <>
      <div className='pokedex'>
        <div className='pokedex__head'>
          <div className='pokedex__camera'>
            <div className='pokedex__camera-highlights highlight'></div>
          </div>
          <div className={'pokedex__head-lights ' + ((selectedPokemonQuery.isPending || !imageLoaded) ? 'active' : '')}>
            <div className='pokedex__head-light pokedex__head-light--red'>
              <div className='highlight'></div>
            </div>
            <div className='pokedex__head-light pokedex__head-light--yellow'>
              <div className='highlight'></div>
            </div>
            <div className='pokedex__head-light pokedex__head-light--green'>
              <div className='highlight'></div>
            </div>
          </div>
          <div className='pokedex__head-bottom-edge'></div>
        </div>
        <div className='pokedex__body'>
          <figure className="screen" aria-live='polite'>
            {
              (selectedPokemonQuery.isPending || !imageLoaded) && (
                <div className={'pokemon-image__container chromatic-aberration show'}><LoadingIndicator /></div>
              )
            }
            {
              (!selectedPokemonQuery.isPending) && (
                <picture className={'pokemon-image__container' + (imageLoaded && ' show')}>
                  {
                    selectedPokemonQuery.data?.sprites?.front_default && (

                      <img onLoad={e => showPokemon(e)} className={'pokemon-image chromatic-aberration'} src={selectedPokemonQuery.data.sprites.other['official-artwork'].front_default} alt={selectedPokemonQuery.data.name + ' sprite'} height="100" />
                    )
                  }
                </picture>
              )
            }
            {/* <figcaption className="pokemon-name">{(pokemonListQuery.isPending || selectedPokemonQuery.isPending) ? 'Loading...' : selectedPokemonQuery.data.name.replaceAll('-', ' ')}</figcaption> */}
            <div className='screen__top-dots'></div>
            <div className='screen__bottom-dot'></div>
            <div className='screen__speaker'></div>
          </figure>
          <div className='pokedex-controls'>
            <button className='start-button'></button>
            <div className='central-controls'>
              <button className='central-button-red' onClick={() => getPokemon(1)}><span className='visually-hidden'>reset</span></button>
              <button className='central-button-blue'><span className='visually-hidden'>menu</span></button>
              <button className='central-button-green'><span className='visually-hidden'>green</span></button>
            </div>
            <div className='dpad__container'>
              <div className='dpad__vertical'>
                <button className='dpad__button zoom-in' onClick={getPreviousPokemon}>
                  <span className='visually-hidden'>Zoom In</span>
                </button>
                <button className='dpad__button zoom-out' onClick={getNextPokemon}>
                  <span className='visually-hidden'>Zoom Out</span>
                </button>
              </div>
              <div className='dpad__horizontal'>
                <button className='dpad__button previous-pokemon' onClick={getPreviousPokemon}>
                  <span className='visually-hidden'>Previous Pokemon</span>
                </button>
                <button className='dpad__button next-pokemon' onClick={getNextPokemon}>
                  <span className='visually-hidden'>Next Pokemon</span>
                </button>
              </div>
            </div>
          </div>
          <div className='pokedex__body-outline'>
            <div className='pokedex__body-outline--top'></div>
            <div className='pokedex__body-outline--right'></div>
          </div>
        </div>
        <div className='pokedex__hinge'></div>
        <div className='pokedex__door'></div>
      </div>
      <svg width="0" height="0">
        {/* Credit: https://codepen.io/fand/pen/EgGwjg */}
        <filter id="chromatic-aberration">
          <feColorMatrix type="matrix"
            result="red_"
            values="1 0 0 0 0
              0 0 0 0 0 
              0 0 0 0 0 
              0 0 0 .8 0"/>
          <feOffset in="red_" dx="1" dy="0" result="red" />
          <feColorMatrix type="matrix"
            in="SourceGraphic"
            result="bluegreen_"
            values="0 0 0 0 0
              0 2 0 0 0 
              0 1 0 0 0 
              0 0 0 .5 0"/>
          <feOffset in="bluegreen_" dx="-1" dy="0" result="bluegreen" />
          <feBlend mode="screen" in="red" in2="bluegreen" />

        </filter>
      </svg>
    </>
  )
}




