import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AppConfig } from "src/common/constants/constants";

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
    ) { }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const routePermissions = this.reflector.get<string>(
            AppConfig.PERMISSION_GUARD,
            context.getHandler(),
        );

        const { user } = context.switchToHttp().getRequest();
        if (!user) {
            throw new ForbiddenException();
        }

        if (user.role === AppConfig.ADMIN) return true;
        throw new ForbiddenException();

    }
}