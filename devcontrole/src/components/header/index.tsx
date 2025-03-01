import Link from "next/link";
import { FiLogOut, FiUser } from "react-icons/fi";

export function Header() {
  return (
    <header className="w-full flex items-center px-2 py-4 bg-white h-20 shadow-sm">
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="font-bold text-2xl uppercase pl-1 hover:tracking-widest duration-300">
          <Link href='/'>
            <span className="text-blue-500 mr-2">Dev</span>
            Controle
          </Link>
        </h1>
        <div className="flex items-baseline gap-4">
          <button>
            <Link href='/dashboard'>
              <FiUser size={26} color="#4b5563" />
            </Link>
          </button>
          <button>
            <FiLogOut size={26} color="#4b5563" />
          </button>
        </div>
      </div>
    </header>
  )
}