import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { UpdateThemeDto } from "./dto/update-theme.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async updateTheme(userId: string, dto: UpdateThemeDto) {
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      { theme: dto.theme },
      { new: true },
    ).lean();

    if (!user) throw new NotFoundException("User not found");

    return {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      title: user.title,
      username: user.username,
      theme: user.theme,
    };
  }
}
