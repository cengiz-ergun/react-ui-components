import { useFiltering } from "../hooks/useFiltering";
import { useCheckboxHandler } from "../hooks/useCheckBoxHandler";
import { useSelectorStore } from "@/providers/selector-store-provider";
import { LoadMoreData } from "../hooks/useLoadMoreData";

export const FilterAndSelectItems = () => {
  const [selectedItemsIds, filterItemsIds] = useSelectorStore((state) => [
    state.selectedItemsIds,
    state.filterItemsIds,
  ]);
  const { filteredData } = useFiltering();
  const { checkboxHandler } = useCheckboxHandler();
  return (
    <div>
      <input
        data-testid="filter"
        type="text"
        onKeyUp={(e) => filterItemsIds((e.target as HTMLInputElement).value)}
      />
      <p>Data Length: {filteredData.length}</p>
      {filteredData.map((characterEntity) => (
        <div key={characterEntity.id}>
          <label htmlFor={String(characterEntity.id)}>
            {characterEntity.name}
          </label>
          <input
            id={String(characterEntity.id)}
            type="checkbox"
            onChange={(event) => checkboxHandler(event, characterEntity.id)}
            checked={selectedItemsIds.includes(characterEntity.id)}
          ></input>
        </div>
      ))}
      <LoadMoreData />
    </div>
  );
};
