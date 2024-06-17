import { availableApiDetailsNames } from "@/setup/multi-select-starter";
import {
  AppErrorApiResponse,
  AppItem,
  AppSuccessApiResponse,
} from "./application";

export interface ExternalItem {}

export type ApiDetailsType = {
  name: availableApiDetailsNames;
  baseUrl: string;
  endpoint: string;
  detailString: string;
  mapToAppItem(externalItem: ExternalItem): AppItem;
  mapToAppResponse(
    jsonResponse: any,
    status: number
  ): AppSuccessApiResponse | AppErrorApiResponse;
};

export type ApiDetailsTypeForStore = {
  name: availableApiDetailsNames;
  baseUrl: string;
  endpoint: string;
  detailString: string;
};

export type ApiDetailsRegistryBook = {
  [k: string]: ApiDetailsType;
};

export type ApiDetailsRegistryBookForStore = {
  [k: string]: ApiDetailsTypeForStore;
};
