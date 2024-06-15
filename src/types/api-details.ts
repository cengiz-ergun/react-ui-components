import { ApiDetailsType, ItemMapper, ResponseMapper } from "./abstract";

export type ApiDetailsProps = {
  apiDetails: ApiDetails;
};

export class ApiDetails implements ApiDetailsType {
  constructor(
    public name: string,
    public baseUrl: string,
    public endpoint: string,
    public itemMapper: ItemMapper,
    public responseMapper: ResponseMapper
  ) {}
}
