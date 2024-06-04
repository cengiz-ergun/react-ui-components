import { useSelectorStore } from "@/providers/selector-store-provider";

export const useSelection = () => {
  const [allItems, selectedItemsIds] = useSelectorStore((state) => [
    state.allItems,
    state.selectedItemsIds,
  ]);

  const selectedData = [
    ...allItems.filter((item) => selectedItemsIds.includes(item.id)),
  ];

  return { selectedData };
};
