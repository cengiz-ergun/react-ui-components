import { useSelectorStore } from "@/providers/selector-store-provider";
import { AppItem } from "@/types/application";

export const useCheckboxHandler = () => {
  const [addToSelectedItems, removeFromSelectedItems] = useSelectorStore(
    (state) => [state.addToSelectedItems, state.removeFromSelectedItems]
  );
  const checkboxHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    item: AppItem
  ) => {
    event.target.checked ? addToSelectedItems(item) : removeFromSelectedItems(item.id);
  };
  return { checkboxHandler };
};