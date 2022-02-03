import { BaseDto } from './base.dto'
import { ApiProperty } from '@nestjs/swagger'

export class authDto extends BaseDto {
  @ApiProperty()
  email: string
  @ApiProperty()
  password: string
}
