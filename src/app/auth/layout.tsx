import SideNavBar from '@/components/Sidebar'
import { cn } from '@/lib/utils'
import React from 'react'

type Props = {}

function layout({children}: {
  children:React.ReactNode
}) {
  return (

      <div className="p-8 w-full">
        {children}
      </div>

  )
}

export default layout