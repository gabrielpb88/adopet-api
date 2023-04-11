import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { TutorService } from './tutor.service';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutor.dto';
import { Tutor } from './tutor.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/user.decorator';
import { User } from '../auth/auth.entity';

@ApiTags('Tutor')
@Controller('tutor')
export class TutorController {
  constructor(private readonly tutorService: TutorService) {}

  @ApiOperation({ summary: 'Creates a new Tutor' })
  @Post()
  async create(@Body() createTutorDto: CreateTutorDto): Promise<Tutor> {
    return this.tutorService.create(createTutorDto);
  }

  @ApiOperation({ summary: 'Get all tutors' })
  @Get()
  async findAll(): Promise<Tutor[]> {
    return this.tutorService.findAll();
  }

  @ApiOperation({ summary: 'Get single tutor by id' })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Tutor> {
    return this.tutorService.findOne(id);
  }

  @ApiOperation({ summary: 'Update the tutor logged in' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Put()
  async update(@Body() updateTutorDto: UpdateTutorDto, @GetUser() user: User): Promise<Tutor> {
    return this.tutorService.update(user.id, updateTutorDto);
  }

  @ApiOperation({ summary: 'Removes tutor logged in' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Delete()
  async remove(@GetUser() user: User): Promise<Tutor> {
    return await this.tutorService.remove(user.id);
  }
}
