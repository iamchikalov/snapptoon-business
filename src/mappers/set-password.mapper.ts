import { Mapper } from '../types/interfaces'
import { VerificationTokenDto, SetPasswordDto } from '../types/dtos'
import { VerificationToken } from '@snapptoon/backend-common/src/data/models/verificationToken.model'
import { makeId } from '../utils'

export class SetPasswordMapper implements Mapper<VerificationToken> {
  toDomain(dto: SetPasswordDto): VerificationToken {
    const token = new VerificationToken()
    token._id = makeId()
    token.value = dto.tokenValue
    return token
  }

  toDTO(domain: VerificationToken): VerificationTokenDto {
    return undefined;
  }

}
