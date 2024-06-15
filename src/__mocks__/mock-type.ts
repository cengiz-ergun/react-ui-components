// external mock types

import { ExternalItem, ItemMapper, ResponseMapper } from "@/types/abstract";
import { ApiDetailsBuilder } from "@/types/api-details-builder";
import { mockBaseUrl, mockEndpoint } from "./mock-data";
import { AppErrorApiResponse, AppItem } from "@/types/application";

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

const mockItemMapper: ItemMapper = {
  mapToAppItem: function (externalItem: ExternalItem): AppItem {
    const { id, name, logoUrl, songCount } = externalItem as MockEntity;
    const item: AppItem = {
      id: id,
      image: logoUrl,
      text: name,
      detail: songCount.toString(),
    };
    return item;
  },
};

const mockResponseMapper: ResponseMapper = {
  mapToAppResponse(jsonResponse, status, itemMapper) {
    if ((<MockData>jsonResponse).info) {
      const appItems: AppItem[] = (<MockData>jsonResponse).rockBands.map((ce) =>
        itemMapper.mapToAppItem(ce)
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
  },
};

export const mockApi = "mockApi";

export const mockApiDetails = new ApiDetailsBuilder(mockApi)
  .setBaseUrl(mockBaseUrl)
  .setEndpoint(mockEndpoint)
  .setItemMapper(mockItemMapper)
  .setResponseMapper(mockResponseMapper)
  .build();
