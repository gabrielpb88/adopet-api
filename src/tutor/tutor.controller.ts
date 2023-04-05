import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { TutorService } from './tutor.service';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutor.dto';
import { Tutor } from './tutor.entity';

@Controller('tutor')
export class TutorController {
  constructor(private readonly tutorService: TutorService) {}

  @Post()
  async create(@Body() createTutorDto: CreateTutorDto): Promise<Tutor> {
    return this.tutorService.create(createTutorDto);
  }

  @Get()
  async findAll(): Promise<Tutor[]> {
    return this.tutorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Tutor> {
    return this.tutorService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateTutorDto: UpdateTutorDto): Promise<Tutor> {
    return this.tutorService.update(id, updateTutorDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Tutor> {
    return await this.tutorService.remove(id);
  }
}
