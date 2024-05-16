import { SetMetadata } from '@nestjs/common';

export const IsProjectOwner = (projectIdParam) =>
  SetMetadata('PROJECT_ID_PARAM', projectIdParam);
