import { Mapper } from '../types/interfaces'
import { RegisterDto, VerificationTokenDto } from '../types/dtos'
const crypto = require('crypto')
import { VerificationToken } from '@snapptoon/backend-common/src/data/models/verificationToken.model'
import { makeId } from '../utils'

export class VerificationTokenMapper implements Mapper<VerificationToken> {
  toDomain(dto: RegisterDto): VerificationToken {
    const token = new VerificationToken()
    token._id = makeId()
    token.value = crypto.randomBytes(16).toString('hex')
    token.creatorId = dto._id
    console.log("DTO._id: "+ dto._id)
    console.log("token.creator: " + token.creatorId)
    return token
  }

  toDTO(domain: VerificationToken): VerificationTokenDto {
    return undefined;
  }

}
