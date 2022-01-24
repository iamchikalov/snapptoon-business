import { Injectable } from "@nestjs/common";
import { Creator } from '@snapptoon/backend-common/src/data/models/Creator'
import { CreatorDTO } from '../types/dtos';
import { BaseRepository } from '@snapptoon/backend-common/src/repositories/base.repository'


@Injectable()
export class CreatorService {
    constructor(
        private readonly repository: BaseRepository<Creator>
    ) { }

    async create (doc: Creator): Promise<Creator> {
        return await this.repository.create(doc)
    }

    async getCreator (id: string) {
        return await this.repository.get(id)
    }

    async update (id, update: Creator) {
        return await this.repository.update(id, update)
    }

    async delete (query: CreatorDTO) {
        return await this.repository.delete(query)
    }
}
