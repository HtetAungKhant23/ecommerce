import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { BadRequestException } from '../exceptions/bad-request.exception';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(BadRequestException.name);

  catch(exception: BadRequestException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    this.logger.debug(exception + ' url: ' + request.url);
    const response = ctx.getResponse();
    const httpStatus = exception.getStatus();
    const responseBody = exception.generateHttpResponseBody();
    response.status(httpStatus).json(responseBody);
  }
}
