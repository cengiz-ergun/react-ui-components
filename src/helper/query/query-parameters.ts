import { availableApiDetailsNames } from "@/setup/multi-select-starter";

export const queryParemeters = {
  queryDefault: (page: number) => {
    return `/?page=${page}`;
  },
  queryWithName: (
    page: number,
    name: string,
    apiDetailsName: availableApiDetailsNames
  ) => {
    switch (apiDetailsName) {
      case "mockApi":
      case "mortyApi":
        return `/?page=${page}&name=${name}`;
      case "starWarsCharactersApi":
        return `/?page=${page}&search=${name}`;
      default:
        break;
    }
  },
};
