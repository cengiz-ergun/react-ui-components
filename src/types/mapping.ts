import { AppCharacterEntity } from "./application";
import { CharacterEntity } from "./external";

export function mapCharacterFromExternalToApplication(
  characterEntity: CharacterEntity
): AppCharacterEntity {
  const { id, name, image, episode } = characterEntity;
  const appCharacterEntity: AppCharacterEntity = {
    id: id,
    name: name,
    image: image,
    episodeCount: episode.length,
  };
  return appCharacterEntity;
}
