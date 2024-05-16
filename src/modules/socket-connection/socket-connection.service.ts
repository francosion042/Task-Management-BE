import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActiveViewerSocketConnectionType } from 'src/common/types';
import { Repository } from 'typeorm';
import { Project } from '../project/entities/project.entity';

@Injectable()
export class SocketConnectionService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async addProjectActiveViewer(
    projectId: number,
    data: ActiveViewerSocketConnectionType,
  ) {
    try {
      const project = await this.projectRepository.findOneOrFail({
        where: { id: projectId },
      });

      project.activeViewerSocketConnections.push(data);
      await this.projectRepository.save(project);

      return project;
    } catch (error) {
      console.log(error);
    }
  }

  async removeProjectActiveViewer(
    projectId: number,
    data: ActiveViewerSocketConnectionType,
  ) {
    try {
      const project = await this.projectRepository.findOneOrFail({
        where: { id: projectId },
      });

      project.activeViewerSocketConnections =
        project.activeViewerSocketConnections.filter(
          (viewer) => viewer.socketId !== data.socketId,
        );
      await this.projectRepository.save(project);

      return project;
    } catch (error) {
      console.log(error);
    }
  }
}
