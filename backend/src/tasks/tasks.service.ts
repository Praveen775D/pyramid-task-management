import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Task, TaskDocument } from "./schemas/task.schema";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>) {}
  async list(userId: string) { const items = await this.taskModel.find({ userId }).sort({ createdAt: -1 }).lean(); return items.map(this.serializeTask); }
  async create(userId: string, dto: CreateTaskDto) {
    const task = await this.taskModel.create({ userId, title: dto.title, description: dto.description || "", tags: dto.tags || ["Deployment"], assignee: dto.assignee || "Admin", priority: dto.priority || "High", due: dto.due || "12 Sep 2026", status: "todo" });
    return this.serializeTask(task);
  }
  async update(userId: string, id: string, dto: UpdateTaskDto) {
    const task = await this.taskModel.findOneAndUpdate({ _id: id, userId }, dto, { new: true, runValidators: true }).lean();
    if (!task) throw new NotFoundException("Task not found"); return this.serializeTask(task);
  }
  async remove(userId: string, id: string) { const result = await this.taskModel.deleteOne({ _id: id, userId }); if (!result.deletedCount) throw new NotFoundException("Task not found"); return { success: true }; }
  serializeTask(task: any) { return { id: task._id.toString(), title: task.title, description: task.description || "", status: task.status, priority: task.priority || "High", tags: task.tags || [], assignee: task.assignee || "Admin", due: task.due || "12 Sep 2026", createdAt: task.createdAt, updatedAt: task.updatedAt }; }
}
