import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  create(): string {
    return 'This action adds a new cat';
  }

  findAll(): string {
    return 'This action returns all cats';
  }

  findOne(id: number): string {
    return `This action returns a #${id} cat`;
  }
}
