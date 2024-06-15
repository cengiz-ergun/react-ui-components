import { ExternalItem, ItemMapper, ResponseMapper } from "@/types/abstract";
import { AppErrorApiResponse, AppItem } from "@/types/application";
import { CharacterData, CharacterEntity, QueryNotFound } from "./external";
import { ApiDetailsBuilder } from "@/types/api-details-builder";

const mortyResponseMapper: ResponseMapper = {
  mapToAppResponse(jsonResponse, status, itemMapper) {
    if ((<CharacterData>jsonResponse).info) {
      const appItems: AppItem[] = (<CharacterData>jsonResponse).results.map(
        (ce) => itemMapper.mapToAppItem(ce)
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
  },
};

const mortyItemMapper: ItemMapper = {
  mapToAppItem: function (externalItem: ExternalItem): AppItem {
    const { id, name, image, episode } = externalItem as CharacterEntity;
    const item: AppItem = {
      id: id,
      image: image,
      text: name,
      detail: episode.length.toString(),
    };
    return item;
  },
};

export const mortyApi = "mortyApi";

export const mortyApiDetails = new ApiDetailsBuilder(mortyApi)
  .setBaseUrl("https://rickandmortyapi.com/api")
  .setEndpoint("/character")
  .setItemMapper(mortyItemMapper)
  .setResponseMapper(mortyResponseMapper)
  .build();
