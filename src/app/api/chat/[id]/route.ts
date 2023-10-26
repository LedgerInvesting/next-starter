import { NextResponse } from 'next/server'

type Params = { params: { id: string } }

// export const runtime = 'edge'

// Update a chat by ID
export async function POST(req: Request, { params }: Params) {
  // const body = await req.json()
  // const chatId = params.id

  return NextResponse.json([])
}

// Retrieve a chat by ID
export async function GET(req: Request, { params }: Params) {
  return NextResponse.json([])
}

// Delete a chat by ID
export async function DELETE(req: Request, { params }: Params) {
  return NextResponse.json([])
}
