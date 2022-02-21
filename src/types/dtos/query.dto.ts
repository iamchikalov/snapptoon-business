import { ApiProperty } from '@nestjs/swagger'

export class QueryDto {
  @ApiProperty()
  author: string
  @ApiProperty()
  category?: string
  @ApiProperty()
  page?: number
  @ApiProperty()
  perPage?: number
  @ApiProperty()
  sort?: string
}
