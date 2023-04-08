import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { PetService } from './pet.service';
import { Pet } from './pet.entity';
import { UpdatePetDto } from './dto/update-pet.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Pet')
@Controller('pet')
export class PetController {
  constructor(
    @Inject(PetService)
    private readonly service: PetService,
  ) {}

  @ApiOperation({ summary: 'Get all Pets' })
  @Get()
  async getAll(): Promise<Pet[]> {
    return this.service.getAll();
  }

  @ApiOperation({ summary: 'Get single Pet by id' })
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<Pet> {
    return await this.service.findById(id);
  }

  @ApiOperation({ summary: 'Creates a new Pet' })
  @Post()
  async create(@Body() createPetDto: CreatePetDto): Promise<Pet> {
    return this.service.create(createPetDto);
  }

  @ApiOperation({ summary: 'Update an Pet' })
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updatePetDto: UpdatePetDto): Promise<Pet> {
    return this.service.update(id, updatePetDto);
  }

  @ApiOperation({ summary: 'Removes Pet by id' })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Pet> {
    return await this.service.remove(id);
  }
}
