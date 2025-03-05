import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import PrismaClient from '@/lib/prisma';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  const { name, email, phone, address, userId } = await request.json();

  try {
    await PrismaClient.customer.create({
      data: {
        name,
        email,
        phone,
        address: address ? address : "",
        userId
      }
    })

    return NextResponse.json({ message: "Cliente cadastrado com sucesso" })
  } catch (error) {
    return NextResponse.json({ error: "Falha ao criar um novo cliente" }, { status: 400 })
  }
}