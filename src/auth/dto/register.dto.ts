import { Transform } from "class-transformer";
import { IsNumber, IsString, MinLength } from "class-validator";

export class RegisterDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  password: string;

  @IsString()
  @MinLength(1)
  role: string;

  @IsNumber()
  statusId: number;
}