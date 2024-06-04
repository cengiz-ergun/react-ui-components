import { useSelection } from "../hooks/useSelection";
import { useSelectorStore } from "@/providers/selector-store-provider";

export const SelectedItems = () => {
  const removeFromSelectedItems = useSelectorStore(
    (state) => state.removeFromSelectedItems
  );
  const { selectedData } = useSelection();
  return (
    <div>
      <h2>hUHU</h2>
      {selectedData.length === 0 ? (
        <div data-testid="no-items-selected">No selected</div>
      ) : (
        <div data-testid="selected-items-container">
          {selectedData.map((sui) => (
            <div key={sui.id}>
              {sui.id}-{sui.name}{" "}
              <button
                className="bg-black text-white"
                onClick={() => removeFromSelectedItems(sui.id)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
