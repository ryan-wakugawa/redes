import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getInstance() {
    return {
      instance: process.env.INSTANCE_ID,
    };
  }
}
