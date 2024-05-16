import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { Project } from 'src/modules/project/entities/project.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class IsProjectOwnerGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly entityManager: EntityManager,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const projectIdParam = this.reflector.getAllAndOverride<string | undefined>(
      'PROJECT_ID_PARAM',
      [context.getClass(), context.getHandler()],
    );

    const userId = request.user.id;
    let projectId;

    if (!projectIdParam || projectIdParam !== 'id') {
      projectId = request.params.project_id;
    } else {
      projectId = request.params.id;
    }

    const project = (await this.entityManager
      .getRepository('projects')
      .findOneOrFail({ where: { id: projectId } })) as Project;

    return project.ownerId === userId;
  }
}
