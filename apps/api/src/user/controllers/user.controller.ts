import { Body, Controller, Get, UseGuards, Put, Query, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AllUsersDto, ChangeUserRoleDto, EditProfileDto, OnboardUserDto } from '../dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { UserService } from '../services';
import { User } from '../entities';
import { CurrentUser } from '../../auth/decorators';
import { AbilityGuard } from '../../ability/ability.guard';
import { CheckAbilities } from '../../ability/ability.decorator';
import { Action } from '../../ability/ability.factory';
import { PaginationDto } from '../../common/dto';

@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {}

  //TODO: There issue with both whoami and onboard route may in @currentuser decorator
  // Or in JWT startegy
  @ApiOkResponse({ type: User })
  @Get('/whoami')
  @UseGuards(AuthGuard())
  whoAmI(@CurrentUser() user: User) {
    return { user };
  }

  @ApiOkResponse({ type: User })
  @Put('/onboard')
  @UseGuards(AuthGuard())
  onboard(@CurrentUser() user: User, @Body() body: OnboardUserDto) {
    return this.usersService.onboard(user, body);
  }

  @ApiOkResponse({ type: User })
  @Put('/profile/edit')
  @UseGuards(AuthGuard())
  editProfile(@CurrentUser() user: User, @Body() body: EditProfileDto) {
    return this.usersService.editProfile(user, body);
  }

  // Internal User Controllers
  @ApiOkResponse({ type: AllUsersDto })
  @Get('/admin/users')
  @UseGuards(AuthGuard(), AbilityGuard)
  @CheckAbilities({ action: Action.Manage, subject: User })
  getAllUsers(@Query() query: PaginationDto): Promise<AllUsersDto> {
    return this.usersService.getAllUsers(query);
  }

  @ApiOkResponse({ type: User })
  @Put('/admin/:userId/change-role')
  @UseGuards(AuthGuard())
  @CheckAbilities({ action: Action.Manage, subject: User })
  changeUserRole(@Param('userId') userId: string, @Body() body: ChangeUserRoleDto) {
    return this.usersService.changeUserRole(userId, body);
  }
}
