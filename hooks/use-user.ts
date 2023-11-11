import useSWR from 'swr'
import { getFetcher } from '@/utils/axios-fetcher'

const options = {
  revalidateOnReconnect: true,
  shouldRetryOnError: false
}

export function useUser() {
  const { data, error, mutate, isValidating } = useSWR(
    `/api/user`,
    getFetcher,
    options
  )

  return {
    user: data,
    userLoading: isValidating,
    userError: error,
    userMutate: mutate
  }
}
