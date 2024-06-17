import { mockApi, mockApiDetails } from "@/__mocks__/mock-type";
import {
  ApiDetailsRegistryBook,
  ApiDetailsRegistryBookForStore,
} from "../types/abstract";
import { ApiDetails } from "@/types/api-details";
import {
  mortyApi,
  mortyApiDetails,
} from "./external-apis/ricky-and-morty/characters-api/configuration";
import {
  starWarsCharactersApi,
  starWarsCharactersApiDetails,
} from "./external-apis/star-wars/characters-api/new-configuration";

export type availableApiDetailsNames =
  | typeof mortyApi
  | typeof mockApi
  | typeof starWarsCharactersApi;

// Singleton. Because same instance has to be used by "/app/actions.ts" and "/app/page.tsx"
export class MultiSelectStarter {
  static #instance: MultiSelectStarter;

  private constructor() {}

  public static get instance(): MultiSelectStarter {
    if (!MultiSelectStarter.#instance) {
      MultiSelectStarter.#instance = new MultiSelectStarter();
      MultiSelectStarter.#instance.start();
    }

    return MultiSelectStarter.#instance;
  }

  public book: ApiDetailsRegistryBook = {};
  public bookForStore: ApiDetailsRegistryBookForStore = {};

  private start() {
    this.registerApiDetails(mortyApiDetails);
    this.registerApiDetails(mockApiDetails);
    this.registerApiDetails(starWarsCharactersApiDetails);
  }

  private registerApiDetails(apiDetails: ApiDetails) {
    this.book[apiDetails.name] = apiDetails;
    this.bookForStore[apiDetails.name] = {
      name: apiDetails.name,
      baseUrl: apiDetails.baseUrl,
      endpoint: apiDetails.endpoint,
      detailString: apiDetails.detailString,
    };
  }

  public getApiDetails = (apiDetailsName: availableApiDetailsNames) => {
    return this.book[apiDetailsName];
  };
}
