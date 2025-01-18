import React, { useEffect, useState } from 'react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import RenderMap from '@/components/Map';
import Sidebar from '@/components/Sidebar';

const Home = () => {

  return (
    <section className='bg-black-700 '>
      <ResizablePanelGroup
        direction={"horizontal"}
        className="min-h-screen border-none w-full md:min-w-[450px]"
      >

        <ResizablePanel defaultSize={40}>
          <Sidebar />
        </ResizablePanel>

        <ResizableHandle className='bg-black-500 hidden md:block' />

        <ResizablePanel className='hidden md:block' defaultSize={60}>
          <RenderMap />
        </ResizablePanel>

      </ResizablePanelGroup>
    </section>
  )
}

export default Home