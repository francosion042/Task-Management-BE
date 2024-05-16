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
import { TaskColumnService } from './task-column.service';
import { CreateTaskColumnDto } from './dto/create-task-column.dto';
import { UpdateTaskColumnDto } from './dto/update-task-column.dto';
import { BaseResponseDto } from '../../common/dto/base-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IsProjectOwnerGuard } from '../auth/guards/user-permission.guard';

@Controller('projects/:project_id/task-columns')
@UseGuards(JwtAuthGuard)
export class TaskColumnController {
  constructor(private readonly taskColumnService: TaskColumnService) {}

  @Post()
  @UseGuards(IsProjectOwnerGuard)
  async create(
    @Body() createTaskColumnDto: CreateTaskColumnDto,
    @Param('project_id') projectId: number,
  ) {
    createTaskColumnDto.projectId = projectId;
    const column = await this.taskColumnService.create(createTaskColumnDto);

    return new BaseResponseDto(201, 'Task Column Created Successfully', column);
  }

  @Get()
  async findAll(@Param('project_id') projectId: number) {
    const columns = await this.taskColumnService.findAll(projectId);

    return new BaseResponseDto(
      200,
      'Task Columns Fetched Successfully',
      columns,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskColumnService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskColumnDto: UpdateTaskColumnDto,
  ) {
    return this.taskColumnService.update(+id, updateTaskColumnDto);
  }

  @Delete(':id')
  @UseGuards(IsProjectOwnerGuard)
  remove(@Param('id') id: string) {
    return this.taskColumnService.remove(+id);
  }
}
