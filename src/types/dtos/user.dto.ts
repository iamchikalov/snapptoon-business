import { BaseDto } from './base.dto'
import { SocialLinks } from '@snapptoon/backend-common/src/data/models/SocialLinks'
import { Inbox } from '@snapptoon/backend-common/src/data/models/Inbox'
import { Asset } from '@snapptoon/backend-common/src/data/models/Asset'
import {ApiProperty} from "@nestjs/swagger";

export class UserDto extends BaseDto {
  @ApiProperty()
  password?: string
  @ApiProperty()
  newPassword?: string
  @ApiProperty()
  confirmNewPassword?: string
  @ApiProperty()
  email?: string
  @ApiProperty()
  newEmail?: string
  @ApiProperty()
  name?: string
  @ApiProperty()
  asset?: Asset[]
  @ApiProperty()
  description?: string
  @ApiProperty()
  links?: SocialLinks
  @ApiProperty()
  notifications?: Inbox[] // TODO: WTF?!
}
