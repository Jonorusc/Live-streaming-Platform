import Link from 'next/link'

export default async function NotFound() {
  return (
    <>
      <div>
        <h2>Not Found</h2>
        <p>Sorry. content is unavailable.</p>
        <Link href="/" prefetch={false}>
          Return Home
        </Link>
      </div>
    </>
  )
}
