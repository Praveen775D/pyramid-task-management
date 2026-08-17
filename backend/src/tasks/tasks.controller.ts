import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

@UseGuards(JwtAuthGuard)
@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  list(@Req() request: any) {
    return this.tasksService.list(request.user.sub);
  }

  @Post()
  create(@Req() request: any, @Body() dto: CreateTaskDto) {
    return this.tasksService.create(request.user.sub, dto);
  }

  @Patch(":id")
  update(@Req() request: any, @Param("id") id: string, @Body() dto: UpdateTaskDto) {
    return this.tasksService.update(request.user.sub, id, dto);
  }

  @Delete(":id")
  remove(@Req() request: any, @Param("id") id: string) {
    return this.tasksService.remove(request.user.sub, id);
  }
}
