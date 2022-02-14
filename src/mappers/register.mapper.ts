import { Mapper } from '../types/interfaces'
import { Creator } from '@snapptoon/backend-common/src/data/models/Creator'
import { RegisterDto } from '../types/dtos'
import { UserRole } from '../types/enums'
import { makeId } from '../utils'

export class RegisterMapper implements Mapper<Creator> {
    toDomain(dto: RegisterDto): Creator {
        const creator = new Creator()
        creator._id = makeId()
        creator.name = dto.name
        creator.email = dto.email
        creator.password = dto.password
        creator.asset = dto.asset
        creator.description = dto.description
        creator.isVerified = false
        creator.type = UserRole.CREATOR
        creator.links = dto.links
        creator.notifications = dto.notifications
        creator.createdAt = new Date()
        creator.updatedAt = new Date()

        return creator
    }

    toDTO(domain: Creator): RegisterDto {
        return undefined;
    }

}
