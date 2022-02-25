import {
  Body,
  ConflictException,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectEntity } from './entities/project.entity';

@Controller('projects')
export class ProjectController {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectRepository: Repository<ProjectEntity>,
  ) {}

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    const project = this.projectRepository.create();
    project.name = createProjectDto.name;
    project.description = createProjectDto.description;
    await this.projectRepository.insert(project);
    return project;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    if (updateProjectDto.name) {
      const sameNameProject = await this.projectRepository.findOne({
        name: updateProjectDto.name,
      });
      if (sameNameProject) {
        throw new ConflictException(
          `The project name "${updateProjectDto.name}" already exists`,
        );
      }
    }
    await this.projectRepository.update(id, {
      name: updateProjectDto.name,
      description: updateProjectDto.description,
    });
  }
}
