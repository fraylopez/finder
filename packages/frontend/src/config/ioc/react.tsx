import React from "react";
import { MapContainer } from "./MapContainer";

const ContainerContext = React.createContext<MapContainer | null>(null);

const ContainerProvider = ({ c, children }: any) => {
  return <ContainerContext.Provider value={c}>{children}</ContainerContext.Provider>;
};

const useContainer = (): MapContainer => {
  const c = React.useContext(ContainerContext);

  if (!c) throw new Error("useContainer must be used within a ContainerProvider");

  return c;
};

export { useContainer, ContainerProvider, ContainerContext };
