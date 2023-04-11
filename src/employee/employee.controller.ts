import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './employee.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/auth.entity';
import { GetUser } from '../auth/user.decorator';

@ApiTags('Employee')
@Controller('employee')
export class EmployeeController {
  constructor(
    @Inject(EmployeeService)
    private readonly service: EmployeeService,
  ) {}

  @ApiOperation({ summary: 'Create Employee User' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto, @GetUser() user: User) {
    return this.service.create(createEmployeeDto, user);
  }

  @ApiOperation({ summary: 'Get All Employees' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get()
  async findAll(@GetUser() loggedUser: User): Promise<Employee[]> {
    return this.service.findAll(loggedUser);
  }

  @ApiOperation({ summary: 'Get Employees By Id and Shelter' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number, @GetUser() loggedUser: User): Promise<Employee> {
    return this.service.findByIdAndShelter(id, loggedUser);
  }
}
