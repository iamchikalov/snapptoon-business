import { MongooseModule } from '@nestjs/mongoose'

export function dbAggregation(MODEL, SCHEMA) {
  return MongooseModule.forFeature([{name: MODEL.name, schema: SCHEMA}])
}
