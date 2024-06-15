import { ApiDetails } from "@/types/api-details";
import {
  AppErrorApiResponse,
  AppSuccessApiResponse,
} from "@/types/application";

export const getItemsService = async (
  apiDetails: ApiDetails,
  optionalUri: string = "" // optionalUri parameter is will be used by on-demand call(server action)
): Promise<AppSuccessApiResponse | AppErrorApiResponse> => {
  const { jsonResponse, status } = await httpGet(apiDetails, 5, optionalUri);
  const mappedAppResponse = apiDetails.responseMapper.mapToAppResponse(
    jsonResponse,
    status,
    apiDetails.itemMapper
  );

  return mappedAppResponse;
};

const httpGet = async (
  apiDetails: ApiDetails,
  cacheMs: number = 5,
  optionalUri: string = ""
) => {
  const uri = optionalUri || `${apiDetails.baseUrl + apiDetails.endpoint}`;
  const response = await fetch(uri, {
    next: { revalidate: cacheMs },
  });
  const status = response.status;
  const jsonResponse = await response.json();

  return { jsonResponse, status };
};
