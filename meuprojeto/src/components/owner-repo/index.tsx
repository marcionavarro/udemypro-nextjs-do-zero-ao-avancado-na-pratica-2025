'use client'

import Image from "next/image"
import { useState } from "react"

import styles from './styles.module.css'

interface OwnerRepoProps {
  avatar_url: string
  name: string
}

export function OwnerRepo({ avatar_url, name }: OwnerRepoProps) {
  const [show, setShow] = useState(false)
  return (
    <div className={styles.owner}>
      {show && (
        <>
          <Image
            src={avatar_url}
            alt={`Foto avatar do ${name}`}
            width={24}
            height={24}
            style={{ borderRadius: 50 }}
          />
          <strong>{name}</strong>
        </>
      )}
      <button className={styles.ownerShow} onClick={() => setShow(!show)}>
        {show ? "Ocultar" : "Mostrar"}
      </button>
    </div>
  )
}