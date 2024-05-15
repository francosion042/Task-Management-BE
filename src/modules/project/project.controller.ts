import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../user/entities/user.entity';
import { BaseResponseDto } from '../../common/dto/base-response.dto';
import { IsProjectOwnerGuard } from '../auth/guards/user-permission.guard';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async create(
    @Req() request: Request,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    const project = await this.projectService.create(
      createProjectDto,
      <User>request.user,
    );
    return new BaseResponseDto(201, 'Project Created Successfully', project);
  }

  @Get()
  async findAll(@Req() request: Request) {
    const projects = await this.projectService.findAll(<User>request.user);

    return new BaseResponseDto(
      200,
      "User's Projects Fetched Successfully",
      projects,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const project = await this.projectService.findOneOrFail(+id);

    return new BaseResponseDto(200, 'Project Retrieved Successfully', project);
  }

  @Patch(':id')
  @UseGuards(IsProjectOwnerGuard)
  async update(
    @Param('id') id: string,
    @Req() request: Request,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    const project = await this.projectService.update(+id, updateProjectDto);
    return new BaseResponseDto(200, 'Project Updated Successfully', project);
  }
  @Delete(':id')
  @UseGuards(IsProjectOwnerGuard)
  async remove(@Param('id') id: string) {
    await this.projectService.remove(+id);

    return new BaseResponseDto(200, 'Project Deleted Successfully');
  }
}
