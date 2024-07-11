import { useState } from 'react'
import './Pokedex.css'
import Screen from './Screen/Screen';
import { usePokemonListQuery, useSelectedPokemonQuery, SelectedPokemonContext } from './api.tsx';

export default function Pokedex() {
  const [selectedPokemonId, setSelectedPokemonId] = useState(1);

  const [imageLoaded, setImageLoaded] = useState(false);

  function getPokemon(id: number) {
    setSelectedPokemonId(id);
  }

  function getPreviousPokemon() {
    setImageLoaded(false);
    getPokemon(selectedPokemonId === 1 ? usePokemonListQuery().data.count : selectedPokemonId - 1)
  }

  function getNextPokemon() {
    setImageLoaded(false);
    getPokemon(selectedPokemonId < usePokemonListQuery().data.count ? selectedPokemonId + 1 : 1);
  }

  if (usePokemonListQuery().error || useSelectedPokemonQuery(selectedPokemonId).error) return 'An error has occurred: ' + usePokemonListQuery().error?.message ?? useSelectedPokemonQuery(selectedPokemonId).error?.message

  return (
    <>
      <SelectedPokemonContext.Provider value={ selectedPokemonId }>
        <div className='pokedex'>
          <div className='pokedex__head'>
            <div className='pokedex__camera'>
              <div className='pokedex__camera-highlights highlight'></div>
            </div>
            <div className={'pokedex__head-lights ' + ((useSelectedPokemonQuery(selectedPokemonId).isPending || !imageLoaded) ? 'active' : '')}>
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
            <Screen />
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
      </SelectedPokemonContext.Provider>
    </>
  )
}




