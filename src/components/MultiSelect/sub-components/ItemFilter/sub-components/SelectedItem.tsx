import { AppItem } from "@/types/application";
import { ForceScrollToStart } from "../use-force-scroll-to-start.hook";
import Image from "next/image";
import { wordShortener } from "@/lib/word-shortener/wordShortener";
import { AllowedLengthOfSelectedItemText } from "@/constants";

interface SelectedItemProps {
  appItem: AppItem;
  index: number;
  removeFromSelectedItems: (id: number) => void;
  buttonIdCreator: (index: number) => string;
  forceScrollToStart: ForceScrollToStart;
}

export const SelectedItem: React.FC<SelectedItemProps> = ({
  appItem,
  index,
  removeFromSelectedItems,
  buttonIdCreator,
  forceScrollToStart,
}) => {
  return (
    <div
      key={appItem.id}
      className="whitespace-nowrap bg-[var(--bg-selected-items)] flex flex-row px-1.5 py-1.5 rounded-xl"
      title={appItem.text}
    >
      <TextProcessor
        text={appItem.text}
        maxAllowedLength={AllowedLengthOfSelectedItemText}
      />
      <button
        id={buttonIdCreator(index)}
        onClick={() => removeFromSelectedItems(appItem.id)}
        className="w-6"
        onFocus={(event) => forceScrollToStart(event, buttonIdCreator)}
      >
        {" "}
        <Image
          src="/close.png"
          width={24}
          height={24}
          alt="close.png"
          priority={true}
        />
      </button>
    </div>
  );
};

const TextProcessor = (props: {
  text: string;
  maxAllowedLength: number;
}) => {
  const uiText = wordShortener(props.text, props.maxAllowedLength);
  return <div>{uiText}</div>;
};
