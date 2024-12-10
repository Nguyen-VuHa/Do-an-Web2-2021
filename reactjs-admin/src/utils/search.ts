import { IOject } from '~/types/common.type';

export function fuzzySearch<T extends IOject<any>>(
  data: T[],
  searchKey: keyof T,
  searchValue: string,
): T[] {
  const normalizedSearchValue = searchValue.toLowerCase();

  return data.filter((item) => {
    const keyValue = item[searchKey];
    if (typeof keyValue === 'string') {
      const normalizedKeyValue = keyValue.toLowerCase();
      return normalizedKeyValue.includes(normalizedSearchValue); // Tìm kiếm gần đúng
    }
    return false;
  });
}
