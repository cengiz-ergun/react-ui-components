"use server";

import {
  MultiSelectStarter,
  availableApiDetailsNames,
} from "@/setup/multi-select-starter";
import { getItemsService } from "@/services/app-service";
import {
  AppErrorApiResponse,
  AppSuccessApiResponse,
} from "@/types/application";

export const GetItemsAction = async (
  apiDetailName: availableApiDetailsNames,
  uri: string
): Promise<AppSuccessApiResponse | AppErrorApiResponse> => {
  try {
    const multiSelectStarter = MultiSelectStarter.instance;
    const apiDetails = multiSelectStarter.getApiDetails(apiDetailName);
    const result = await getItemsService(apiDetails, uri);
    return result;
  } catch (error: unknown) {
    console.error(error);
    throw new Error(`An error occurred: ${error}`);
  }
};
