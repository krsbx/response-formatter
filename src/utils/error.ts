import _ from 'lodash';
import { createCodeStatus } from './common';

export const createBadRequestResponse = (message = 'Bad Request') => ({
  ...createCodeStatus(400),
  message,
});

export const createUnauthorizedResponse = (message = 'Unauthorized') => ({
  ...createCodeStatus(401),
  message,
});

export const createForbiddenResponse = (message = 'Forbidden') => ({
  ...createCodeStatus(403),
  message,
});

export const createNotFoundResponse = (name: string) => ({
  ...createCodeStatus(404),
  message: `${name} not found`,
});

export const createConflictResponse = (
  message: { message: string } | string
) => ({
  ...createCodeStatus(409),
  ...(_.isObject(message) ? { ...message } : { message }),
});
