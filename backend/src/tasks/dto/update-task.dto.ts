import { IsIn, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(160)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @IsOptional()
  @IsString({ each: true })
  @MaxLength(40, { each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  @MaxLength(80)
  assignee?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  due?: string;

  @IsOptional()
  @IsString()
  @IsIn(["No Priority", "Urgent", "High", "Medium", "Low"])
  priority?: "No Priority" | "Urgent" | "High" | "Medium" | "Low";

  @IsOptional()
  @IsString()
  @IsIn(["todo", "in_progress", "done", "on_hold"])
  status?: "todo" | "in_progress" | "done" | "on_hold";
}
