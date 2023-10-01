import { Request, Response } from 'express';

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse() as
      | string
      | {
          message: string;
          error: string;
        };

    console.log(exception);

    response.status(status).json({
      statusCode: status,
      error: exception.name,
      message:
        typeof errorResponse === 'string'
          ? errorResponse
          : errorResponse.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}