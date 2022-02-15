import { Module } from '@nestjs/common'
import { dbAggregation, providerAggregation, TEMPLATE_RESPONSES } from '../utils'
import { TemplateResponses, TemplateResponsesSchema } from '@snapptoon/backend-common/src/data/models/TemplateResponses'
import { StaticDataService } from '../services'
import { StaticDataController } from '../controllers'

@Module({
  imports: [
    dbAggregation(TemplateResponses, TemplateResponsesSchema)
  ],
  providers: [
    providerAggregation(TEMPLATE_RESPONSES, TemplateResponses),
    StaticDataService
  ],
  controllers: [StaticDataController]
})

export class StaticDataModule {}
