import { Controller, Get, Post, Body, Param, Put, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Patch(':id/earn/:amount')
  earnCoins(@Param('id') id: string, @Param('amount') amount: number) {
    return this.userService.earnCoins(+id, amount);
  }

  @Patch(':id/xp/:amount')
  addXP(@Param('id') id: string, @Param('amount') amount: number) {
    return this.userService.addXP(+id, amount);
  }
}
