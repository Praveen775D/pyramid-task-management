import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";
import { Model } from "mongoose";
import { User, UserDocument } from "../users/schemas/user.schema";
import { Task, TaskDocument } from "../tasks/schemas/task.schema";
import { UpdateProfileDto } from "./dto/update-profile.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async guest() {
    const stamp = Date.now();
    const email = `guest-${stamp}@pyramid.local`;
    const user = await this.userModel.create({
      email,
      name: "Dexter",
      title: "Designer",
      username: `guest${stamp.toString().slice(-6)}`,
      theme: "default",
    });

    await this.taskModel.insertMany([
      { userId: user._id, title: "Write API Documentation", status: "todo", description: "", tags: ["Deployment", "Deployment"], assignee: "Admin", priority: "High", due: "29 Jul" },
      { userId: user._id, title: "Implement Search Function", status: "todo", description: "", tags: ["Deployment", "Deployment"], assignee: "Admin", priority: "High", due: "29 Jul" },
      { userId: user._id, title: "Deploy to Production", status: "todo", description: "", tags: ["Deployment", "Deployment"], assignee: "Admin", priority: "High", due: "29 Jul" },
      { userId: user._id, title: "Code Review Completed", status: "in_progress", description: "", tags: ["Deployment", "Deployment"], assignee: "Admin", priority: "High", due: "29 Jul" },
      { userId: user._id, title: "Design Mockups Finalized", status: "in_progress", description: "", tags: ["Deployment", "Deployment"], assignee: "Admin", priority: "High", due: "29 Jul" },
      { userId: user._id, title: "Feature Testing Passed", status: "done", description: "", tags: ["Testing", "Passed"], assignee: "QA Team", priority: "Medium", due: "30 Jul" },
      { userId: user._id, title: "UI Design Updated", status: "done", description: "", tags: ["Design", "Updated"], assignee: "Designer", priority: "Low", due: "31 Jul" },
      { userId: user._id, title: "Security Audit Scheduled", status: "done", description: "", tags: ["Audit", "Scheduled"], assignee: "Security", priority: "Medium", due: "01 Aug" },
      { userId: user._id, title: "UI Review", status: "on_hold", description: "", tags: ["Review"], assignee: "Designer", priority: "Low", due: "01 Aug" },
      { userId: user._id, title: "Backend Integration", status: "on_hold", description: "", tags: ["Development"], assignee: "Dev Team", priority: "Medium", due: "02 Aug" },
      { userId: user._id, title: "User Feedback", status: "on_hold", description: "", tags: ["Research"], assignee: "Product", priority: "Low", due: "03 Aug" },
      { userId: user._id, title: "Performance Review", status: "on_hold", description: "", tags: ["Optimization"], assignee: "Engineering", priority: "High", due: "04 Aug" },
    ]);

    return this.issueToken(user);
  }

  async me(userId: string) {
    const user = await this.userModel.findById(userId).lean();
    if (!user) throw new UnauthorizedException("User not found");
    return this.serializeUser(user);
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      { ...(dto.name ? { name: dto.name } : {}), ...(dto.title ? { title: dto.title } : {}), ...(dto.username ? { username: dto.username } : {}) },
      { new: true },
    ).lean();

    if (!user) throw new UnauthorizedException("User not found");
    return this.serializeUser(user);
  }

  async issueToken(user: UserDocument) {
    const accessToken = await this.jwtService.signAsync({
      sub: user._id.toString(),
      email: user.email,
    });

    return {
      accessToken,
      user: this.serializeUser(user),
    };
  }

  serializeUser(user: any) {
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
