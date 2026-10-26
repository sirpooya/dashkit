"use client"

import { type ComponentType, createContext, type ForwardRefExoticComponent } from "react"

type DashkitContextValue = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  linkComponent: ComponentType<any> | ForwardRefExoticComponent<any> | "a"
}

export const DashkitContext = createContext<DashkitContextValue | null>(null)
