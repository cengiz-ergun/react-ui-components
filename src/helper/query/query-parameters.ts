export const queryParemeters = {
  queryDefault: (page: number) => {
    return `/?page=${page}`;
  },
  queryWithName: (page: number, name: string) => {
    return `/?page=${page}&name=${name}`;
  },
};
