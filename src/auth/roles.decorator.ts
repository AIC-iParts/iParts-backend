import { SetMetadata } from '@nestjs/common';
import { UserType } from './user_type.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserType[]) => SetMetadata(ROLES_KEY, roles);
