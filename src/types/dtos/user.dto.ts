import { BaseDto } from './base.dto'
import { Asset } from '@nestjs/cli/lib/configuration'
import { SocialLinks } from '@snapptoon/backend-common/src/data/models/SocialLinks'
import { Inbox } from '@snapptoon/backend-common/src/data/models/Inbox'

export class UserDto extends BaseDto {
  password?: string
  newPassword?: string
  confirmNewPassword?: string
  email?: string
  newEmail?: string
  name?: string
  asset?: Asset[]
  description?: string
  links?: SocialLinks
  notifications?: Inbox[] // TODO: WTF?!
}
