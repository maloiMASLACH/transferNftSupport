import { ReactElement } from 'react'

export interface WrapperProps {
  children: ReactElement | ReactElement[]
}

export type Option = {
  name: string
  value: string
}
