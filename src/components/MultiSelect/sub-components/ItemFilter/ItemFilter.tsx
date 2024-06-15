import { useSelectorStore } from "@/providers/selector-store-provider";
import { useFilteringHandler } from "./use-filtering-handler.hook";
import Image from "next/image";
import { useForceScrollToStart } from "./use-force-scroll-to-start.hook";
import { ReactNode } from "react";
import { FilterInput } from "@/helper/test/test-id-constants";
import { SelectedItem } from "./sub-components/SelectedItem";
import { SelectedItemsContainer } from "./sub-components/SelectedItemsContainer";

export const ItemFilter = () => {
  const [
    removeFromSelectedItems,
    selectedItems,
    isComponentOpen,
    setIsComponentOpen,
  ] = useSelectorStore((state) => [
    state.removeFromSelectedItems,
    state.selectedItems,
    state.isComponentOpen,
    state.setIsComponentOpen,
  ]);

  const buttonIdCreator = (index: number) => {
    return `si-${index}`; // si - SelectedItem
  };
  const { filteringHandler } = useFilteringHandler();

  const { overflowedContainer, forceScrollToStart } = useForceScrollToStart();
  return (
    <div>
      <Wrapper>
        {selectedItems.length !== 0 && (
          <SelectedItemsContainer reference={overflowedContainer}>
            {selectedItems.map((sui, index) => (
              <SelectedItem
                key={index}
                appItem={sui}
                index={index}
                forceScrollToStart={forceScrollToStart}
                buttonIdCreator={buttonIdCreator}
                removeFromSelectedItems={removeFromSelectedItems}
              />
            ))}
          </SelectedItemsContainer>
        )}
        <InputWrapper>
          <input
            data-testid={FilterInput}
            type="text"
            onChange={(e) =>
              filteringHandler((e.target as HTMLInputElement).value.trim())
            }
            className="w-full disable-outline"
          />
        </InputWrapper>
        <button
          className="min-w-4"
          onClick={() => setIsComponentOpen(!isComponentOpen)}
        >
          {" "}
          <Image
            width={0}
            height={0}
            className="w-full"
            src="/caret-down.png"
            alt="caret-down.png"
          />
        </button>
      </Wrapper>
    </div>
  );
};

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div className="border-2 rounded-xl border-[var(--border)] flex items-center overflow-hidden ps-1 pe-3 min-h-12 gap-2">
      {children}
    </div>
  );
};

const InputWrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div className="grow w-min min-w-[var(--w-input-container)]">
      {children}
    </div>
  );
};
