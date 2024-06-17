import {
  mockBaseUrl,
  mockEndpoint,
  mockFilterApi,
  mockFirstPage,
  mockNotFound,
} from "@/__mocks__/mock-data";
import nock from "nock";
import { getItemsService } from "@/services/app-service";
import { mockApi } from "@/__mocks__/mock-type";
import { AppSuccessApiResponse } from "@/types/application";
import { renderMultiSelectComponentWithProvider } from "@/helper/test/renderMultiSelectComponentWithProvider";
import { MultiSelectStarter } from "@/setup/multi-select-starter";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { queryParemeters } from "@/helper/query/query-parameters";
import { FilterInput, ItemsContainer, NotFoundMessage } from "@/helper/test/test-id-constants";

describe("ItemFilter component", () => {
  beforeEach(async () => {
    nock(mockBaseUrl).get(mockEndpoint).reply(200, mockFirstPage);

    const multiSelectStarter = MultiSelectStarter.instance;
    const apiDetails = multiSelectStarter.getApiDetails(mockApi);
    const bookForStore = multiSelectStarter.bookForStore;

    const result = (await getItemsService(apiDetails)) as AppSuccessApiResponse;

    renderMultiSelectComponentWithProvider(result, bookForStore, mockApi);
  });

  it("Filter 'x'", async () => {
    nock(mockBaseUrl)
      .get(mockEndpoint + queryParemeters.queryWithName(1, "x", mockApi))
      .reply(404, mockNotFound);

    await waitFor(() => userEvent.type(screen.getByTestId(FilterInput), "x"));

    // only "not found" div visible
    const itemsContainerElement = await screen.getByTestId(ItemsContainer);
    await waitFor(() => expect(itemsContainerElement.childElementCount).toBe(1)); 
    const notFoundElement = await screen.getByTestId(NotFoundMessage); 
    await expect(notFoundElement).toBeDefined()
  });

  test("Filter 'L'", async () => {
    const input = "L";
    const data = mockFilterApi(input);
    nock(mockBaseUrl)
      .get(mockEndpoint + queryParemeters.queryWithName(1, input, mockApi))
      .reply(200, data);

    await waitFor(() => userEvent.type(screen.getByTestId(FilterInput), input));

    const element = await screen.getByTestId(ItemsContainer);
    await waitFor(() =>
      expect(element.childElementCount).toBe(data.rockBands.length)
    );
    const notFoundElement = await screen.queryByTestId(NotFoundMessage); 
    await expect(notFoundElement).toBeNull()
  });
});
