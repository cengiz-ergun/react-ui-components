import { mockApi, mockApiDetails } from "@/__mocks__/mock-type";
import {
  ApiDetailsRegistryBook,
  ApiDetailsRegistryBookForStore,
} from "../types/abstract";
import {
  mortyApi,
  mortyApiDetails,
} from "./external-apis/ricky-and-morty-api/configuration";
import { ApiDetails } from "@/types/api-details";

export type availableApiDetailsNames = typeof mortyApi | typeof mockApi

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
    this.registerApiDetails(mockApiDetails)
  }

  private registerApiDetails(apiDetails: ApiDetails) {
    this.book[apiDetails.name] = apiDetails;
    this.bookForStore[apiDetails.name] = {
      name: apiDetails.name,
      baseUrl: apiDetails.baseUrl,
      endpoint: apiDetails.endpoint,
    };
  }

  public getApiDetails = (apiDetailsName: availableApiDetailsNames) => {
    return this.book[apiDetailsName];
  };
}
