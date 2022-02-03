import { BaseDto } from './base.dto'
import { SocialLinks } from '@snapptoon/backend-common/src/data/models/SocialLinks'
import { Inbox } from '@snapptoon/backend-common/src/data/models/Inbox'
import { Asset } from '@snapptoon/backend-common/src/data/models/Asset'

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
