import { Body, Controller, Delete, Get, Param, Post, Put, Res } from "@nestjs/common";
import { CreatorService } from '../services';
import { Creator } from '@snapptoon/backend-common/src/data/models/Creator'

@Controller()
export class CreatorController {
    constructor(
        private readonly service: CreatorService
    ) {}

    @Post('/api/create')
    async create(@Res() response, @Body() creator: Creator) {
        return await this.service.create(creator)
    }

    @Get('/api/get/:id')
    async get (@Res() response, @Param('id') id) {
        return await this.service.getCreator(id)
    }

    @Put('/api/put/:id')
    async update(@Res() response, @Param('id') id, @Body() creator: Creator) {
        return await this.service.update(id, creator);
    }

    @Delete('/api/delete/:id')
    async delete (@Res() response, @Param('id') id) {
        return await this.service.delete(id);
    }

}
