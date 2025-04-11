import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() body: { name: string; email: string }) {
    const result = await this.usersService.create(body.name, body.email);
    return {
      message: 'User created successfully',
      data: result,
    };
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return {
      message: 'Users fetched successfully',
      data: users,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { name: string; email: string },
  ) {
    const updated = await this.usersService.update(+id, body.name, body.email);
    return {
      message: `User with ID: ${id} updated successfully`,
      data: updated,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.delete(+id);
    return {
      message: `User with ID: ${id} deleted successfully`,
    };
  }
}
