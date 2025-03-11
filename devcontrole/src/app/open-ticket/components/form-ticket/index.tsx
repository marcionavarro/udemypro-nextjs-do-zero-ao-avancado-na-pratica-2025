'use client'

import { Input } from "@/components/input";
import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CustomerDataInfo } from "../../page";

const schema = z.object({
  name: z.string().min(1, "Campo email é obrigatório."),
  description: z.string().min(1, "Descreva um pouco sobre seu problema.")
});

type FormData = z.infer<typeof schema>

interface FormTicketProps {
  customer: CustomerDataInfo
}

export function FormTicket({ customer }: FormTicketProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  async function handleRegisterTicket(data: FormData) {
    const response = await api.post("/api/ticket", {
      name: data.name,
      description: data.description,
      customerId: customer.id
    });
    setValue("name", "");
    setValue("description", "")
  }

  return (
    <form
      className="bg-slate-100 mt-6 px-4 py-6 border-1 border-gray-200"
      onSubmit={handleSubmit(handleRegisterTicket)}
    >
      <label className="inline-block mb-2 font-medium text-lg">Nome do chamado</label>
      <Input
        type="text"
        name="name"
        placeholder="Digite o nome do chamado"
        register={register}
        error={errors.name?.message}
      />

      <label className="inline-block my-2 font-medium text-lg">Descreva o problema</label>
      <textarea
        className="w-full border-2 border-gray-200 rounded-md h-24 resize-none px-2"
        placeholder="Descreva o seu problema..."
        id="description"
        {...register("description")}
      ></textarea>
      {errors.description?.message &&
        <p className="text-red-500 mb-6">{errors.description?.message}</p>}

      <button
        type="submit"
        className="w-full h-11 bg-blue-500 hover:bg-blue-700 transition duration-150 text-white font-bold px-2 sm:max-w-2xs cursor-pointer"
      >
        Cadastrar
      </button>
    </form>
  )
}