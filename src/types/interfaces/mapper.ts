import { BaseDto } from '../dtos';

export interface Mapper<BaseUserCollection> {
    toDomain(dto: BaseDto): BaseUserCollection
    toDTO(domain: BaseUserCollection): BaseDto
}
