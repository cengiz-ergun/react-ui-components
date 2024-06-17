import { ExternalItem } from "@/types/abstract";
import {
  AppItem,
  AppSuccessApiResponse,
  AppErrorApiResponse,
} from "@/types/application";
import { CharacterData, CharacterEntity, QueryNotFound } from "./external";
import { ApiDetails } from "@/types/api-details";

export class MortyApiDetails extends ApiDetails {
  mapToAppItem(externalItem: ExternalItem): AppItem {
    const { id, name, image, episode } = externalItem as CharacterEntity;
    const item: AppItem = {
      id: id,
      image: image,
      text: name,
      detail: episode.length.toString(),
    };
    return item;
  }
  mapToAppResponse(
    jsonResponse: any,
    status: number
  ): AppSuccessApiResponse | AppErrorApiResponse {
    if ((<CharacterData>jsonResponse).info) {
      const appItems: AppItem[] = (<CharacterData>jsonResponse).results.map(
        (ce) => this.mapToAppItem(ce)
      );
      return {
        data: appItems,
        nextPageUri: (<CharacterData>jsonResponse).info.next,
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

export const mortyApi = "mortyApi";

export const mortyApiDetails = new MortyApiDetails(
  mortyApi,
  "https://rickandmortyapi.com/api",
  "/character",
  "Episodes"
);
