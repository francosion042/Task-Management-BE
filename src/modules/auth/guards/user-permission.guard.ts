import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Project } from 'src/modules/project/entities/project.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class IsProjectOwnerGuard implements CanActivate {
  constructor(private readonly entityManager: EntityManager) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const userId = request.user.id;
    const projectId = request.params.id;

    const project = (await this.entityManager
      .getRepository('projects')
      .findOneOrFail({ where: { id: projectId } })) as Project;

    return project.ownerId === userId;
  }
}
