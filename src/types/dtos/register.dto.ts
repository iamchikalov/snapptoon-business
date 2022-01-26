import {BaseDto} from "./base.dto";
import { Asset } from '@snapptoon/backend-common/src/data/models/Asset'
import {UserRole} from '../enums';
import { SocialLinks } from '@snapptoon/backend-common/src/data/models/SocialLinks'
import { Inbox } from '@snapptoon/backend-common/src/data/models/Inbox'

export class RegisterDto extends BaseDto {
    email: string
    password: string
    name: string
    asset?: Asset[]
    type?: UserRole
    description?: string
    isVerified?: boolean
    links?: SocialLinks
    notifications?: Inbox[]
}
