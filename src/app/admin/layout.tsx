
import Image from "next/image"

import { SettingsSideNav } from "@/components/SettingsSideNav/SettingsSideNav"
import { Separator } from "@/components/ui/separator"
import { CircleArrowLeft } from "lucide-react"
import Link from "next/link"
import { Toaster } from "@/components/ui/toaster"
import { SessionProvider } from "next-auth/react"
import { AnySrvRecord } from "dns"



const sidebarNavItems = [
  {
    title: "Update Flights",
    href: "/admin/app",
  },
  {
    title: "All Flights",
    href: "/admin/flights",
  },
  // {
  //   title: "Notifications",
  //   href: "/dashboard/settings/notifications",
  // },
  // {
  //   title: "Display",
  //   href: "/dashboard/settings/display",
  // },
]

// interface SettingsLayoutProps {
//   children: React.ReactNode,
//   session:any
// }

export default function SettingsLayout({ children,session }: any) {
  return (
    <>
    <SessionProvider session={session}>
      {/* <div className="md:hidden">
        <Image
          src="/examples/forms-light.png"
          width={1280}
          height={791}
          alt="Forms"
          className="block dark:hidden"
        />
        <Image
          src="/examples/forms-dark.png"
          width={1280}
          height={791}
          alt="Forms"
          className="hidden dark:block"
        />
      </div> */}
      <div className="space-y-6 p-10 pb-16 ">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">
            {/* <Link href={"/dashboard"}>
              <CircleArrowLeft />
            </Link> */}
          </h2>
          <p className="text-muted-foreground bg-red-700 text-white text-center font-semibold rounded-lg">
           Welcome to the admin panel here you can change the flight status of the flights

          </p>
          <h2 className="text-2xl font-bold tracking-tight">Flight Update</h2>
         
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5 bg-muted">
            <SettingsSideNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 ">{children}</div>
        </div>
      </div>
      {/* // use the toaster in the layout to apply on all */}
      <Toaster /> 
      </SessionProvider>
    </>
  )
}



