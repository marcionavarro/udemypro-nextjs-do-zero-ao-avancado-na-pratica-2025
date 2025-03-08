"use client"

import { Input } from "@/components/input"
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiSearch, FiX } from "react-icons/fi";
import { z } from "zod"
import { FormTicket } from "./components/form-ticket";
import { api } from "@/lib/api";

const schema = z.object({
  email: z.string()
    .email("Digite o email do cliente para localizar.")
    .min(1, "O campo email é obrigatório.")
});

type FormData = z.infer<typeof schema>

interface CustomerDataInfo {
  id: string;
  name: string;
}

export default function OpenTicket() {
  const [customer, setCustomer] = useState<CustomerDataInfo | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  function handleClearCustomer() {
    setCustomer(null);
    setValue("email", "");
  }

  async function handleSearchCustomer(data: FormData) {
    const response = await api.get("/api/customer", {
      params: {
        email: data.email
      }
    });

    if (response.data === null) {
      setError("email", { type: "custom", message: "Cliente não foi encontrado" });
      return;
    }

    setCustomer({
      id: response.data.id,
      name: response.data.name
    })
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-2">
      <h1 className="font-bold text-3xl text-center mt-24">
        Abrir chamado
      </h1>
      <main className="flex flex-col mt-4 mb-2">
        {customer ? (
          <div className="bg-slate-100 py-6 px-4 rounded border-1 border-gray-300 flex justify-between items-center">
            <p className="text-lg"><strong>Cliente selecionado:</strong> {customer.name}</p>
            <button
              className="hover:bg-slate-200 transition-all duration-200 h-11 px-2 flex justify-center items-center rounded cursor-pointer"
              onClick={handleClearCustomer}
            >
              <FiX size={30} color="#fb2c36" />
            </button>
          </div>
        ) : (
          <form
            className="bg-slate-100 py-6 px-2 rounded border-1 border-gray-200"
            onSubmit={handleSubmit(handleSearchCustomer)}
          >
            <div className="flex flex-col gap-3">
              <Input
                type="text"
                name="email"
                placeholder="Digite o email do cliente..."
                error={errors.email?.message}
                register={register}
              />

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 transition duration-150 text-white font-bold flex flex-row gap-3 px-2 h-11 justify-center items-center rounded sm:max-w-2xs cursor-pointer">
                Procurar cliente
                <FiSearch size={24} color="#fff" />
              </button>
            </div>
          </form>
        )}

        {customer !== null && <FormTicket />}
      </main>
    </div>
  )
}