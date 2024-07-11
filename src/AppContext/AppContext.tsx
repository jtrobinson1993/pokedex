import React from "react";

const AppContext = React.createContext({
  selectedPokemonId: 0,
  isImageLoaded: false,
});

export const useAppContext = () => React.useContext(AppContext);
export const AppProvider = ({
  children,
  ...props
}: React.PropsWithChildren<React.ContextType<typeof AppContext>>) => {
  return <AppContext.Provider value={props}>{children}</AppContext.Provider>;
};
