import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { AuthService } from '../auth/auth.service';
import { ShelterService } from '../shelter/shelter.service';
import { User } from '../auth/auth.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @Inject(AuthService)
    private readonly authService: AuthService,
    @Inject(ShelterService)
    private readonly shelterService: ShelterService,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto, loggedUser: User) {
    const { name, phone, email, password } = createEmployeeDto;
    let shelter;
    try {
      shelter = await this.shelterService.findByUserId(loggedUser.id);
    } catch (e) {
      throw new BadRequestException(`Logged user is not related to any shelter`);
    }
    const newUser = await this.authService.signUp({ email, password });
    const employee = this.employeeRepository.create();
    employee.name = name;
    employee.phone = phone;
    employee.shelter = shelter;
    employee.user = newUser;
    await this.employeeRepository.insert(employee);
    return employee;
  }

  async findAll(user: User): Promise<Employee[]> {
    const foundShelter = await this.shelterService.findByUserId(user.id);
    return this.employeeRepository.find({
      where: {
        shelter_id: foundShelter.id,
      },
    });
  }

  async findByIdAndShelter(id: number, loggedUser: User): Promise<Employee> {
    const shelter = await this.shelterService.findByUserId(loggedUser.id);
    const found = await this.employeeRepository.findOneBy({ id, shelter_id: shelter.id });
    if (!found) {
      throw new NotFoundException(`Employee of ${id} was not found`);
    }
    return found;
  }

  async findById(id: number): Promise<Employee> {
    const found = await this.employeeRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Employee of ${id} was not found`);
    }
    return found;
  }
}
