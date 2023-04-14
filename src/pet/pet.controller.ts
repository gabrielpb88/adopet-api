import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { PetService } from './pet.service';
import { Pet } from './pet.entity';
import { UpdatePetDto } from './dto/update-pet.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/user.decorator';
import { User } from '../auth/auth.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../enums/role.enum';

@ApiTags('Pet')
@Controller('pet')
export class PetController {
  constructor(
    @Inject(PetService)
    private readonly service: PetService,
  ) {}

  @ApiOperation({ summary: 'Get all Pets' })
  @Get()
  async getAll(@Query('skip', ParseIntPipe) skip: number, @Query('take', ParseIntPipe) take: number): Promise<Pet[]> {
    return this.service.getAll(skip, take);
  }

  @ApiOperation({ summary: 'Get single Pet by id' })
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<Pet> {
    return await this.service.findById(id);
  }

  @ApiOperation({ summary: 'Creates a new Pet' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(Role.Employee)
  @Post()
  async create(@Body() createPetDto: CreatePetDto, @GetUser() user: User): Promise<Pet> {
    return this.service.create(createPetDto, user);
  }

  @ApiOperation({ summary: 'Update an Pet' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(Role.Employee)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePetDto: UpdatePetDto,
    @GetUser() user: User,
  ): Promise<Pet> {
    return this.service.update(id, updatePetDto, user);
  }

  @ApiOperation({ summary: 'Removes Pet by id' })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Pet> {
    return await this.service.remove(id);
  }
}
