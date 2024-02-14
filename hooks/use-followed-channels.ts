import useSWRInfinite from 'swr/infinite'
import { getFetcher } from '@/lib/utils/axios-fetcher'
import { CHANNELS } from '@/lib/channels'

const options = {
  revalidateOnReconnect: true,
  shouldRetryOnError: false
}

const PAGE_SIZE = 10

export function useFollowedChannels(): {
  channels: CHANNELS | []
  isValidating: boolean
  isLoadingMore?: boolean
  isReachingEnd?: boolean
  isRefreshing?: boolean
  isLoading: boolean
  page: number
  pageSize: number
  setPage: (size: number | ((size: number) => number)) => void
  mutate: (
    data?: CHANNELS,
    shouldRevalidate?: boolean
  ) => Promise<any | undefined>
} {
  const { data, mutate, size, setSize, isValidating, isLoading } =
    useSWRInfinite(
      (index) => `/api/user/channels/?take=${PAGE_SIZE}&skip=${index}`,
      getFetcher,
      options
    )

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE)
  const isRefreshing = isValidating && data && data.length === size
  return {
    channels: data ? [].concat(...data) : [],
    isValidating, //true if revalidation is in progress
    isLoadingMore,
    isReachingEnd,
    isRefreshing,
    page: size,
    pageSize: PAGE_SIZE,
    setPage: setSize,
    isLoading, //nothing to display,
    mutate
  }
}
