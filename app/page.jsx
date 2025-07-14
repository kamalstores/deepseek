'use client';
import { assets } from "@/assets/assets";
import Message from "@/components/Message";
import PromptBox from "@/components/PromptBox";
import Sidebar from "@/components/Sidebar";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useState } from "react";

export default function Home() {

  // to expand and collapse the side bar
  const[expand, setExpand] = useState(false)

  // for loading
  const[isLoading, setIsLoading] = useState(false)

  // Get selected chat and messages from context
  const {selectedChat} = useAppContext()

  return (
    <div>
      <div className="flex h-screen">

        {/* sidebar */}
        <Sidebar expand={expand} setExpand={setExpand}/>


          <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8 bg-[#292a2d] text-white relative">
            <div className="md:hidden absolute px-4 top-6 flex items-center justify-between w-full">
              <Image onClick={()=>(expand ? setExpand(false) : setExpand(true))} className="rotate-180" src={assets.menu_icon} alt=""/>
              <Image className="opacity-70" src={assets.chat_icon} alt=""/>
            </div>

            {!selectedChat || selectedChat.messages.length === 0 ? (
              <>
              <div className="flex items-center gap-3">
                <Image className="h-16" src={assets.logo_icon} alt="" />
                <p className="text-2xl font-medium">Hi, I'm DeepSeek.</p>
              </div>
              <p className="text-sm mt-2">How can I help you today?</p>
              </>
            ):
            (
            <div className="flex-1 overflow-y-auto w-full max-w-4xl">
              {selectedChat.messages.map((message, index) => (
                <Message 
                  key={index} 
                  role={message.role} 
                  content={message.content} 
                />
              ))}
            </div>
          )
          }

          {/* prompt box  */}
          <PromptBox isLoading={isLoading} setIsLoading={setIsLoading} />

          <p className="text-xs absolute bottom-1 text-gray-500">AI-generated, for reference only</p>

          </div>
 
      </div>
    </div>
  )
}
