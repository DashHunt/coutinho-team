export type PaginationParams = {
  page?: number;
  limit?: number;
};

export type PaginatedResult<T> = {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
};

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

export function resolvePagination({ page, limit }: PaginationParams) {
  const resolvedPage = page && page > 0 ? page : DEFAULT_PAGE;
  const resolvedLimit = limit && limit > 0 ? limit : DEFAULT_LIMIT;
  const skip = (resolvedPage - 1) * resolvedLimit;
  return { page: resolvedPage, limit: resolvedLimit, skip, take: resolvedLimit };
}

export async function paginate<T>(
  params: PaginationParams,
  findMany: (args: { skip: number; take: number }) => Promise<T[]>,
  count: () => Promise<number>,
): Promise<PaginatedResult<T>> {
  const { page, limit, skip, take } = resolvePagination(params);
  const [data, total] = await Promise.all([findMany({ skip, take }), count()]);
  return { data, total, page, totalPages: Math.max(1, Math.ceil(total / limit)) };
}
