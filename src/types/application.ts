export type MappedApiResponseWithDetail<T> = {
  data: T[];
  nextPageUri: NextPageUri;
};

export type NextPageUri = string | null; // null when last pagination

export type AppCharacterEntity = {
  id: number;
  name: string;
  image: string;
  episodeCount: number;
};
