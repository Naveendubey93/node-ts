import { Response } from 'express';

interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export function sendSuccessResponse(res: Response, statusCode: number, data?: any): void {
  const response: ApiResponse = {
    success: true,
    data: data,
  };
  res.status(statusCode).json(response);
}

export function sendErrorResponse(res: Response, statusCode: number, error: string): void {
  const response: ApiResponse = {
    success: false,
    error: error,
  };
  res.status(statusCode).json(response);
}
