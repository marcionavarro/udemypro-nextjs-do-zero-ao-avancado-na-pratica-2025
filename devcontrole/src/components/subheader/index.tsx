import { ButtonRefresh } from "@/app/dashboard/components/button";
import Link from "next/link";

interface SubHeaderProps {
  title: string;
  linkTitle: string;
  link: string
}

export function SubHeader({ title, linkTitle, link }: SubHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-10">
      <h1 className="text-3xl font-bold">{title}</h1>
      <div className="flex items-center gap-2">
        <ButtonRefresh />
        <Link href={link} className="bg-blue-500 px-4 py-1 rounded text-white">
          {linkTitle}
        </Link>
      </div>
    </div>
  )
}