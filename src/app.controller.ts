import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  handShake(): { oknasa: string } {
    return { oknasa: 'good to see you' };
  }
}
