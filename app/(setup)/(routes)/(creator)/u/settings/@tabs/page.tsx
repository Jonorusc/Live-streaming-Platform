import { redirect } from 'next/navigation'

export default function CreatorTabsIndex() {
  /*
  This is the home page for the user's creator settings dashboard. So feel free to add any components you want to display here.
  I'm using 'redirect' because I don't have any ideia and even what to put here. I'm just redirecting the user to the stream settings page.
  */

  redirect(`/u/settings/stream`)
}
