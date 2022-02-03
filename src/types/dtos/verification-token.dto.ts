import { BaseDto } from './base.dto'
import { ApiProperty } from '@nestjs/swagger'

export class VerificationTokenDto extends BaseDto {
  @ApiProperty()
  value: string
}
