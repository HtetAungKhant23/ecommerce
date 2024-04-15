import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  handShake() {
    return { oknasa: 'good to see you' };
  }
}
