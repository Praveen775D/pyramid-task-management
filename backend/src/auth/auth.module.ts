import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { User, UserSchema } from "../users/schemas/user.schema";
import { Task, TaskSchema } from "../tasks/schemas/task.schema";
import { UsersModule } from "../users/users.module";

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Task.name, schema: TaskSchema },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || "development-only-secret",
      signOptions: { expiresIn: "7d" },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
