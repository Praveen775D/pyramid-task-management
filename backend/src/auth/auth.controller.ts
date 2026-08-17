import { Body, Controller, Get, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { UpdateProfileDto } from "./dto/update-profile.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("guest")
  guest() {
    return this.authService.guest();
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  me(@Req() request: any) {
    return this.authService.me(request.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("profile")
  updateProfile(@Req() request: any, @Body() dto: UpdateProfileDto) {
    return this.authService.updateProfile(request.user.sub, dto);
  }
}
