"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { shallow } from "zustand/shallow";

import {
  type SelectorStore,
  createSelectorStore,
  initSelectorStoreWithData,
} from "@/stores/selector-store";
import {
  AppCharacterEntity,
  MappedApiResponseWithDetail,
} from "@/types/application";
import { useStoreWithEqualityFn } from "zustand/traditional";

export type SelectorStoreApi = ReturnType<typeof createSelectorStore>;

export const SelectorStoreContext = createContext<SelectorStoreApi | undefined>(
  undefined
);

export interface SelectorStoreProviderProps {
  children: ReactNode;
  data: MappedApiResponseWithDetail<AppCharacterEntity>;
}

export const SelectorStoreProvider = ({
  children,
  data,
}: SelectorStoreProviderProps) => {
  const storeRef = useRef<SelectorStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createSelectorStore(
      initSelectorStoreWithData(data)
    );
  }

  return (
    <SelectorStoreContext.Provider value={storeRef.current}>
      {children}
    </SelectorStoreContext.Provider>
  );
};

export const useSelectorStore = <T,>(
  selector: (store: SelectorStore) => T
): T => {
  const selectorStoreContext = useContext(SelectorStoreContext);

  if (!selectorStoreContext) {
    throw new Error(
      `useSelectorStore must be used within SelectorStoreProvider`
    );
  }

  // return useStore(selectorStoreContext, selector);
  return useStoreWithEqualityFn(selectorStoreContext, selector, shallow);
};
