import { Body, Controller, Patch, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UsersService } from "./users.service";
import { UpdateThemeDto } from "./dto/update-theme.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Patch("theme")
  updateTheme(@Req() request: any, @Body() dto: UpdateThemeDto) {
    return this.usersService.updateTheme(request.user.sub, dto);
  }
}
