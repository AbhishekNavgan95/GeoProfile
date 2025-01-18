import React, { useEffect, useState } from 'react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import RenderMap from '@/components/Map';
import Sidebar from '@/components/Sidebar';
import { getUsers } from '@/config/Appwrite';
import { useUserStore } from '@/stores/userStore';
import { useCurrentUser } from '@/stores/currentUserStore';
import { useloadingStore } from '@/stores/loadingStore';

const Home = () => {

  const { users: statetUsers, setUsers: setStoreUsers } = useUserStore();
  const { setCurrentUser } = useCurrentUser();
  const { setLoading } = useloadingStore();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      const response = await getUsers();
      setStoreUsers(response?.documents)

      if (response?.documents?.length > 0) {
        setCurrentUser(response?.documents[0])
      }
      
      setLoading(false)
    }

    fetchUsers();
  }, [])

  return (
    <main className='bg-black-700'>
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-screen w-full rounded-lg border border-black-500 md:min-w-[450px]"
      >

        <ResizablePanel defaultSize={100 - 65}>
          <Sidebar />
        </ResizablePanel>

        <ResizableHandle withHandle className='bg-black-500' />

        <ResizablePanel defaultSize={65}>
          <RenderMap />
        </ResizablePanel>

      </ResizablePanelGroup>
    </main>
  )
}

export default Home