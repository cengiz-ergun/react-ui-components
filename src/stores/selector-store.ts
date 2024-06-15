import {
  AppItem,
  AppErrorApiResponse,
  AppSuccessApiResponse,
  NextPageUri,
} from "@/types/application";
import { createStore } from "zustand/vanilla";
import { devtools } from "zustand/middleware";
import { ApiDetailsRegistryBookForStore } from "@/types/abstract";
import { availableApiDetailsNames } from "@/setup/multi-select-starter";

export type SelectorState = {
  apiDetailsRegistryBookForStore: ApiDetailsRegistryBookForStore;
  activeApiDetailsName: availableApiDetailsNames;

  allItems: AppItem[];
  selectedItems: AppItem[];
  searchedWord: string;
  cachedNotFoundWords: string[];
  apiResponseErrorState: AppErrorApiResponse;
  isItemFilterByNameApiRequestActive: boolean;

  isComponentOpen: boolean;

  nextPageUri: string | null;
};

export type SelectorActions = {
  setItems: (items: AppItem[]) => void; // set data with old data
  setItemsOnFiltering: (items: AppItem[]) => void; // set new data
  addToSelectedItems: (item: AppItem) => void;
  removeFromSelectedItems: (id: number) => void;
  setSearchedWord: (word: string) => void;
  addToCachedNotFoundWords: (word: string) => void;
  removeFromCachedNotFoundWords: (word: string) => void;
  setApiResponseErrorState: ({ status, message }: AppErrorApiResponse) => void;
  refreshApiResponseErrorState: () => void;
  setIsItemFilterByNameApiRequestActive: (sw: boolean) => void;

  setIsComponentOpen: (sw: boolean) => void;

  setNextPageUri: (nextPageUri: NextPageUri) => void;
};

export type SelectorStore = SelectorState & SelectorActions;

export const initSelectorStoreWithData = (
  initial: AppSuccessApiResponse,
  activeApiDetailsName: availableApiDetailsNames,
  apiDetailsRegistryBookForStore: ApiDetailsRegistryBookForStore
): SelectorState => {
  return {
    apiDetailsRegistryBookForStore: apiDetailsRegistryBookForStore,
    activeApiDetailsName: activeApiDetailsName,

    allItems: [...initial.data],
    selectedItems: [],
    searchedWord: "",
    cachedNotFoundWords: [],
    apiResponseErrorState: { status: 0, message: "" },
    isItemFilterByNameApiRequestActive: false,

    isComponentOpen: true,

    nextPageUri: initial.nextPageUri,
  };
};

export const createSelectorStore = (initState: SelectorState) => {
  return createStore<SelectorStore>()(
    devtools(
      // persist(
      (set) => ({
        ...initState,
        setItems: (items: AppItem[]) => {
          set((state) => ({ allItems: [...state.allItems, ...items] }));
        },
        setItemsOnFiltering: (items: AppItem[]) => {
          set((state) => ({ allItems: [...items] }));
        },
        addToSelectedItems: (item: AppItem) => {
          set((state) => ({
            selectedItems: [...state.selectedItems, item],
          }));
        },
        removeFromSelectedItems: (id: number) => {
          set((state) => ({
            selectedItems: [
              ...state.selectedItems.filter((si) => si.id !== id),
            ],
          }));
        },
        setSearchedWord: (word: string) => {
          set((state) => ({
            searchedWord: word,
          }));
        },
        addToCachedNotFoundWords: (word: string) => {
          set((state) => ({
            cachedNotFoundWords: [...state.cachedNotFoundWords, word],
          }));
        },
        removeFromCachedNotFoundWords: (word: string) => {
          set((state) => ({
            cachedNotFoundWords: [
              ...state.cachedNotFoundWords.filter((w) => w !== word),
            ],
          }));
        },
        setApiResponseErrorState: (res: AppErrorApiResponse) => {
          set((state) => ({
            apiResponseErrorState: {
              status: res.status,
              message: res.message,
            },
          }));
        },
        refreshApiResponseErrorState: () => {
          set((state) => ({
            apiResponseErrorState: {
              status: 0,
              message: "",
            },
          }));
        },
        setIsItemFilterByNameApiRequestActive: (sw: boolean) => {
          set((state) => ({
            isItemFilterByNameApiRequestActive: sw,
          }));
        },
        setIsComponentOpen: (sw: boolean) => {
          set((state) => ({
            isComponentOpen: sw,
          }));
        },
        setNextPageUri: (nextPageUri: NextPageUri) => {
          set((state) => ({
            nextPageUri: nextPageUri,
          }));
        },
      })
      // {
      //   name: "selector-storage",
      // }
      // )
    )
  );
};
