import { useState } from "react";
import classnames from "classnames";
import "./Pokedex.css";
import Screen from "./Screen/Screen";
import { usePokemonListQuery, useSelectedPokemonQuery } from "./api.tsx";
import { AppProvider } from "../AppContext/AppContext.tsx";
import { DPadButton } from "../DPad/DPadButton.tsx";
import { DPadPair } from "../DPad/DPadPair.tsx";
import { DPadContainer } from "../DPad/DPadContainer.tsx";

export default function Pokedex() {
  const [selectedPokemonId, setSelectedPokemonId] = useState(1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const {
    data: pokemonList,
    isError: hasPokemonListError,
    error: pokemonListError,
  } = usePokemonListQuery();
  const {
    isError: hasSelectedPokemonError,
    error: selectedPokemonError,
    isPending: isSelectedPokemonPending,
  } = useSelectedPokemonQuery(selectedPokemonId);

  function onPreviousButtonClicked() {
    setIsImageLoaded(false);
    if (selectedPokemonId > 1) {
      setSelectedPokemonId(selectedPokemonId - 1);
    } else {
      setSelectedPokemonId(pokemonList?.count);
    }
  }

  function onNextButtonClicked() {
    setIsImageLoaded(false);
    if (selectedPokemonId < pokemonList?.count) {
      setSelectedPokemonId(selectedPokemonId + 1);
    } else {
      setSelectedPokemonId(1);
    }
  }

  function onResetButtonClicked() {
    setIsImageLoaded(false);
    setSelectedPokemonId(1);
  }

  function onImageLoaded() {
    setIsImageLoaded(true);
  }

  if (hasPokemonListError || hasSelectedPokemonError) {
    return (
      <div>
        An error has occurred:{" "}
        {pokemonListError?.message ?? selectedPokemonError?.message}
      </div>
    );
  }

  return (
    <AppProvider
      selectedPokemonId={selectedPokemonId}
      isImageLoaded={isImageLoaded}
    >
      <div className="pokedex">
        <div className="pokedex__head">
          <div className="pokedex__camera">
            <div className="pokedex__camera-highlights highlight"></div>
          </div>
          <div
            className={classnames(
              "pokedex__head-lights",
              (isSelectedPokemonPending || !isImageLoaded) && "active"
            )}
          >
            <div className="pokedex__head-light pokedex__head-light--red">
              <div className="highlight"></div>
            </div>
            <div className="pokedex__head-light pokedex__head-light--yellow">
              <div className="highlight"></div>
            </div>
            <div className="pokedex__head-light pokedex__head-light--green">
              <div className="highlight"></div>
            </div>
          </div>
          <div className="pokedex__head-bottom-edge"></div>
        </div>
        <div className="pokedex__body">
          <Screen onImageLoaded={onImageLoaded} />
          <div className="pokedex-controls">
            <button className="start-button"></button>
            <div className="central-controls">
              <button
                className="central-button-red"
                onClick={onResetButtonClicked}
              >
                <span className="visually-hidden">reset</span>
              </button>
              <button className="central-button-blue">
                <span className="visually-hidden">menu</span>
              </button>
              <button className="central-button-green">
                <span className="visually-hidden">green</span>
              </button>
            </div>
            <DPadContainer>
              <DPadPair direction="vertical">
                <DPadButton
                  className="zoom-in"
                  onClick={onPreviousButtonClicked}
                >
                  Zoom In
                </DPadButton>
                <DPadButton className="zoom-out" onClick={onNextButtonClicked}>
                  Zoom out
                </DPadButton>
              </DPadPair>
              <DPadPair direction="horizontal">
                <DPadButton
                  className="previous-pokemon"
                  onClick={onPreviousButtonClicked}
                >
                  Previous Pokemon
                </DPadButton>
                <DPadButton
                  className="next-pokemon"
                  onClick={onNextButtonClicked}
                >
                  Next Pokemon
                </DPadButton>
              </DPadPair>
            </DPadContainer>
          </div>
          <div className="pokedex__body-outline">
            <div className="pokedex__body-outline--top"></div>
            <div className="pokedex__body-outline--right"></div>
          </div>
        </div>
        <div className="pokedex__hinge"></div>
        <div className="pokedex__door"></div>
      </div>
      <svg width="0" height="0">
        {/* Credit: https://codepen.io/fand/pen/EgGwjg */}
        <filter id="chromatic-aberration">
          <feColorMatrix
            type="matrix"
            result="red_"
            values="1 0 0 0 0
                0 0 0 0 0 
                0 0 0 0 0 
                0 0 0 .8 0"
          />
          <feOffset in="red_" dx="1" dy="0" result="red" />
          <feColorMatrix
            type="matrix"
            in="SourceGraphic"
            result="bluegreen_"
            values="0 0 0 0 0
                0 2 0 0 0 
                0 1 0 0 0 
                0 0 0 .5 0"
          />
          <feOffset in="bluegreen_" dx="-1" dy="0" result="bluegreen" />
          <feBlend mode="screen" in="red" in2="bluegreen" />
        </filter>
      </svg>
    </AppProvider>
  );
}
