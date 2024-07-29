"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "../ui/button"
import { signOut } from "next-auth/react"


interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
  }[]
}

export function SettingsSideNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  const handleLogout = async () => {
    console.log("called")
    await signOut()
  }

  return (
    <nav
      className={cn(
        // lg:flex-col lg:space-x-0 lg:space-y-1
        "flex flex-wrap lg:flex-col md:flex-row",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-black text-white hover:bg-gray-600 hover:text-white"
              : "hover:bg-gray-400 dark:text-muted-foreground hover:underline hover:text-white",
            "justify-start"
          )}
        >
          {item.title}
        </Link>
      ))}


      <Link
        key={123}
        href={"#"}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          
             "bg-red-600 text-white hover:bg-red-600 hover:text-white justify-start"
          //    "hover:bg-gray-400 dark:text-muted-foreground hover:underline hover:text-white",
          // "justify-start"
        )}
        onClick={handleLogout}
      >
        Logout
      </Link>
    </nav>
  )
}
