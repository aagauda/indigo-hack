"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import { LucideIcon } from "lucide-react"
import Link from "next/link"
import { Url } from "next/dist/shared/lib/router/router"

export type DropDownMenuItemType = {
  itemName: string,
  link: Url,
}

type Props = {
  DropDownIcon: LucideIcon,
  DropMenuAlignment?: "center" | "end" | "start",
  DropDownLabel?: string,
  DropDownMenuItems: DropDownMenuItemType[],
}

function DropDown({ DropDownIcon, DropMenuAlignment = "start", DropDownLabel, DropDownMenuItems = [] }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <DropDownIcon className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={DropMenuAlignment}>
        {DropDownLabel && (
          <>
            <DropdownMenuLabel>{DropDownLabel}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        {DropDownMenuItems.map((item, index) => (
          <Link key={index} href={item.link}>
            <DropdownMenuItem>{item.itemName}</DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropDown
