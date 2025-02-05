import { Response } from 'express';

export const sendResponse = <T>(res: Response, statusCode: number, success: boolean, data?: T, message?: string) => {
  return res.status(statusCode).json({
    success,
    code: statusCode,
    message: message || (success ? 'Success' : 'Error'),
    data: data || null,
  });
};
