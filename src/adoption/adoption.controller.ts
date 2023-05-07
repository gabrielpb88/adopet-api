import { Body, Controller, Delete, Inject, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CreateAdoptionDto } from './dto/create-adoption.dto';
import { User } from '../auth/auth.entity';
import { Adoption } from './adoption.entity';
import { GetUser } from '../auth/user.decorator';
import { AdoptionService } from './adoption.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../enums/role.enum';

@ApiTags('Adoption')
@Controller('adoption')
export class AdoptionController {
  constructor(
    @Inject(AdoptionService)
    private readonly service: AdoptionService,
  ) {}

  @ApiOperation({ summary: 'Creates an Adoption' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(Role.ShelterAdmin)
  @Post()
  async adopt(@Body() dto: CreateAdoptionDto, @GetUser() loggedUser: User): Promise<Adoption> {
    return this.service.adopt(dto, loggedUser);
  }

  @ApiOperation({ summary: 'Removes the Adoption' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(Role.ShelterAdmin)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<void> {
    return this.service.remove(id, user);
  }
}
