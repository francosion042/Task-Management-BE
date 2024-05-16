import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { ProjectService } from '../project/project.service';
import { UserService } from '../user/user.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    private readonly projectService: ProjectService,
    private readonly userService: UserService,
  ) {}
  async create(createTaskDto: CreateTaskDto) {
    await this.projectService.findOneOrFail(createTaskDto.projectId!);

    const task = this.taskRepository.create(createTaskDto);

    await this.taskRepository.save(task);
    return task;
  }

  findAll() {
    return `This action returns all task`;
  }

  async findAllByProjectId(projectId: number) {
    return await this.taskRepository.findBy({ projectId });
  }

  async findOne(id: number) {
    return await this.taskRepository.findOne({
      where: { id },
      relations: [],
    });
  }

  async findOneOrFail(id: number) {
    try {
      return await this.taskRepository.findOneOrFail({
        where: { id },
        relations: ['project', 'taskColumn'],
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    try {
      const task = await this.taskRepository.findOneOrFail({
        where: { id },
        relations: ['taskColumn'],
      });

      Object.assign(task, updateTaskDto);
      task.updatedAt = new Date();

      await this.taskRepository.save(task);

      return task;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async remove(id: number) {
    const task = await this.taskRepository.findOneOrFail({ where: { id } });

    return await this.taskRepository.remove(task);
  }
}
