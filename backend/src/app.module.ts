import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { TasksModule } from "./tasks/tasks.module";

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/pyramid_assessment",
    ),
    JwtModule.register({
      secret: process.env.JWT_SECRET || "development-only-secret",
      signOptions: { expiresIn: "7d" },
    }),
    AuthModule,
    UsersModule,
    TasksModule,
  ],
})
export class AppModule {}
