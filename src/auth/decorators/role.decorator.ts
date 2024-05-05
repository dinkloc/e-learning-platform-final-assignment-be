import { SetMetadata } from '@nestjs/common';
import { AppConfig } from 'src/common/constants/constants';

export const Roles = (roles: string) => SetMetadata(AppConfig.PERMISSION_GUARD, roles);