export const getIdFromUrl = (url: string): number => {
  const result = url.split("/");
  return Number(result[result.length - 2]);
};
