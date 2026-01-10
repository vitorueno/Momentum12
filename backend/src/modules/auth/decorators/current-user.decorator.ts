import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { CurrentUserPayload } from '@/types';

export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): CurrentUserPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
