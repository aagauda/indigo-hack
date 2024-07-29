"use client";

import SalesCard, { SalesProps } from "@/components/SalesCard";
import { CircleUser, HouseIcon, Menu, Package2, Search, UserIcon,CircleEllipsis } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
import SideDrawer from "../SideDrawer/SideDrawer";
import DropDown from "../DropDown/DropDown";

type NavItem = {
  href: string;
  label: string;
  icon?: React.ReactNode;
};

const navItems: NavItem[] = [
  { href: "/dashboard/app", label: "Dashboard" },
  { href: "#", label: "Orders" },
  { href: "#", label: "Products" },
  { href: "#", label: "Customers" },
  { href: "#", label: "Analytics" },
];


type Props = {}

function TopNav({ }: Props) {
  return (
    <div>
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">


        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>

          {
            navItems.map((item, index: any) => (
              <Link
                key={index}
                href={item.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))
          }

        </nav>


        <SideDrawer navItems={navItems} viewSide="left" />




        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            {/* <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div> */}
          </form>

          <DropDown DropDownIcon={CircleEllipsis}/>

        </div>
      </header>
    </div>
  )
}

export default TopNav