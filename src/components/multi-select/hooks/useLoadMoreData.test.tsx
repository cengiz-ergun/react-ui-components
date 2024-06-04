import {
  charactersFirstPage,
  charactersSecondPage,
} from "@/__mocks__/character";
import { domainAddress, endpoints } from "@/constants";
import { renderMultiSelectComponentWithProvider } from "@/helper/test/renderMultiSelectComponentWithProvider";
import { getCharactersService } from "@/services/app-service";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import nock from "nock";
import {
  parseUrl,
} from "next/dist/shared/lib/router/utils/parse-url";

describe("LoadMoreData hook", () => {
  test("Fetch data on demand via clicking load more button", async () => {
    nock(domainAddress)
      .get(endpoints.allCharacters)
      .reply(200, charactersFirstPage);
    const result = await getCharactersService();
    const parsedUrl = parseUrl(result.nextPageUri!);
    renderMultiSelectComponentWithProvider(result);
    const element = (await screen.findByText(
      /^Load More$/
    )) as HTMLButtonElement;

    nock(`${parsedUrl.protocol}//${parsedUrl.hostname}`)
      .get(parsedUrl.pathname + parsedUrl.search)
      .reply(200, charactersSecondPage);
    await userEvent.click(element);

    expect(await screen.findByText(/^Data Length: 40$/)).toBeInTheDocument();
  });
});
