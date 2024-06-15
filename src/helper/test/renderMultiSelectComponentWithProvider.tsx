import { MultiSelect } from "@/components/MultiSelect/MultiSelect";
import { SelectorStoreProvider } from "@/providers/selector-store-provider";
import { availableApiDetailsNames } from "@/setup/multi-select-starter";
import { ApiDetailsRegistryBookForStore } from "@/types/abstract";
import { AppSuccessApiResponse } from "@/types/application";
import { render } from "@testing-library/react";

export const renderMultiSelectComponentWithProvider = (
  data: AppSuccessApiResponse,
  bookForStore: ApiDetailsRegistryBookForStore,
  apiDetailsName: availableApiDetailsNames
) => {
  return render(
    <SelectorStoreProvider
      data={data}
      apiDetailsRegistryBookForStore={bookForStore}
      activeApiDetailsName={apiDetailsName}
    >
      <>
        <MultiSelect />
      </>
    </SelectorStoreProvider>
  );
};
