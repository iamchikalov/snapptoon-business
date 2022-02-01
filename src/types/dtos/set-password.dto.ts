import { BaseDto } from './base.dto'

export class SetPasswordDto extends BaseDto {
  tokenValue: string
  newPassword: string
  confirmPassword: string
}
