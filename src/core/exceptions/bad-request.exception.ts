import { HttpException, HttpStatus } from '@nestjs/common';
import {
  IException,
  IHttpBadRequestExceptionResponse,
} from '../interfaces/response.interface';

export class BadRequestException extends HttpException {
  message: string;
  cause: Error;
  description?: string;
  code: number;
  constructor(exception: IException) {
    super(exception.message, HttpStatus.BAD_REQUEST, {
      cause: exception.cause,
      description: exception.description,
    });

    this.message = exception.message;
    this.cause = exception?.cause as Error;
    this.description = exception.description;
    this.code = exception.code;
  }

  generateHttpResponseBody = (
    url?: string,
    message?: string,
  ): IHttpBadRequestExceptionResponse => {
    return {
      _metaData: {
        message: message || this.message,
        description: this.description,
        code: this.code,
        url,
      },
    };
  };
}
