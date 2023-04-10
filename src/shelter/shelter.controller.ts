import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ShelterService } from './shelter.service';
import { CreateShelterDto } from './dto/create-shelter.dto';
import { Shelter } from './shelter.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateShelterDto } from './dto/update-shelter.dto';

@ApiTags('Shelter')
@Controller('shelter')
export class ShelterController {
  constructor(
    @Inject(ShelterService)
    private readonly service: ShelterService,
  ) {}

  @ApiOperation({ summary: 'Creates a new Shelter with own user' })
  @Post()
  async create(@Body() createShelterDto: CreateShelterDto): Promise<Shelter> {
    return this.service.create(createShelterDto);
  }

  @ApiOperation({ summary: 'Get single Shelter by id' })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Shelter> {
    return this.service.findById(id);
  }

  @ApiOperation({ summary: 'Get all Shelter' })
  @Get()
  async findAll(): Promise<Shelter[]> {
    return this.service.findAll();
  }

  @ApiOperation({ summary: 'Update Shelter' })
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateShelterDto: UpdateShelterDto): Promise<Shelter> {
    return this.service.update(id, updateShelterDto);
  }

  @ApiOperation({ summary: 'Removes a Shelter' })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Shelter> {
    return await this.service.remove(id);
  }
}
