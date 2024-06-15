import { ItemMapper, ResponseMapper } from "./abstract";
import { ApiDetails } from "./api-details";

export class ApiDetailsBuilder {
  private api: string;
  private baseUrl!: string;
  private endpoint!: string;
  private itemMapper!: ItemMapper;
  private responseMapper!: ResponseMapper;

  constructor(api: string) {
    this.api = api;
  }

  setBaseUrl(baseUrl: string): ApiDetailsBuilder {
    this.baseUrl = baseUrl;
    return this;
  }

  setEndpoint(endpoint: string): ApiDetailsBuilder {
    this.endpoint = endpoint;
    return this;
  }

  setItemMapper(itemMapper: ItemMapper): ApiDetailsBuilder {
    this.itemMapper = itemMapper;
    return this;
  }

  setResponseMapper(responseMapper: ResponseMapper): ApiDetailsBuilder {
    this.responseMapper = responseMapper;
    return this;
  }

  build(): ApiDetails {
    if (
      !this.api ||
      !this.baseUrl ||
      !this.endpoint ||
      !this.itemMapper ||
      !this.responseMapper
    ) {
      throw new Error("Missing required parameters");
    }
    return new ApiDetails(
      this.api,
      this.baseUrl,
      this.endpoint,
      this.itemMapper,
      this.responseMapper
    );
  }
}
