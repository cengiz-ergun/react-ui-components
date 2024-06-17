// external mock types

import { ExternalItem } from "@/types/abstract";
import { mockBaseUrl, mockEndpoint } from "./mock-data";
import {
  AppErrorApiResponse,
  AppItem,
  AppSuccessApiResponse,
} from "@/types/application";
import { ApiDetails } from "@/types/api-details";

type MockData = {
  info: Info;
  rockBands: MockEntity[];
};

type Info = {
  next: string | null;
};

interface MockEntity extends ExternalItem {
  id: number;
  logoUrl: string;
  name: string;
  members: number;
  songCount: number;
  topSongs: string[];
}

export type QueryNotFound = {
  error: string;
};

// configuration

export class MockApiDetails extends ApiDetails {
  mapToAppItem(externalItem: ExternalItem): AppItem {
    const { id, name, logoUrl, songCount } = externalItem as MockEntity;
    const item: AppItem = {
      id: id,
      image: logoUrl,
      text: name,
      detail: songCount.toString(),
    };
    return item;
  }
  mapToAppResponse(
    jsonResponse: any,
    status: number
  ): AppSuccessApiResponse | AppErrorApiResponse {
    if ((<MockData>jsonResponse).info) {
      const appItems: AppItem[] = (<MockData>jsonResponse).rockBands.map((ce) =>
        this.mapToAppItem(ce)
      );
      return {
        data: appItems,
        nextPageUri: (<MockData>jsonResponse).info.next,
      };
    } else if ((<QueryNotFound>jsonResponse).error) {
      const mappedErrorApiResponse: AppErrorApiResponse = {
        message: (<QueryNotFound>jsonResponse).error,
        status: status,
      };
      return mappedErrorApiResponse;
    } else {
      throw Error("Not Implemented");
    }
  }
}

export const mockApi = "mockApi";

export const mockApiDetails = new MockApiDetails(
  mockApi,
  mockBaseUrl,
  mockEndpoint,
  "Mocks"
);
