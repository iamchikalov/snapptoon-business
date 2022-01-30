import { ExtendableError } from './extandable.error'

export const customError = {
  EMAIL_EXIST: () => new ExtendableError({
    message: 'USER WITH SUCH EMAIL ALREADY EXIST',
    code: 403
  }),

  INVALID_EMAIL: () => new ExtendableError({
    message: 'INVALID EMAIL',
    code: 400
  }),

  INVALID_PASSWORD: () => new ExtendableError({
    message: 'INVALID EMAIL OR PASSWORD',
    code: 403
  })

}
