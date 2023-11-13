import useSWR from 'swr'
import { getFetcher } from '@/utils/axios-fetcher'
import { Profile, User, Channel, Follower, Subscriber } from '@prisma/client'

const options = {
  revalidateOnReconnect: true,
  shouldRetryOnError: false
}

type UserProps = User & {
  profile?: Profile
  channel?: Channel
  follows?: Follower[]
  subscribers?: Subscriber[]
}

export function useUser(): {
  user: UserProps | null
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
