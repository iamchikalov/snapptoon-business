import { ApiProperty } from '@nestjs/swagger'

export class QueryDto {
  @ApiProperty()
  author: string
  @ApiProperty({required: false})
  category?: string
  @ApiProperty({required: false})
  page?: number
  @ApiProperty({required: false})
  perPage?: number
  @ApiProperty({required: false})
  sort?: string
}
