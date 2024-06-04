import { MultiSelectComponent } from "@/components/multi-select/ui/MultiSelectComponent";
import { SelectorStoreProvider } from "@/providers/selector-store-provider";
import { AppCharacterEntity, MappedApiResponseWithDetail } from "@/types/application";
import { render } from "@testing-library/react";

export const renderMultiSelectComponentWithProvider = (
  data: MappedApiResponseWithDetail<AppCharacterEntity>
) => {
  return render(
    <SelectorStoreProvider data={data}>
      <>
        <h1>Main Page</h1>
        <MultiSelectComponent />
      </>
    </SelectorStoreProvider>
  );
};
