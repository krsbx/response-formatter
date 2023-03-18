import httpStatus from 'http-status';

export const createCodeStatus = (code: number) => ({
  code,
  status: httpStatus[`${code}_NAME`],
});
