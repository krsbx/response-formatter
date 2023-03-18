import type { Request } from 'express';
import _ from 'lodash';
import { createCodeStatus } from './common';

export const createResourceResponse = <T>(req: Request, data: T) => ({
  ...createCodeStatus(req.statusCode ?? 200),
  data: data as Awaited<T>,
});

export const createResourcesResponse = <
  T extends { count: number; rows: unknown[] }
>(
  req: Request,
  data: T
) => {
  const limit = +(req.query.limit === 'all'
    ? 1
    : _.get(req.query, 'limit', 10));
  const page = +_.get(req.query, 'page', 0);
  const offset = page > 0 ? limit * (page - 1) : 0;
  const totalData = +_.get(data, 'count', 0);
  const queriedData = _.get(data, 'rows', []) as T['rows'];
  const dataSize = queriedData.length < limit ? queriedData.length : limit;

  return {
    ...createCodeStatus(req.statusCode ?? 200),
    data: queriedData,
    page: {
      size: dataSize,
      total: totalData,
      totalPages: totalData > limit ? totalData / limit : totalData,
      current: offset + 1,
    },
  };
};
