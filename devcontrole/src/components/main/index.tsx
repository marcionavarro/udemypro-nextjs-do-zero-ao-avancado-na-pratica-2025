import { ReactNode } from "react";

export function Main({ children }: { children: ReactNode }) {
  return <main className="mt-9 mb-2">{children}</main>
}