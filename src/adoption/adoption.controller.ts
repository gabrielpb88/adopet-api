import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { CreateAdoptionDto } from './dto/create-adoption.dto';
import { User } from '../auth/auth.entity';
import { Adoption } from './adoption.entity';
import { GetUser } from '../auth/user.decorator';
import { AdoptionService } from './adoption.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../enums/role.enum';

@Controller('adoption')
export class AdoptionController {
  constructor(
    @Inject(AdoptionService)
    private readonly service: AdoptionService,
  ) {}

  @ApiOperation({ summary: 'Creates an Adoption' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(Role.Employee)
  @Post()
  async adopt(@Body() dto: CreateAdoptionDto, @GetUser() loggedUser: User): Promise<Adoption> {
    return this.service.adopt(dto, loggedUser);
  }
}
