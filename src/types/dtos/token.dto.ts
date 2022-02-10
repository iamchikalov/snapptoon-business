import { BaseDto } from './base.dto'
import { UserRole } from '../enums'

export class TokenDto extends BaseDto{
  email: string
  type: UserRole
}
