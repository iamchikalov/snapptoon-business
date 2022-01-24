import { UserRole } from '../enums'
import { Asset } from '@snapptoon/backend-common/src/data/models/Asset'
import { SocialLinks } from '@snapptoon/backend-common/src/data/models/SocialLinks'
import { Inbox } from '@snapptoon/backend-common/src/data/models/Inbox'

export class CreatorDTO {
    _id: string
    email: string
    password: string
    name: string
    createdAt: Date
    updatedAt: Date
    asset: Asset['_id']
    type: UserRole
    description: string
    isVerified: boolean
    links: SocialLinks
    notifications: Inbox['_id']
}
