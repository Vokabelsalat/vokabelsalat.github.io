"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

type VisualizationInteractionContextValue = {
  hoveredIds: string[];
  setHoveredIds: Dispatch<SetStateAction<string[]>>;
};

const VisualizationInteractionContext =
  createContext<VisualizationInteractionContextValue | null>(null);

export function VisualizationInteractionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [hoveredIds, setHoveredIds] = useState<string[]>([]);
  const value = useMemo(
    () => ({ hoveredIds, setHoveredIds }),
    [hoveredIds],
  );

  return (
    <VisualizationInteractionContext.Provider value={value}>
      {children}
    </VisualizationInteractionContext.Provider>
  );
}

export function useVisualizationInteraction() {
  const context = useContext(VisualizationInteractionContext);

  if (!context) {
    throw new Error(
      "useVisualizationInteraction must be used inside a VisualizationInteractionProvider",
    );
  }

  return context;
}
