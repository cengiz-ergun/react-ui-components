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
import { screen, waitFor } from "@testing-library/react";
import {
  ItemsContainer,
  SelectedItemsContainerTest,
} from "@/helper/test/test-id-constants";
import userEvent from "@testing-library/user-event";

describe("ViewItem Component", () => {
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

  beforeEach(async () => {
    nock(mockBaseUrl).get(mockEndpoint).reply(200, mockFirstPage);

    const multiSelectStarter = MultiSelectStarter.instance;
    const apiDetails = multiSelectStarter.getApiDetails(mockApi);
    const bookForStore = multiSelectStarter.bookForStore;

    const result = (await getItemsService(apiDetails)) as AppSuccessApiResponse;

    renderMultiSelectComponentWithProvider(result, bookForStore, mockApi);
  });

  test("Render ViewItem component. Show checkbox, image, name and details.", async () => {
    const element = screen.getByTestId(ItemsContainer);
    expect(element.childElementCount - 1).toBe(mockFirstPage.rockBands.length);

    const viewItemContainer = element.firstChild;
    expect(viewItemContainer?.childNodes[0].nodeName).toBe("INPUT"); // checkbox
    expect(
      viewItemContainer?.childNodes[1].firstChild?.firstChild?.nodeName
    ).toBe("IMG"); // loading.svg
    expect(viewItemContainer?.childNodes[2].childNodes.length).toBe(2); // name + detail nodes
  });

  test("Select a checkbox and increase selected items", async () => {
    let container = await screen.queryByTestId(SelectedItemsContainerTest);
    await expect(container).toBeNull();

    const element = screen.getByTestId(ItemsContainer);

    // selected items are 1 after first checkbox click
    const viewItemContainer = element.firstChild; // first view item
    const checkBox = viewItemContainer?.childNodes[0];
    await waitFor(() => userEvent.click(checkBox as HTMLElement));
    container = await screen.queryByTestId(SelectedItemsContainerTest);
    await expect(container).toBeDefined();
    await expect(container?.childNodes.length).toBe(1);

    // selected items are 2 after second checkbox click
    const viewItemContainer2 = element.childNodes[1]; // second view item
    const checkBox2 = viewItemContainer2?.childNodes[0];
    await waitFor(() => userEvent.click(checkBox2 as HTMLElement));
    container = await screen.queryByTestId(SelectedItemsContainerTest);
    await expect(container).toBeDefined();
    await expect(container?.childNodes.length).toBe(2);
  });
});
