/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CommentService } from 'src/comment/comment.service';
import { CreateUserDto, UpdateUserDto } from './dto/createUserDTO';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly commentService: CommentService,
    ) {}
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.userService.findOne(id);
    }

    @Post()
    createUser(@Body() CreateUserDto: CreateUserDto) {
        return this.userService.createUser(CreateUserDto);
    }

    @Get(':id/comments')
    getUserComments(@Param('id') id: string) {
        return this.commentService.findUserComments(id);
    }

    @Put(':id')
    updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateUser(id, updateUserDto);
    }
}
