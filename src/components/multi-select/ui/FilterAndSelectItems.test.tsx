import { charactersFirstPage } from "@/__mocks__/character";
import { domainAddress, endpoints } from "@/constants";
import { renderMultiSelectComponentWithProvider } from "@/helper/test/renderMultiSelectComponentWithProvider";
import { getCharactersService } from "@/services/app-service";
import userEvent from "@testing-library/user-event";
import nock from "nock";
import { screen } from "@testing-library/react";

describe("Filter and Select Items", () => {
  beforeEach(async () => {
    nock(domainAddress).get(endpoints.allCharacters).reply(200, charactersFirstPage);
    const result = await getCharactersService();
    renderMultiSelectComponentWithProvider(result);
  });

  test("Enter non-existing word to filter", async () => {
    await userEvent.type(screen.getByTestId("filter"), "Cengiz Ergün");
    expect(await screen.findByText(/^Data Length: 0$/)).toBeInTheDocument();
  });

  test("Enter existing word to filter", async () => {
    await userEvent.type(screen.getByTestId("filter"), "Smith");
    expect(await screen.findByText(/^Data Length: 4$/)).toBeInTheDocument();
  });

  test("Enter existing word to filter with all letters uppercase", async () => {
    await userEvent.type(screen.getByTestId("filter"), "SMITH");
    expect(await screen.findByText(/^Data Length: 4$/)).toBeInTheDocument();
  });

  test("Enter existing word to filter with all letters lowercase", async () => {
    await userEvent.type(screen.getByTestId("filter"), "smith");
    expect(await screen.findByText(/^Data Length: 4$/)).toBeInTheDocument();
  });
});
