import { useSelectorStore } from "@/providers/selector-store-provider";

export const useFiltering = () => {
  const [filteredItemsIds, allItems, searchedWord] = useSelectorStore(
    (state) => [state.filteredItemsIds, state.allItems, state.searchedWord]
  );
  const filteredData =
    filteredItemsIds.length > 0
      ? [...allItems.filter((item) => filteredItemsIds.includes(item.id))]
      : searchedWord.length > 0
      ? []
      : [...allItems];
  return { filteredData };
};
