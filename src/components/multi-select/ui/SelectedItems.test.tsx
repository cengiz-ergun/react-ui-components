import { charactersFirstPage } from "@/__mocks__/character";
import { domainAddress, endpoints } from "@/constants";
import { renderMultiSelectComponentWithProvider } from "@/helper/test/renderMultiSelectComponentWithProvider";
import { getCharactersService } from "@/services/app-service";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import nock from "nock";

describe("Selected Items", () => {
  beforeEach(async () => {
    nock(domainAddress).get(endpoints.allCharacters).reply(200, charactersFirstPage);
    const result = await getCharactersService();
    renderMultiSelectComponentWithProvider(result);
  });

  test("No selection", async () => {
    const shouldBe = screen.getByTestId("no-items-selected");
    expect(shouldBe).toBeInTheDocument();
  });

  test("Select Rick Sanchez", async () => {
    const element = await screen.findByText(/^Rick Sanchez$/);

    await userEvent.click(element.parentNode?.lastChild as HTMLInputElement);

    const shouldBe = screen.getByTestId("selected-items-container");
    expect(shouldBe).toBeInTheDocument();
  });
});
