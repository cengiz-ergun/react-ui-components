import {
  mockBaseUrl,
  mockEndpoint,
  mockFirstPage,
} from "@/__mocks__/mock-data";
import nock from "nock";
import { getItemsService } from "./app-service";
import { mockApiDetails } from "@/__mocks__/mock-type";
import { AppSuccessApiResponse } from "@/types/application";

describe("getItemsService test", () => {
  test("Must fetch data from mock server and apply mapping", async () => {
    nock(mockBaseUrl).get(mockEndpoint).reply(200, mockFirstPage);
    const result = (await getItemsService(
      mockApiDetails
    )) as AppSuccessApiResponse;
    expect(result.data.length).toBe(10);
  });
});
