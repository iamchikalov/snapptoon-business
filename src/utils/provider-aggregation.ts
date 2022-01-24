import { Model } from 'mongoose'
import { BaseRepository } from '@snapptoon/backend-common/src/repositories/base.repository'
import { getModelToken } from '@nestjs/mongoose'

export function providerAggregation<T = any>(TOKEN, MODEL) {
  return {
    provide: TOKEN,
    useFactory: async (
      instance: Model<typeof MODEL>
    ) => {
      return new BaseRepository(instance)
    },
    inject: [getModelToken(MODEL.name)]
  }
}
