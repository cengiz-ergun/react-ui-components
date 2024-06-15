import { wordSlicer } from "@/lib/word-slicer/wordSlicer";
import { useSelectorStore } from "@/providers/selector-store-provider";
import { AppItem } from "@/types/application";

export const BoldMaker = ({
  appItem,
}: {
  appItem: AppItem;
}) => {
  const searchedWord = useSelectorStore((state) => state.searchedWord);

  return (
    <>
      {searchedWord
        ? wordSlicer(searchedWord, appItem.text).map(
            (part, index) => (
              <span
                key={index}
                className={
                  searchedWord.toUpperCase() === part.toUpperCase()
                    ? "font-extrabold"
                    : ""
                }
              >
                {part}
              </span>
            )
          )
        : appItem.text}
    </>
  );
};
