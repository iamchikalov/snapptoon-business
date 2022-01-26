import { Mapper } from '../types/interfaces'
import { RegisterDto, VerificationTokenDto } from '../types/dtos'

const crypto = require('crypto')
import { VerificationToken } from '@snapptoon/backend-common/src/data/models/verificationToken.model'

export class VerificationTokenMapper implements Mapper<VerificationToken> {
  toDomain(dto: RegisterDto): VerificationToken {
    const token = new VerificationToken()
    token.value = crypto.randomBytes(16).toString('hex')
    token.creator = dto._id
    console.log("DTO._id: "+ dto._id)
    console.log("token.creator: " + token.creator)
    return token
  }

  toDTO(domain: VerificationToken): VerificationTokenDto {
    return undefined;
  }

}
