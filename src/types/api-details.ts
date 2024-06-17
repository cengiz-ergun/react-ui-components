import { availableApiDetailsNames } from "@/setup/multi-select-starter";
import {
  ApiDetailsType,
  ExternalItem,
} from "./abstract";
import {
  AppErrorApiResponse,
  AppItem,
  AppSuccessApiResponse,
} from "./application";

export type ApiDetailsProps = {
  apiDetails: ApiDetails;
};

export abstract class ApiDetails implements ApiDetailsType {
  public name: availableApiDetailsNames;
  public baseUrl: string;
  public endpoint: string;
  public detailString: string;

  constructor(
    name: availableApiDetailsNames,
    baseUrl: string,
    endpoint: string,
    detailString: string
  ) {
    this.name = name;
    this.baseUrl = baseUrl;
    this.endpoint = endpoint;
    this.detailString = detailString;
  }

  abstract mapToAppItem(externalItem: ExternalItem): AppItem;
  abstract mapToAppResponse(
    jsonResponse: any,
    status: number
  ): AppSuccessApiResponse | AppErrorApiResponse;
}
