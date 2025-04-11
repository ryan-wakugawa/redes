import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getInstance() {
    const instanceId = process.env.INSTANCE_ID;
    console.log(process.env.INSTANCE_ID)
    return {
      instance: instanceId,
    };
  }
}
