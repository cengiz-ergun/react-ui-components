import { ExternalItem } from "@/types/abstract";
import { NextPageUri } from "@/types/application";

export type StarWarsCharacterData = {
  count: number;
  next: NextPageUri;
  previous: string | null;
  results: StarWarsCharacterItem[];
};

export interface StarWarsCharacterItem extends ExternalItem {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}