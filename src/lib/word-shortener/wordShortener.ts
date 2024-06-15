export const wordShortener = (text: string, maxAllowedLength: number) => {
  const wordLength = text.length;
  if (wordLength > maxAllowedLength) {
    return `${text.substring(0, maxAllowedLength)}...`;
  }
  return text;
};
