import { Option } from '@/types'

export function reorderArray<T = unknown>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)

  result.splice(endIndex, 0, removed)

  return result
}

export const removeNoneItem = (options?: Option[]) => {
  const noneItemIndex = (options || []).findIndex(
    (option) => option.value === 'None' || option.value === 'none',
  )

  const optionsCopy = [...(options || [])]

  if (noneItemIndex > -1) {
    optionsCopy.splice(noneItemIndex, 1)
  }

  return optionsCopy
}
