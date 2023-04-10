import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './employee.entity';

@ApiTags('Employee')
@Controller('employee')
export class EmployeeController {
  constructor(
    @Inject(EmployeeService)
    private readonly service: EmployeeService,
  ) {}

  @ApiOperation({ summary: 'Create Employee User' })
  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.service.create(createEmployeeDto);
  }

  @ApiOperation({ summary: 'Get All Employees' })
  @Get()
  async findAll(): Promise<Employee[]> {
    return this.service.findAll();
  }

  @ApiOperation({ summary: 'Get Employees By Id' })
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Employee> {
    return this.service.findById(id);
  }
}
