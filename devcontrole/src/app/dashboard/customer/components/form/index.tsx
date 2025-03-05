
'use client'

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/input";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(1, "O campo nome é obrigatório"),
  email: z.string().email("Digite um email valido.").min(1, "E email é obrigatório"),
  phone: z.string().refine((value) => {
    return /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) ||
      /^\d{2}\s\d{9}$/.test(value) ||
      /^\d{11}$/.test(value)
  }, {
    message: "O numero de telefone deve ser (DD) 999999999"
  }),
  address: z.string(),
})

type formData = z.infer<typeof schema>

export function NewCustomerForm({ userId }: { userId: string }) {
  const { register, handleSubmit, formState: { errors } } = useForm<formData>({
    resolver: zodResolver(schema)
  });
  const router = useRouter();

  async function handleRegisterCustomer(data: formData) {
    await api.post("/api/customer", {
      name: data.name,
      phone: data.phone,
      email: data.email,
      address: data.address,
      userId
    });

    router.refresh();
    router.replace("/dashboard/customer")
  }

  return (
    <form onSubmit={handleSubmit(handleRegisterCustomer)} className="flex flex-col mt-6">
      <label className="mb-1 text-lg font-medium">Nome completo</label>
      <Input
        type="text"
        name="name"
        placeholder="Digite o nome completo"
        error={errors.name?.message}
        register={register}
      />

      <section className="flex flex-col sm:flex-row gap-2 my-3">
        <div className="flex-1">
          <label className="mb-1 text-lg font-medium">Telefone</label>
          <Input
            type="text"
            name="phone"
            placeholder="Ex: (DD) 988887777"
            error={errors.phone?.message}
            register={register}
          />
        </div>

        <div className="flex-1">
          <label className="mb-1 text-lg font-medium">E-mail</label>
          <Input
            type="email"
            name="email"
            placeholder="Digite o email..."
            error={errors.email?.message}
            register={register}
          />
        </div>
      </section>

      <label className="mb-1 text-lg font-medium">Endereço</label>
      <Input
        type="text"
        name="address"
        placeholder="Digite o endereço completo"
        error={errors.address?.message}
        register={register}
      />

      <button
        type="submit"
        className="sm:w-2xs bg-blue-500 my-4 px-2 h-11 rounded text-white font-bold hover:bg-blue-700 transition-all duration-150 cursor-pointer">
        Cadastrar
      </button>
    </form>
  )
}