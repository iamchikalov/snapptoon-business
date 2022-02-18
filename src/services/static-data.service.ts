import { Inject, Injectable } from '@nestjs/common'
import { TEMPLATE_RESPONSES } from '../utils'
import { BaseRepository } from '@snapptoon/backend-common/src/repositories/base.repository'
import { TemplateResponses } from '@snapptoon/backend-common/src/data/models/TemplateResponses'

@Injectable()
export class StaticDataService {
  constructor (
    @Inject(TEMPLATE_RESPONSES) private readonly responsesRepository: BaseRepository<TemplateResponses>,
  ) {}

  async getAllResponses() {
    return await this.responsesRepository.find({ type: 'TUTORIAL_LINK' }, {})
  }

  async getLinks() {
    const data = await this.responsesRepository.find({type: 'SOCIAL_LINK'}, {})
    const links = {
      twitter: data[0].link,
      instagram: data[1].link
    }
    return links
  }
}

