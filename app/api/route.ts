// app/api/countries/route.ts
import { NextResponse } from 'next/server'

const BASE_URL = 'https://restcountries.com/v3.1'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const criterion = searchParams.get('criterion')
  const query = searchParams.get('query')

  if (!criterion || !query) {
    return NextResponse.json(
      { error: 'criterion and query are required' },
      { status: 400 }
    )
  }

  let endpoint = ''

  switch (criterion) {
    case 'name':
      endpoint = `/name/${encodeURIComponent(query)}`
      break
    case 'language':
      endpoint = `/lang/${encodeURIComponent(query)}`
      break
    case 'capital':
      endpoint = `/capital/${encodeURIComponent(query)}`
      break
    default:
      return NextResponse.json(
        { error: 'invalid criterion' },
        { status: 400 }
      )
  }
  const res = await fetch(`${BASE_URL}${endpoint}`)

  if (res.status === 404) {
  return NextResponse.json(
    { error: "No country found" },
    { status: 404 }
  );
}

  if (!res.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch countries' },
      { status: res.status }
    )
  }

  const data = await res.json()
  return NextResponse.json(data)
}