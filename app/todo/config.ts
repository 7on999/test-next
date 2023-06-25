export const FiltersSeach = {
  ALL:'ALL',
  COMPLTETED: 'COMPLTETED',
  NOT_COMPLTETED: 'NOT_COMPLTETED'
} as const


export const typeTag = {
  title: 'title',
  description: 'description'
} as const


type ValuesOf<T> = T[keyof T];

export type FilterSearchTypeValues = ValuesOf<typeof FiltersSeach>
export type typeTagValues = ValuesOf<typeof typeTag>