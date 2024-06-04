import { domainAddress, endpoints } from "@/constants";
import {
  AppCharacterEntity,
  MappedApiResponseWithDetail,
} from "@/types/application";
import { CharacterData } from "@/types/external";
import { mapCharacterFromExternalToApplication } from "@/types/mapping";

export const getCharactersService = async (
  optionalUri: string = "" // optionalUri parameter is will be used by pagination call(server action)
): Promise<MappedApiResponseWithDetail<AppCharacterEntity>> => {
  const data: CharacterData = await httpGetCharacters(5, optionalUri);
  const appCharacterEntities: AppCharacterEntity[] = data.results.map((ce) =>
    mapCharacterFromExternalToApplication(ce)
  );
  const result: MappedApiResponseWithDetail<AppCharacterEntity> = {
    data: appCharacterEntities,
    nextPageUri: data.info.next,
  };
  return result;
};

const httpGetCharacters = async (
  cacheMs: number = 5,
  optionalUri: string = ""
) => {
  const uri = optionalUri || `${domainAddress + endpoints.allCharacters}`;
  const response = await fetch(uri, {
    next: { revalidate: cacheMs },
  });
  const data: CharacterData = await response.json();
  return data;
};
