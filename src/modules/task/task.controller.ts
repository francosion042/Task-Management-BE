import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BaseResponseDto } from '../../common/dto/base-response.dto';
import { IsProjectOwnerGuard } from '../auth/guards/user-permission.guard';

@Controller('projects/:project_id/tasks')
@UseGuards(JwtAuthGuard, IsProjectOwnerGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @Param('project_id') projectId: number,
  ) {
    createTaskDto.projectId = projectId;
    const task = await this.taskService.create(createTaskDto);

    return new BaseResponseDto(201, 'Task Created Successfully', task);
  }

  @Get()
  async findAll(@Param('project_id') projectId: number) {
    const tasks = await this.taskService.findAllByProjectId(projectId);

    return new BaseResponseDto(
      200,
      'Project Tasks Fetched Successfully',
      tasks,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const task = await this.taskService.findOneOrFail(+id);

    return new BaseResponseDto(
      200,
      'Task Details Retrieved Successfully',
      task,
    );
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const task = await this.taskService.update(+id, updateTaskDto);

    return new BaseResponseDto(200, 'Task Updated  Successfully', task);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.taskService.remove(+id);

    return new BaseResponseDto(200, 'Task Deleted  Successfully');
  }
}
