import { Mapper } from '../types/interfaces'
import { RegisterDto, VerificationTokenDto } from '../types/dtos'
import { VerificationToken } from '@snapptoon/backend-common/src/data/models/verificationToken.model'
import { makeId } from '../utils'
const crypto = require('crypto')

export class VerificationTokenMapper implements Mapper<VerificationToken> {
  toDomain(dto: RegisterDto): VerificationToken {
    const token = new VerificationToken()
    token._id = makeId()
    token.value = crypto.randomBytes(16).toString('hex')
    token.creatorId = dto._id
    return token
  }

  toDTO(domain: VerificationToken): VerificationTokenDto {
    return undefined;
  }

}
