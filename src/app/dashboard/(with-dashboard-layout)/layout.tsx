import SideNavBar from '@/components/Sidebar'
import { cn } from '@/lib/utils'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

// type Props = {}

function layout({ children, session }: any) {
  return (
    <SessionProvider session={session}>
      <div className={cn('min-h-screen w-full bg-white text-black flex ')}>

        {/* sidebar */}
        <SideNavBar />
        {/* main page */}

        <div className="p-8 w-full">
          {children}
        </div>
      </div>
    </SessionProvider>
  )
}

export default layout