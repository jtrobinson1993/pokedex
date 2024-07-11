import classnames from "classnames";
import "./Screen.css";
import LoadingIndicator from "../../LoadingIndicator/LoadingIndicator";
import { useSelectedPokemonQuery } from "../api.tsx";
import { useAppContext } from "../../AppContext/AppContext.tsx";

export interface ScreenProps {
  onImageLoaded: () => void;
}

export default function Screen({ onImageLoaded }: ScreenProps) {
  const { isImageLoaded } = useAppContext();
  const { data: selectedPokemon, isPending } = useSelectedPokemonQuery();
  const imageSrc =
    selectedPokemon?.sprites?.other["official-artwork"].front_default;

  return (
    <>
      <figure className="screen" aria-live="polite">
        {(isPending || !isImageLoaded) && (
          <div className="pokemon-image__container chromatic-aberration show">
            <LoadingIndicator />
          </div>
        )}
        {!isPending && (
          <picture
            className={classnames(
              "pokemon-image__container",
              isImageLoaded && "show"
            )}
          >
            {imageSrc && (
              <img
                onLoad={onImageLoaded}
                className="pokemon-image chromatic-aberration"
                src={imageSrc}
                alt={`${selectedPokemon.name} sprite`}
                height="100"
              />
            )}
          </picture>
        )}
        <div className="screen__top-dots"></div>
        <div className="screen__bottom-dot"></div>
        <div className="screen__speaker"></div>
      </figure>
    </>
  );
}
