'use client'

import { ModalContext } from "@/providers/modal"
import { MouseEvent, useContext, useRef } from "react"

export function ModalTicket() {
  const { handleModalVisible, ticket } = useContext(ModalContext);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleModalRefClick = (e: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleModalVisible();
    }
  }

  return (
    <div className="absolute bg-gray-900/80 w-full min-h-screen" onClick={handleModalRefClick}>
      <div className="absolute inset-0 flex justify-center items-center">
        <div
          className="bg-white shadow-lg w-4/5 md:w-1/2 max-w-2xl p-3 rounded"
          ref={modalRef}
        >
          <div className="flex justify-between items-center mb-4">
            <h1 className="font-bold text-lg md:text-2xl">Detalhes do chamado</h1>
            <button
              className="bg-red-500 hover:bg-red-700 p-1 px-2 text-white rounded cursor-pointer"
              onClick={handleModalVisible}
            >
              Fechar
            </button>
          </div>
          <div className="flex flex-wrap gap-1 mb-2">
            <h2 className="font-bold">Nome:</h2>
            <p>{ticket?.ticket.name}</p>
          </div>
          <div className="flex flex-wrap flex-col gap-1 mb-2">
            <h2 className="font-bold">Descrição:</h2>
            <p>{ticket?.ticket.description}</p>
          </div>

          <div className="w-full border-b-[0.1px] my-4"></div>

          <h1 className="font-bold text-lg md:text-2xl mb-4">Detalhes do cliente</h1>
          <div className="flex flex-wrap gap-1 mb-2">
            <h2 className="font-bold">Nome:</h2>
            <p>{ticket?.customer?.name}</p>
          </div>
          <div className="flex flex-wrap gap-1 mb-2">
            <h2 className="font-bold">Telefone:</h2>
            <p>{ticket?.customer?.phone}</p>
          </div>
          <div className="flex flex-wrap gap-1 mb-2">
            <h2 className="font-bold">E-mail:</h2>
            <p>{ticket?.customer?.email}</p>
          </div>
          {ticket?.customer?.address && (
            <div className="flex flex-wrap gap-1 mb-2">
              <h2 className="font-bold">Endereço:</h2>
              <p>{ticket.customer.address}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}