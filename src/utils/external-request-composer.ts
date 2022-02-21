import { QueryDto } from '../types/dtos/query.dto'

export function urlComposer(id: string, query: QueryDto) {
  if (
    query.author != undefined &&
    query.category != undefined &&
    query.page != undefined &&
    query.perPage != undefined &&
    query.sort != undefined) {
    return`https://api-crafting.stickers-dev.talkingheads.ai/v1/assets?author=${id}&category=${query.category}&page=${query.page}&per-page=${query.perPage}&sort=${query.sort}`
  } else if (
    query.author != undefined &&
    query.category != undefined &&
    query.page != undefined &&
    query.perPage != undefined
) {
    return`https://api-crafting.stickers-dev.talkingheads.ai/v1/assets?author=${id}&category=${query.category}&page=${query.page}&per-page=${query.perPage}`
  } else if (
    query.author != undefined &&
    query.category != undefined &&
    query.page != undefined
  ) {
    return`https://api-crafting.stickers-dev.talkingheads.ai/v1/assets?author=${id}&category=${query.category}&page=${query.page}`
  } else if (
    query.author != undefined &&
    query.category != undefined
  ) {
    return`https://api-crafting.stickers-dev.talkingheads.ai/v1/assets?author=${id}&category=${query.category}`
  } else {
    return`https://api-crafting.stickers-dev.talkingheads.ai/v1/assets?author=${id}`
  }
}
