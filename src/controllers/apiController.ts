import { Response } from 'express';
import { sendSuccessResponse, sendErrorResponse } from '../utils/responseUtil';

interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

class ApiController {
  public static sendSuccessResponse(res: Response, data?: any): void {
    sendSuccessResponse(res, data);
  }

  public static sendErrorResponse(res: Response, statusCode: number, error: string): void {
    sendErrorResponse(res, statusCode, error);
  }
}

export default ApiController;
