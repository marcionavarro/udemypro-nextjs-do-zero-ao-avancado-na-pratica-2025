'use client'

import Link from "next/link"
import { useEffect } from "react";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {

  useEffect(() => {
    console.log(error)
  }, [error])

  return (
    <div>
      <h2>Opss algo deu errado</h2>
      <div>
        <Link href="/">Voltar para a pagina home</Link>
      </div>
    </div>
  )
}

export default Error