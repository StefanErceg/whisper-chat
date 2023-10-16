import { createContext, useContext, useEffect, useState } from 'react';

import { joinMessages } from '../utils/parts';
import { BaseMessage, Message } from '../types/message';
import { decodeMessageFromImage } from '../utils/steganography/decode';

const LOGO_LINK: string = import.meta.env.VITE_LOGO_LINK || '';

type ContextType = {
   messages: BaseMessage[];
   messageCache: Record<string, Message[]>;

   clearMessages: () => void;
   addToCache: (message: Message) => void;
   addMessage: (message: BaseMessage) => void;
};

export const MessagesContext = createContext<ContextType>({
   messages: [],
   messageCache: {},
   addToCache: () => {},
   addMessage: () => {},
   clearMessages: () => {},
});

interface MessageContextProviderProps {
   children: React.ReactNode;
}

export const MessagesContextProvider = ({ children }: MessageContextProviderProps) => {
   const [messages, setMessages] = useState<BaseMessage[]>([]);
   const [messageCache, setMessageCache] = useState<Record<string, Message[]>>({});

   const addToCache = async (message: Message) => {
      const { id, logo } = message.meta;

      if (logo) {
         let content = await decodeMessageFromImage(`${LOGO_LINK}/${message.content}`);
         message = { ...message, content };
      }

      setMessageCache((cache) => ({
         ...cache,
         [id]: cache[id] ? [...cache[id], message] : [message],
      }));
   };

   useEffect(() => {
      for (const id in messageCache) {
         const cached = messageCache[id];
         if (cached && cached.length && cached.length === cached?.[0]?.meta?.total) {
            const completeMessage = joinMessages(cached);
            if (completeMessage) {
               addMessage(completeMessage);
               //@ts-ignore
               setMessageCache((cache) => ({ ...cache, [id]: undefined }));
               return;
            }
         }
      }
   }, [messageCache]);
   //
   const addMessage = (message: BaseMessage) => {
      setMessages((prevMessages) => [...prevMessages, message]);
   };

   const clearMessages = () => {
      setMessages([]);
   };

   return (
      <MessagesContext.Provider value={{ messages, addMessage, clearMessages, messageCache, addToCache }}>
         {children}
      </MessagesContext.Provider>
   );
};

export const useMessages = () => useContext(MessagesContext);
