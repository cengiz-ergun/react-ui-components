import {
  mockBaseUrl,
  mockEndpoint,
  mockFirstPage,
} from "@/__mocks__/mock-data";
import nock from "nock";
import { getItemsService } from "@/services/app-service";
import { mockApi } from "@/__mocks__/mock-type";
import { AppSuccessApiResponse } from "@/types/application";
import { renderMultiSelectComponentWithProvider } from "@/helper/test/renderMultiSelectComponentWithProvider";
import { MultiSelectStarter } from "@/setup/multi-select-starter";
import { screen } from "@testing-library/react";
import { ItemsContainer } from "@/helper/test/test-id-constants";

describe("Multiselect component", () => {
  beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  test("Render ItemSelect component", async () => {
    nock(mockBaseUrl).get(mockEndpoint).reply(200, mockFirstPage);

    const multiSelectStarter = MultiSelectStarter.instance;
    const apiDetails = multiSelectStarter.getApiDetails(mockApi);
    const bookForStore = multiSelectStarter.bookForStore;

    const result = (await getItemsService(apiDetails)) as AppSuccessApiResponse;

    renderMultiSelectComponentWithProvider(result, bookForStore, mockApi);

    const element = screen.getByTestId(ItemsContainer);
    expect(element.childElementCount - 1).toBe(mockFirstPage.rockBands.length); // 'count-1' because there are also LoadMoreData component
  });
});
