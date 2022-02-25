import { QueryDto } from '../types/dtos/query.dto'

export function urlComposer (id: string, query: QueryDto) {
  const queryString = Object.entries({ id, ...query })
    .filter(([,value]) => value)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
  return `https://api-crafting.stickers-dev.talkingheads.ai/v1/assets?${queryString}`
}

