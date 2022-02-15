import { Mapper } from "../types/interfaces"
import { UserDto } from "../types/dtos"
import { Creator } from "@snapptoon/backend-common/src/data/models/Creator"

export class UserProfileMapper implements Mapper<Creator> {
    toDomain(dto: UserDto): Creator {
        const creator = new Creator()

        creator.email = dto.email
        creator.name = dto.name
        creator.asset = dto.asset
        creator.description = dto.description
        creator.links = dto.links
        creator.notifications = dto.notifications

        return creator
    }

    toDTO(domain: Creator): UserDto {
        const userDto = new UserDto()

        userDto._id = domain._id
        userDto.email = domain.email
        userDto.name = domain.name
        userDto.asset = domain.asset
        userDto.description = domain.description
        userDto.logo = domain.logo
        userDto.links = domain.links
        userDto.notifications = domain.notifications

        return userDto
    }
}
