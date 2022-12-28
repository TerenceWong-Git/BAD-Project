import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTodo {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
