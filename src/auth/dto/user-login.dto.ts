import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export enum UserStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  BANNED = 'BANNED',
  DELETED = 'DELETED',
}

export class RegisterDTO {

  @IsNotEmpty()
  @ApiProperty({
    type: "string",
    required: true
  })
  firstName: string;

  @IsNotEmpty()
  @ApiProperty({
    type: "string",
    required: true
  })
  lastName: string;

  @IsNotEmpty()
  @ApiProperty({
    type: "string",
    required: true
  })
  userName: string;

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

export class LoginDTO {
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

export class ChangePasswordDTO {
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'Old password',
  })
  readonly oldPassword: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'Password',
  })
  readonly password: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'Re Type New Password',
  })
  readonly reTypeNewPassword: string;
}