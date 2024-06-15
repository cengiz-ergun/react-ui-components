import Image from "next/image";
import { BoldMaker } from "@/lib/utility-components/BoldMaker/BoldMaker";
import { AppItem } from "@/types/application";
import { useState } from "react";

type ViewItemProps = {
  appItem: AppItem;
  index: number;
  dataLength: number;
  selectedItems: AppItem[];
  checkboxHandler: (
    event: React.ChangeEvent<HTMLInputElement>,
    item: AppItem
  ) => void;
};

export const ViewItem = ({
  appItem,
  index,
  dataLength,
  selectedItems,
  checkboxHandler,
}: ViewItemProps) => {
  const [loading, setIsLoading] = useState(true);
  const overlay = loading;
  return (
    <div
      className={`flex flex-row gap-4 p-3 items-center border-[var(--border)] ${
        index !== dataLength - 1 && "border-b-2"
      }`}
      key={appItem.id}
    >
      <input
        id={String(appItem.id)}
        type="checkbox"
        onChange={(event) => checkboxHandler(event, appItem)}
        checked={selectedItems
          .map((si) => si.id)
          .includes(appItem.id)}
      ></input>
      <div className="min-w-[var(--image-size)] h-[var(--image-size)] relative">
        {overlay && <Overlay />}
        <Image
          src={appItem.image}
          alt={appItem.text}
          width={55}
          height={55}
          className={`rounded-xl`}
          onLoad={() => setIsLoading(false)}
        />
      </div>

      <div className="flex flex-col">
        <p className="font-normal">
          <BoldMaker appItem={appItem} />
        </p>
        <p>{appItem.detail} Episodes</p>
      </div>
    </div>
  );
};

const Overlay = () => {
  return (
    <div className="absolute w-[var(--image-size)] h-[var(--image-size)] flex opacity-60 rounded-xl bg-gray-400">
      <Image
        className="m-auto"
        src={"/loading.svg"}
        alt="loading.svg"
        width={35}
        height={35}
        priority={true}
      />
    </div>
  );
};
