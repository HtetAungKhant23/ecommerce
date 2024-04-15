import { HttpStatus } from '@nestjs/common';

interface IMetaData {
  statusCode: HttpStatus;
  message: string;
}

export interface IResponse {
  _data: Record<string, any> | null;
  _metaData: IMetaData;
}

export interface IException {
  message: string;
  code: number;
  cause?: Error;
  description?: string;
}

export interface IHttpBadRequestExceptionResponse {
  _metaData: {
    message: string;
    code: number;
    description?: string;
    url?: string;
  };
}
