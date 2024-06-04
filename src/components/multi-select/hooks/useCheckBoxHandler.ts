import { useSelectorStore } from "@/providers/selector-store-provider";

export const useCheckboxHandler = () => {
  const [addToSelectedItems, removeFromSelectedItems] = useSelectorStore(
    (state) => [state.addToSelectedItems, state.removeFromSelectedItems]
  );
  const checkboxHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    event.target.checked ? addToSelectedItems(id) : removeFromSelectedItems(id);
  };
  return { checkboxHandler };
};
