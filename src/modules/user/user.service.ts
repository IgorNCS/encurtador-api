import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { DecodedToken } from 'src/auth/dto/login.dto';
import { UserNotFoundException } from './exceptions/not-found.exception';

@Injectable()
export class UserService {
    constructor(
        private readonly clsService: ClsService
    ) {}

    get(): DecodedToken {
        const user = this.clsService.get('user');
        if (!user) throw new UserNotFoundException();
        return user;
    }

    getOrNull() {
        const user = this.clsService.get('user');
        return user;
    }

    create(user: DecodedToken) {
        this.clsService.set('user', user);
    }

    destroy() {
        this.clsService.set('user',undefined);
    }
    HttpException() {}
}
