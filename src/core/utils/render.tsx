'use client';

import { createContext, useContext, useState, useEffect } from 'react';

export enum ClientSideAppRenderPhase {
  SSR,
  CSR_First_Visit_Hydrating,
  CSR_Rerender_Hydrated,
}

const ClientSideAppRenderPhaseContext = createContext(ClientSideAppRenderPhase.SSR);

export const useClientSideAppRenderPhase = () => {
  const phase = useContext(ClientSideAppRenderPhaseContext);
  return phase;
};

export default function ClientSideAppRenderPhaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [phase, setPhase] = useState(
    typeof window === 'undefined'
      ? ClientSideAppRenderPhase.SSR
      : ClientSideAppRenderPhase.CSR_First_Visit_Hydrating,
  );

  useEffect(() => {
    setPhase(ClientSideAppRenderPhase.CSR_Rerender_Hydrated);
  }, []);

  return (
    <ClientSideAppRenderPhaseContext.Provider value={phase}>
      {children}
    </ClientSideAppRenderPhaseContext.Provider>
  );
}
