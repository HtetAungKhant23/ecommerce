import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  handShake(): { oknasa: string } {
    console.log({ oknasa: 'good to see you' });
    return { oknasa: 'good to see you' };
  }
}
