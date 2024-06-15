import { useSelectorStore } from "@/providers/selector-store-provider";
import { useLoadMoreData } from "./use-load-more-data.hook";
import React, { ReactNode } from "react";
import ViewItems from "./sub-components/ViewItems/ViewItems";
import { AnimatedOverlay } from "@/lib/utility-components/Overlay/AnimatedOverlay";
import { ItemsContainer, NotFoundMessage } from "@/helper/test/test-id-constants";

export const ItemSelect = () => {
  const [allItems, apiResponseErrorState, isItemFilterByNameApiRequestActive] =
    useSelectorStore((state) => [
      state.allItems,
      state.apiResponseErrorState,
      state.isItemFilterByNameApiRequestActive,
    ]);
  const { LoadMoreData } = useLoadMoreData();

  const isDataAvailable = allItems.length > 0;

  return (
    <div className="relative mt-4">
      {isItemFilterByNameApiRequestActive && (
        <AnimatedOverlay animationStyle="lds-ellipsis" />
      )}
      <div
        data-testid={ItemsContainer}
        className={`max-h-96 border-2  ${
          isDataAvailable ? "overflow-y-auto" : "overflow-hidden"
        } rounded-xl border-[var(--border)] bg-[var(--bg-items)]`}
      >
        {isDataAvailable ? (
          <>
            <ViewItems />
            <LoadMoreData />
          </>
        ) : (
          <ItemNotFoundWrapper>
            {apiResponseErrorState.message}
          </ItemNotFoundWrapper>
        )}
      </div>
    </div>
  );
};

interface WrapperProps {
  children: ReactNode;
}

const ItemNotFoundWrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div
      data-testid={NotFoundMessage}
      className="w-full h-20 flex justify-center items-center"
    >
      {children}
    </div>
  );
};
