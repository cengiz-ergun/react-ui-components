"use server";

import { getCharactersService } from "@/services/app-service";
import {
  AppCharacterEntity,
  MappedApiResponseWithDetail,
} from "@/types/application";

export const getCharactersOnDemand = async (
  uri: string
): Promise<MappedApiResponseWithDetail<AppCharacterEntity>> => {
  try {
    const result = await getCharactersService(uri);
    return result;
  } catch (error: unknown) {
    console.error(error);
    throw new Error(`An error occurred: ${error}`);
  }
};
