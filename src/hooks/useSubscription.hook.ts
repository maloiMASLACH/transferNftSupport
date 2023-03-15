import { useEffect, useState } from 'react'
import { Observable } from 'rxjs'

/**
 * Hook to get the observable value
 * @param {Observable<T>} [dataSource] - Observable for subscribe
 * @param {T} [initialValue=null] - The initial value of the observable
 * @returns The observable value
 * @example
 * <caption>An example of use with an observable array.</caption>
 * const array = useSubscription(of([1, 2, 3]), []);
 */

export const useSubscription = <T>(
  dataSource: Observable<T>,
  initialValue: T | null = null,
): T | null => {
  const [data, setData] = useState<T | null>(initialValue)
  useEffect(() => {
    const subscriber = dataSource.subscribe(setData)
    return () => {
      subscriber.unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return data
}
