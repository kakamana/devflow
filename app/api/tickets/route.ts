import tickets from "@/app/database";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(tickets);
}

export async function POST(request: Request) {
  const { name, status, type } = await request.json();

  const newTicket = {
    id: tickets.length + 1,
    name,
    status,
    type,
  };
  tickets.push(newTicket);

  console.log(newTicket);

  return NextResponse.json(newTicket);
}
