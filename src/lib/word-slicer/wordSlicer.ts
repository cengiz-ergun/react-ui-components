export const wordSlicer = (bolderPart: string, word: string): string[] => {
  const index = word.toUpperCase().indexOf(bolderPart.toUpperCase());
  if (index === -1) return [word];
  return [
    word.slice(0, index),
    word.slice(index, index + bolderPart.length),
    word.slice(index + bolderPart.length),
  ].filter((s) => s !== "");
};
