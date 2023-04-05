import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { PetService } from './pet.service';
import { Pet } from './pet.entity';
import { UpdatePetDto } from './dto/update-pet.dto';

@Controller('pet')
export class PetController {
  constructor(
    @Inject(PetService)
    private readonly service: PetService,
  ) {}

  @Get()
  async getAll(): Promise<Pet[]> {
    return this.service.getAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<Pet> {
    return await this.service.findById(id);
  }

  @Post()
  async create(@Body() createPetDto: CreatePetDto): Promise<Pet> {
    return this.service.create(createPetDto);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updatePetDto: UpdatePetDto): Promise<Pet> {
    return this.service.update(id, updatePetDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Pet> {
    return await this.service.remove(id);
  }
}
