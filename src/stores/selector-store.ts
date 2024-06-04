import {
  AppCharacterEntity,
  MappedApiResponseWithDetail,
  NextPageUri,
} from "@/types/application";
import { createStore } from "zustand/vanilla";
import { devtools } from "zustand/middleware";

export type SelectorState = {
  allItems: AppCharacterEntity[];
  filteredItemsIds: number[];
  selectedItemsIds: number[];
  searchedWord: string;

  nextPageUri: string | null;
};

export type SelectorActions = {
  setItems: (items: AppCharacterEntity[]) => void;
  filterItemsIds: (input: string) => void;
  addToSelectedItems: (id: number) => void;
  removeFromSelectedItems: (id: number) => void;

  setNextPageUri: (nextPageUri: NextPageUri) => void;
};

export type SelectorStore = SelectorState & SelectorActions;

export const initSelectorStoreWithData = (
  initial: MappedApiResponseWithDetail<AppCharacterEntity>
): SelectorState => {
  return {
    allItems: [...initial.data],
    filteredItemsIds: [],
    selectedItemsIds: [],
    searchedWord: "",

    nextPageUri: initial.nextPageUri,
  };
};

export const createSelectorStore = (initState: SelectorState) => {
  return createStore<SelectorStore>()(
    devtools(
      // persist(
      (set) => ({
        ...initState,
        setItems: (items: AppCharacterEntity[]) => {
          set((state) => ({ allItems: [...state.allItems, ...items] }))         
        },
        filterItemsIds: (input: string) => {
          set((state) => ({
            searchedWord: input.toUpperCase(),
            filteredItemsIds: (() => {
              return input.length !== 0
                ? [
                    ...state.allItems
                      .filter((ace) =>
                        ace.name.toUpperCase().includes(input.toUpperCase())
                      )
                      .map((ace) => ace.id),
                  ]
                : [];
            })(),
          }));
        },
        addToSelectedItems: (id: number) => {
          set((state) => ({
            selectedItemsIds: [...state.selectedItemsIds, id],
          }));
        },
        removeFromSelectedItems: (id: number) => {
          set((state) => ({
            selectedItemsIds: [
              ...state.selectedItemsIds.filter((siId) => siId !== id),
            ],
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
