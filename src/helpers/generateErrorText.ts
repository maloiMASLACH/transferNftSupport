import { FieldError } from 'react-hook-form'

import { formControlErrors } from '@/constants/errors'

export const generateValidationWarning = (error: string): string => {
  return `translate#form.validationWarning.${error}`
}

export const generateErrorText = (error?: FieldError): React.ReactElement | string => {
  if (error?.message) {
    return generateValidationWarning(error.message)
  } else if (error?.type) {
    return generateValidationWarning(formControlErrors[error.type || ''])
  }

  return ''
}
