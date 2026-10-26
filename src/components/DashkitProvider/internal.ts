"use client"

import { useContext } from "react"
import { DashkitContext } from "./DashkitContext"

export function useLinkComponent() {
  const context = useContext(DashkitContext)
  return context?.linkComponent ?? "a"
}
