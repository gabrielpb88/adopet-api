import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ShelterService } from './shelter.service';
import { CreateShelterDto } from './dto/create-shelter.dto';
import { Shelter } from './shelter.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateShelterDto } from './dto/update-shelter.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/user.decorator';
import { User } from '../auth/auth.entity';

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

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update Shelter' })
  @Put(':id')
  @UseGuards(AuthGuard())
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateShelterDto: UpdateShelterDto,
    @GetUser() user: User,
  ): Promise<Shelter> {
    return this.service.update(id, updateShelterDto, user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Removes a Shelter' })
  @Delete(':id')
  @UseGuards(AuthGuard())
  async remove(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<Shelter> {
    return await this.service.remove(id, user);
  }
}
