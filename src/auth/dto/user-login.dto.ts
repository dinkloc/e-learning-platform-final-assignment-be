import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDTO{
  @IsEmail({ ignore_max_length: true }, { message: 'INVALID_EMAIL' })
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    required: true
  })
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  readonly password: string;
}