import { BaseDto } from './base.dto'
import { ApiProperty } from '@nestjs/swagger'

export class SetPasswordDto extends BaseDto {
  @ApiProperty()
  tokenValue: string
  @ApiProperty()
  newPassword: string
  @ApiProperty()
  confirmPassword: string
}
