import { getCharactersOnDemand } from "@/app/actions";
import { useSelectorStore } from "@/providers/selector-store-provider";

export const LoadMoreData = () => {
  const [nextPageUri, setNextPageUri, setItems, searchedWord, filterItemsIds] =
    useSelectorStore((state) => [
      state.nextPageUri,
      state.setNextPageUri,
      state.setItems,
      state.searchedWord,
      state.filterItemsIds,
    ]);
  const handleLoadMore = async (nextPageUri: string) => {
    const result = await getCharactersOnDemand(nextPageUri);
    setNextPageUri(result.nextPageUri);
    setItems(result.data);
    filterItemsIds(searchedWord); // Because loading more data must trigger filtering again
  };
  return (
    <>
      {nextPageUri && (
        <button onClick={() => handleLoadMore(nextPageUri)}>Load More</button>
      )}
    </>
  );
};
