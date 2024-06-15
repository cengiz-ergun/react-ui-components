import { useSelectorStore } from "@/providers/selector-store-provider";
import { useCheckboxHandler } from "./use-checkbox-handler.hook";
import { ViewItem } from "./ViewItem";

export const ViewItems = () => {
  const [allItems, selectedItems] = useSelectorStore((state) => [
    state.allItems,
    state.selectedItems,
  ]);
  const { checkboxHandler } = useCheckboxHandler();
  const dataLength = allItems.length;

  return allItems.map((appItem, index) => (
    <ViewItem
      key={index}
      appItem={appItem}
      index={index}
      dataLength={dataLength}
      selectedItems={selectedItems}
      checkboxHandler={checkboxHandler}
    />
  ));
};

export default ViewItems;
