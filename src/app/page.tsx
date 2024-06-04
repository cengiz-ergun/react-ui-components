import { getCharactersService } from "@/services/app-service";
import { MultiSelectComponent } from "@/components/multi-select/ui/MultiSelectComponent";
import { SelectorStoreProvider } from "@/providers/selector-store-provider";

export default async function Home() {
  const result = await getCharactersService();
  return (
    <SelectorStoreProvider data={result}>
      <>
        <h1>Main Page</h1>
        <MultiSelectComponent />
      </>
    </SelectorStoreProvider>
  );
}
