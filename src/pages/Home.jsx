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
    <main className='bg-black-700'>
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-screen w-full rounded-lg border border-black-500 md:min-w-[450px]"
      >

        <ResizablePanel defaultSize={45}>
          <Sidebar />
        </ResizablePanel>

        <ResizableHandle withHandle className='bg-black-500' />

        <ResizablePanel defaultSize={75}>
          <div className=''>
            <RenderMap />
          </div>
        </ResizablePanel>

      </ResizablePanelGroup>
    </main>
  )
}

export default Home