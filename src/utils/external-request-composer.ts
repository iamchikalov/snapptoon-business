import { QueryDto } from '../types/dtos/query.dto'

export function urlComposer(id: string, query: QueryDto) {
  return`https://api-crafting.stickers-dev.talkingheads.ai/v1/assets?author=${id}&category=${query.category}&page=${query.page}&per-page=${query.perPage}&sort=${query.sort}`
}
