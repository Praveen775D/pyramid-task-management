import { IsIn, IsString } from "class-validator";

export class UpdateThemeDto {
  @IsString()
  @IsIn(["default", "dark", "slate"])
  theme!: "default" | "dark" | "slate";
}
