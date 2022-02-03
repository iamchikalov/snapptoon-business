import {BaseDto} from "./base.dto";
import { Asset } from '@snapptoon/backend-common/src/data/models/Asset'
import {UserRole} from '../enums';
import { SocialLinks } from '@snapptoon/backend-common/src/data/models/SocialLinks'
import { Inbox } from '@snapptoon/backend-common/src/data/models/Inbox'
import { ApiProperty } from '@nestjs/swagger'

export class RegisterDto extends BaseDto {
    @ApiProperty()
    email: string
    @ApiProperty()
    password: string
    @ApiProperty()
    name: string
    @ApiProperty()
    asset?: Asset[]
    type?: UserRole
    @ApiProperty()
    description?: string
    @ApiProperty()
    isVerified?: boolean
    @ApiProperty()
    links?: SocialLinks
    @ApiProperty()
    notifications?: Inbox[]
}
