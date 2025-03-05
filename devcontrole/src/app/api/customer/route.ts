import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prismaClient from '@/lib/prisma';

// Rota para cadastrar um cliente
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  const { name, email, phone, address, userId } = await request.json();

  try {
    await prismaClient.customer.create({
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

// Rota para deletar um cliente
export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("id");

  if (!userId) {
    return NextResponse.json({
      error: "Customer not found"
    }, {
      status: 404
    })
  }

  const findTickets = await prismaClient.ticket.findFirst({
    where: {
      customerId: userId
    }
  });

  if(findTickets){
    return NextResponse.json({
      error: "Voçê não pode deletar um cliente que contem ticket"
    }, {
      status: 400
    })
  }

  try {
    await prismaClient.customer.delete({
      where: {
        id: userId as string
      }
    });
    return NextResponse.json({ message: "Cliente deletado com sucesso!" })
  } catch (error) {
    return NextResponse.json({
      error: "Failed delete customer"
    }, {
      status: 400
    });
  }
}