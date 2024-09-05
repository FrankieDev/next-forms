import { headers } from 'next/headers'

export async function GET(request: Response) {
  const headersList = headers()
  const referer = headersList.get('referer')

  return new Response('Api Forms', {
    status: 200,
    headers: { referer: referer }
  })
}
