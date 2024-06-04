import { describe, expect, test } from "@jest/globals";
import { getCharactersService } from "./app-service";
import nock from "nock";
import { domainAddress, endpoints } from "@/constants";
import { charactersFirstPage } from "@/__mocks__/character";

describe("getCharactersService test", () => {
  test("getCharactersService must fetch data from mock server which have 20 items on its /character endpoint and after fetching must apply data mapping.", async () => {
    nock(domainAddress).get(endpoints.allCharacters).reply(200, charactersFirstPage);
    const result = await getCharactersService();
    expect(result.data.length).toBe(20);
  });
});
