export function comparePasswords(
  newPassword: string,
  confirmPassword: string
) {
  return newPassword == confirmPassword
}

export function changePasswordComparator(
  oldPassword: string,
  newPassword: string,
  confirmPassword: string
) {
  if (oldPassword == newPassword && oldPassword == confirmPassword) {
    return true
  }
}
