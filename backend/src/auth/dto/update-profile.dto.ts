import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateProfileDto {
  @IsOptional() @IsString() @MinLength(2) @MaxLength(80)
  name?: string;

  @IsOptional() @IsString() @MinLength(2) @MaxLength(80)
  title?: string;

  @IsOptional() @IsString() @MinLength(2) @MaxLength(40)
  username?: string;
}
