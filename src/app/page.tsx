import { SelectorStoreProvider } from "@/providers/selector-store-provider";
import { AppSuccessApiResponse } from "@/types/application";
import { MultiSelect } from "@/components/MultiSelect/MultiSelect";
import { getItemsService } from "@/services/app-service";
import { mortyApi } from "@/setup/external-apis/ricky-and-morty-api/configuration";
import {
  MultiSelectStarter,
  availableApiDetailsNames,
} from "@/setup/multi-select-starter";

export default async function Home() {
  const multiSelectStarter = MultiSelectStarter.instance;
  const apiDetails = multiSelectStarter.getApiDetails(mortyApi);
  const bookForStore = multiSelectStarter.bookForStore;

  const result = (await getItemsService(apiDetails)) as AppSuccessApiResponse;

  if (!result.data)
    throw new Error( // it shows error.tsx
      "Probably due to the connection problems between server and external endpoints."
    );
  return (
    <SelectorStoreProvider
      data={result}
      activeApiDetailsName={apiDetails.name as availableApiDetailsNames}
      apiDetailsRegistryBookForStore={bookForStore}
    >
      <div className="py-4">
        <MultiSelect />
      </div>
    </SelectorStoreProvider>
  );
}
