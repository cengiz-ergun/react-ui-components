import {
  AppErrorApiResponse,
  AppItem,
  AppSuccessApiResponse,
} from "./application";

export interface ExternalItem {}

export interface ItemMapper {
  mapToAppItem: (externalItem: ExternalItem) => AppItem;
}

export interface ResponseMapper {
  mapToAppResponse: (
    jsonResponse: any,
    status: number,
    map: ItemMapper
  ) => AppSuccessApiResponse | AppErrorApiResponse;
}

export type ApiDetailsType = {
  name: string;
  baseUrl: string;
  endpoint: string;
  itemMapper: ItemMapper;
  responseMapper: ResponseMapper;
};

export type ApiDetailsTypeForStore = {
  name: string;
  baseUrl: string;
  endpoint: string;
};

export type ApiDetailsRegistryBook = {
  [k: string]: ApiDetailsType;
};

export type ApiDetailsRegistryBookForStore = {
  [k: string]: ApiDetailsTypeForStore;
};