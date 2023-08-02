import { createContext, useContext, useEffect, useState } from 'react';

import { BaseMessage, Message } from '../types/message';
import { joinMessages } from '../utils/parts';

type ContextType = {
   messages: BaseMessage[];
   messageCache: Record<string, Message[]>;
   addToCache: (message: Message) => void;
   addMessage: (message: BaseMessage) => void;
};

export const MessagesContext = createContext<ContextType>({
   messages: [],
   messageCache: {},
   addToCache: () => {},
   addMessage: () => {},
});

interface MessageContextProviderProps {
   children: React.ReactNode;
}

export const MessagesContextProvider = ({ children }: MessageContextProviderProps) => {
   const [messages, setMessages] = useState<BaseMessage[]>([]);
   const [messageCache, setMessageCache] = useState<Record<string, Message[]>>({});

   const addToCache = (message: Message) => {
      const { id } = message.meta;

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

   return <MessagesContext.Provider value={{ messages, addMessage, messageCache, addToCache }}>{children}</MessagesContext.Provider>;
};

export const useMessages = () => useContext(MessagesContext);
