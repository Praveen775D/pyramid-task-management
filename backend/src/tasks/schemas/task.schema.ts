import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type TaskDocument = HydratedDocument<Task>;

@Schema({ timestamps: true })
export class Task {
  @Prop({ type: Types.ObjectId, ref: "User", required: true, index: true })
  userId!: Types.ObjectId;

  @Prop({ required: true, trim: true, maxlength: 160 })
  title!: string;

  @Prop({ default: "", maxlength: 1000 })
  description!: string;

  @Prop({ type: [String], default: [] })
  tags!: string[];

  @Prop({ default: "Admin", maxlength: 80 })
  assignee!: string;

  @Prop({ enum: ["No Priority", "Urgent", "High", "Medium", "Low"], default: "High" })
  priority!: "No Priority" | "Urgent" | "High" | "Medium" | "Low";

  @Prop({ default: "29 Jul", maxlength: 30 })
  due!: string;

  @Prop({
    required: true,
    enum: ["todo", "in_progress", "done", "on_hold"],
    default: "todo",
    index: true,
  })
  status!: "todo" | "in_progress" | "done" | "on_hold";
}

export const TaskSchema = SchemaFactory.createForClass(Task);
