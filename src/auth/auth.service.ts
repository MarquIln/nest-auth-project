import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/createUserDTO';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(
        username: string,
        password: string,
    ): Promise<CreateUserDto> {
        const user = await this.userService.findOneByUsername(username);
        if (user && (await bcrypt.compare(password, user.password))) {
            const { ...result } = user;
            return result;
        }
        throw new UnauthorizedException();
    }

    async login(user: User): Promise<any> {
        const payload = {
            username: user.email,
            sub: {
                name: user.name,
            },
        };
        return {
            ...user,
            access_token: this.jwtService.sign(payload),
        };
    }
}
