import SettingsLoading from '@main/user/settings/_components/loading'
import StreamPage from '../../_components/stream'
import { Suspense } from 'react'

export default async function Page() {
  return (
    <>
      <Suspense fallback={<SettingsLoading />}>
        <StreamPage />
      </Suspense>
    </>
  )
}
