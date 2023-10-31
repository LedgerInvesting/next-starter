import { NextRequest, NextResponse } from 'next/server'
const prefixes = ['VERCEL_', 'NEXT_PUBLIC_']

const filteredEnv = Object.fromEntries(
  Object.entries(process.env).filter(([key]) => prefixes.some((prefix) => key.startsWith(prefix))),
)

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams
  return NextResponse.json({
    success: true,
    params: params,
    envs: filteredEnv,
  })
}
