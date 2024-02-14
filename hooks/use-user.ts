import useSWR from 'swr'
import { getFetcher } from '@/lib/utils/axios-fetcher'
import { CURRENTUSER } from '@/actions/user'

const options = {
  revalidateOnReconnect: true,
  shouldRetryOnError: false
}

export function useUser(): {
  user: CURRENTUSER | null
  isValidating: boolean
  isLoading: boolean
  userError: any
  userMutate: (
    data?: any,
    shouldRevalidate?: boolean
  ) => Promise<any | undefined>
} {
  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/api/user`,
    getFetcher,
    options
  )

  return {
    user: data?.error ? null : data,
    isValidating, //true if revalidation is in progress
    isLoading, //nothing to display
    userError: error,
    userMutate: mutate
  }
}
