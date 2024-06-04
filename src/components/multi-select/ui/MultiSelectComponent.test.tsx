import { screen } from "@testing-library/react";
import { domainAddress, endpoints } from "@/constants";
import { charactersFirstPage } from "@/__mocks__/character";
import nock from "nock";
import { getCharactersService } from "@/services/app-service";
import { renderMultiSelectComponentWithProvider } from "@/helper/test/renderMultiSelectComponentWithProvider";

describe("MultiSelect Component", () => {
  test("Send data to zustand state and render multi-select component with correct data length in it", async () => {
    nock(domainAddress).get(endpoints.allCharacters).reply(200, charactersFirstPage);
    const result = await getCharactersService();
    renderMultiSelectComponentWithProvider(result);
    expect(await screen.findByText(/^Data Length: 20$/)).toBeInTheDocument();
  });
});
