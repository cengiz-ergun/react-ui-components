import { GetItemsAction } from "@/app/actions";
import { useSelectorStore } from "@/providers/selector-store-provider";
import { AppSuccessApiResponse } from "@/types/application";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const useLoadMoreData = () => {
  const [nextPageUri, setNextPageUri, setItems, activeApiDetailsName] = useSelectorStore((state) => [
    state.nextPageUri,
    state.setNextPageUri,
    state.setItems,
    state.activeApiDetailsName
  ]);

  const LoadMoreData = () => {
    const handleLoadMore = async (nextPageUri: string) => {
      const result = (await GetItemsAction(
        activeApiDetailsName,
        nextPageUri
      )) as AppSuccessApiResponse;
      setNextPageUri(result.nextPageUri);
      setItems(result.data);
    };
    const [scrollTrigger, isInView] = useInView();

    useEffect(() => {
      if (isInView && nextPageUri) {
        handleLoadMore(nextPageUri);
      }
    }, [isInView]);
    return (
      <>
        {nextPageUri && (
          <div className="w-full h-full flex justify-center items-center border-[var(--border)] border-t-2">
            <div className="loader m-2" ref={scrollTrigger}></div>
          </div>
        )}
      </>
    );
  };

  return { LoadMoreData };
};
