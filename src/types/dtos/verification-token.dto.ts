import { BaseDto } from './base.dto'

export class VerificationTokenDto extends BaseDto {
  creatorId: string
  value: string
}
