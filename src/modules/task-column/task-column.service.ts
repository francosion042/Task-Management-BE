import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskColumnDto } from './dto/create-task-column.dto';
import { UpdateTaskColumnDto } from './dto/update-task-column.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskColumn } from './entities/task-column.entity';
import { ProjectService } from '../project/project.service';

@Injectable()
export class TaskColumnService {
  constructor(
    @InjectRepository(TaskColumn)
    private taskColumnRepository: Repository<TaskColumn>,
    private readonly projectService: ProjectService,
  ) {}
  async create(createTaskColumnDto: CreateTaskColumnDto) {
    const project = await this.projectService.findOne(
      createTaskColumnDto.projectId!,
    );

    const column = this.taskColumnRepository.create(createTaskColumnDto);

    column.project = project;

    await this.taskColumnRepository.save(column);

    return column;
  }

  findAll(projectId: number) {
    return this.taskColumnRepository.find({
      where: { projectId },
      relations: ['tasks'],
    });
  }

  findOne(id: number) {
    return this.taskColumnRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });
  }

  findOneOrFail(id: number) {
    try {
      return this.taskColumnRepository.findOneOrFail({
        where: { id },
        relations: ['project', 'project.owner'],
      });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateTaskColumnDto: UpdateTaskColumnDto) {
    return `This action updates a #${id} taskColumn`;
  }

  remove(id: number) {
    return `This action removes a #${id} taskColumn`;
  }
}