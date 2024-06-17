import { ExternalItem } from "@/types/abstract";
import { ApiDetails } from "@/types/api-details";
import {
  AppItem,
  AppSuccessApiResponse,
  AppErrorApiResponse,
} from "@/types/application";
import { StarWarsCharacterData, StarWarsCharacterItem } from "./external";
import { getIdFromUrl } from "../helper/getIdFromUrl";

export class StarWarsCharactersApiDetails extends ApiDetails {
  mapToAppItem(externalItem: ExternalItem): AppItem {
    const { url, name, starships } = externalItem as StarWarsCharacterItem;

    const id = getIdFromUrl(url);

    const item: AppItem = {
      id: id,
      text: name,
      detail: starships.length.toString(),
    };

    return item;
  }
  mapToAppResponse(
    jsonResponse: any,
    status: number
  ): AppSuccessApiResponse | AppErrorApiResponse {
    const appItems: AppItem[] = (<StarWarsCharacterData>(
      jsonResponse
    )).results.map((swcd) => this.mapToAppItem(swcd));
    const mappedAppResponse: AppSuccessApiResponse = {
      data: appItems,
      nextPageUri: (<StarWarsCharacterData>jsonResponse).next,
    };
    return mappedAppResponse;
  }
}

export const starWarsCharactersApi = "starWarsCharactersApi";

export const starWarsCharactersApiDetails = new StarWarsCharactersApiDetails(
  starWarsCharactersApi,
  "https://swapi.dev/api",
  "/people",
  "Starships"
);
