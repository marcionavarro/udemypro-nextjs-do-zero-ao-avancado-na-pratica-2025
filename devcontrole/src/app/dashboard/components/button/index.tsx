'use client'

import { useRouter } from "next/navigation"
import { FiRefreshCcw } from "react-icons/fi";

export function ButtonRefresh() {
  const router = useRouter();

  return (
    <button
      className="bg-gray-900 hover:bg-gray-700 transition duration-150 py-1 px-3 rounded cursor-pointer"
      onClick={() => router.refresh()}
    >
      <FiRefreshCcw size={24} color="#fff" />
    </button >
  )
}