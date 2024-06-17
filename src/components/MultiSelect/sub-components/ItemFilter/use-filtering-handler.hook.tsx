import { GetItemsAction } from "@/app/actions";
import { queryParemeters } from "@/helper/query/query-parameters";
import { useSelectorStore } from "@/providers/selector-store-provider";
import { ApiDetailsTypeForStore } from "@/types/abstract";
import {
  AppErrorApiResponse,
  AppSuccessApiResponse,
} from "@/types/application";

export const useFilteringHandler = () => {
  const [
    setItemsOnFiltering,
    setNextPageUri,
    setSearchedWord,
    addToCachedNotFoundWords,
    cachedNotFoundWords,
    setApiResponseErrorState,
    refreshApiResponseErrorState,
    setIsItemFilterByNameApiRequestActive,
    removeFromCachedNotFoundWords,
    activeApiDetailsName,
    apiDetailsRegistryBookForStore,
  ] = useSelectorStore((state) => [
    state.setItemsOnFiltering,
    state.setNextPageUri,
    state.setSearchedWord,
    state.addToCachedNotFoundWords,
    state.cachedNotFoundWords,
    state.setApiResponseErrorState,
    state.refreshApiResponseErrorState,
    state.setIsItemFilterByNameApiRequestActive,
    state.removeFromCachedNotFoundWords,
    state.activeApiDetailsName,
    state.apiDetailsRegistryBookForStore,
  ]);

  const filteringHandler = async (input: string) => {
    if (
      cachedNotFoundWords.some(
        (word) => input.startsWith(word) && input !== word
      )
    ) {
      setNextPageUri(null);
      setItemsOnFiltering([]);
      return;
    }

    setSearchedWord(input);

    const apiDetailForStore: ApiDetailsTypeForStore =
      apiDetailsRegistryBookForStore[activeApiDetailsName];

    const uri =
      apiDetailForStore.baseUrl +
      apiDetailForStore.endpoint +
      queryParemeters.queryWithName(1, input, activeApiDetailsName); // because page number should be 1 after each filtering

    refreshApiResponseErrorState();
    setIsItemFilterByNameApiRequestActive(true);

    const result = await GetItemsAction(activeApiDetailsName, uri);

    setIsItemFilterByNameApiRequestActive(false);

    const assertedSuccess = result as AppSuccessApiResponse;
    if (assertedSuccess.data) {
      if (cachedNotFoundWords.includes(input)) {
        removeFromCachedNotFoundWords(input);
      }
      setNextPageUri(assertedSuccess.nextPageUri);
      setItemsOnFiltering(assertedSuccess.data);
    } else {
      addToCachedNotFoundWords(input);
      setNextPageUri(null);
      setItemsOnFiltering([]);
      const assertedError = result as AppErrorApiResponse;
      setApiResponseErrorState(assertedError);
    }
  };

  return { filteringHandler };
};
