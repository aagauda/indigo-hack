"use client"

import Link from "next/link"
import { LayoutDashboard, LucideIcon, Power } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"



interface NavProps {
  isCollapsed: boolean
  links: {
    title: string
    label?: string
    icon: LucideIcon
    variant: "default" | "ghost",
    href: string
  }[]
}

export function Nav({ links, isCollapsed }: NavProps) {

  // here we are receiving the pathname of the page
  const pagePathName = usePathname();

  const handleLogout = async () => {
    await signOut()
  }


  return (
    <TooltipProvider>
      <div
        data-collapsed={isCollapsed}
        className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
      >
        <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {links.map((link, index) =>
            isCollapsed ? (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    className={cn(
                      buttonVariants({ variant: link.href === pagePathName ? 'default' : 'ghost', size: "icon" }),
                      "h-9 w-9",
                      link.variant === "default" &&
                      "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    <span className="sr-only">{link.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="flex items-center gap-4">
                  {link.title}
                  {link.label && (
                    <span className="ml-auto text-muted-foreground">
                      {link.label}
                    </span>
                  )}
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link
                key={index}
                href={link.href}
                className={cn(
                  buttonVariants({ variant: link.href === pagePathName ? 'default' : 'ghost', size: "sm" }),
                  link.variant === "default" &&
                  "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                  "justify-start"
                )}
              >
                <link.icon className="mr-2 h-4 w-4" />
                {link.title}
                {link.label && (
                  <span
                    className={cn(
                      "ml-auto",
                      link.variant === "default" &&
                      "text-background dark:text-white"
                    )}
                  >
                    {link.label}
                  </span>
                )}
              </Link>
            )
          )}




          {
            isCollapsed ? (
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={"#"}
                    className={cn(
                      buttonVariants({ variant: "destructive", size: "icon" }),
                      "h-9 w-9",
                      " dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                    )}

                    onClick={handleLogout}

                  >
                    <Power className="h-4 w-4" />
                    <span className="sr-only">{"Logout"}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="flex items-center gap-4">
                  {"Logout"}

                </TooltipContent>
              </Tooltip>
            )
              : (
                <Link

                  href={"#"}
                  className={cn(
                    buttonVariants({ variant: "destructive", size: "sm" }),
                    " dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                    "justify-start"
                  )}
                  onClick={handleLogout}
                >
                  <Power className="mr-2 h-4 w-4" />
                  {"Logout"}

                </Link>
              )

          }





        </nav>
      </div>
    </TooltipProvider>

  )
}
