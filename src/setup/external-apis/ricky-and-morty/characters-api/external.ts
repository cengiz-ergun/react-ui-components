import { ExternalItem } from "@/types/abstract";

export type QueryNotFound  = {
  error: string;
} 

export type CharacterData = {
  info: Info;
  results: CharacterEntity[];
};

export type Info = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};

export interface CharacterEntity extends ExternalItem {
  id: number;
  name: string;
  status: "unknown" | "Alive" | "Dead";
  species: "Human" | "Alien";
  type: string;
  gender: "Male" | "Female";
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type Origin = {
  name: string;
  url: string;
};

export type Location = {
  name: string;
  url: string;
};
