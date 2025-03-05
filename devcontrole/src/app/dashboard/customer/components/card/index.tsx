'use client'

import { api } from "@/lib/api";
import { CustomerProps } from "@/utils/customer.type";
import { useRouter } from "next/navigation";

export function CardCustomer({ customer }: { customer: CustomerProps }) {
  const router = useRouter();

  async function handleDeleteCustomer() {
    try {
      await api.delete('/api/customer', {
        params: {
          id: customer.id
        }
      })
      router.refresh();
    } catch (error) {
      return new Error("Failed to response delete customer")
    }
  }

  return (
    <article className="flex flex-col bg-gray-100 bordr-2 p-2 rounded-lg gap-2 hover:scale-90 duration-300">
      <h2>
        <a className="font-bold">Nome:</a> {customer.name}
      </h2>
      <p><a className="font-bold">Email:</a> {customer.email}</p>
      <p><a className="font-bold">Telefone:</a> {customer.phone}</p>
      <button
        className="bg-red-500 px-4 rounded text-white mt-2 self-start cursor-pointer hover:bg-red-700"
        onClick={handleDeleteCustomer}
      >
        Deletar
      </button>
    </article>
  )
}