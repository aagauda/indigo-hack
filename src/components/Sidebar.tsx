"use client"

import React, { useState } from 'react'
import {
  ChevronRight,
  LayoutDashboard,
  Settings,
  ShoppingCart,
  Plane,
  UsersRound,
} from "lucide-react"
import { Nav } from './ui/nav'
import { Button } from './ui/button'

// this library will help us to know the window size so that we can collapse our sidebar on less screensize
import {
  useWindowWidth
} from '@react-hook/window-size'


type Props = {}

export default function SideNavBar(props: Props) {

  const [isCollapsed, setIsCollapsed] = useState(false);
  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768 // if the size is less then 786 then we are in the mobile view

  // toggle the side bar
  function toggleSidebar() {
    setIsCollapsed(!isCollapsed)
  }

  // size toggle



  return (
    <div className='relative min-w-[80px] border-r px-3 pb-10 pt-24'>


      {/* also display the toggle button when not in the mobile view */}
      {!mobileWidth && (
        <div className='absolute right-[-20px] top-7'>
          <Button variant={'secondary'} className='rounded-full p-2' onClick={toggleSidebar}>
            <ChevronRight />
          </Button>
        </div>
      )}



      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed} // this says if the size is mobile width the the side bar will be collapsed=true else toggle it
        links={[
          {
            title: "Flights",
            href: "/dashboard/app",
            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title: "Book Flight",
            href: "/dashboard/settings/booking",
            icon: Plane,
            variant: "ghost",
          },
        ]}

        
      />
    </div>
  )
}