"use client";

import { useSelectorStore } from "@/providers/selector-store-provider";
import { FilterAndSelectItems } from "./FilterAndSelectItems";
import { SelectedItems } from "./SelectedItems";

export const MultiSelectComponent = () => {
  const allItems = useSelectorStore((state) => state.allItems);
  return (
    <>
      <h2>Hello</h2>
      <p>Im multi select</p>
      {allItems.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-row">
          <FilterAndSelectItems />
          <SelectedItems />
        </div>
      )}
    </>
  );
};
