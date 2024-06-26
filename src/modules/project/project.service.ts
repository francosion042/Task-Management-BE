import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}
  async create(createProjectDto: CreateProjectDto, user: User) {
    const project = this.projectRepository.create(createProjectDto);

    project.owner = user;
    await this.projectRepository.save(project);

    return project;
  }

  async findAll(user: User) {
    return await this.projectRepository.findBy({ ownerId: user.id });
  }

  async findOneOrFail(id: number) {
    try {
      return await this.projectRepository.findOneOrFail({
        where: { id },
        relations: ['owner'],
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    try {
      const project = await this.projectRepository.findOneOrFail({
        where: { id },
      });

      Object.assign(project, updateProjectDto);
      project.updatedAt = new Date();

      await this.projectRepository.save(project);

      return project;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async remove(id: number) {
    const project = await this.projectRepository.findOneOrFail({
      where: { id },
    });
    return await this.projectRepository.remove(project);
  }
}
