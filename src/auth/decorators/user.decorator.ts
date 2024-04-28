import { User } from 'src/database/models/user.entity';
import {
    createParamDecorator,
    ExecutionContext,
} from '@nestjs/common';

export const CurrentUser = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext): User => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    },
);