"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";

import { CircleUser, HouseIcon, Menu, Package2, Search, UserIcon,CircleEllipsis } from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon?: React.ReactNode;
};

type Props = {
  navItems: NavItem[],
  viewSide?:"top" | "bottom" | "left" | "right",
}

function SideDrawer({ navItems,viewSide }: Props) {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side={viewSide}>
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>

            {
              navItems.map((item,index) => (
                <Link
                key={index}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))
            }




          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default SideDrawer