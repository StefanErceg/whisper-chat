import { v4 as uuid } from 'uuid';
import { ChangeEvent, KeyboardEvent, useState } from 'react';

import { upload } from '../../api/logo';
import { sendMessage } from '../../api/send';
import { splitMessage } from '../../utils/parts';
import { useUser } from '../../context/UserContext';
import { BaseMessageMeta } from '../../types/message';
import { SendMessageIcon } from '../icons/SendMessage';
import { encode } from '../../utils/steganography/encode';
import { useMessages } from '../../context/MessagesContext';
import { generateRandomNumber } from '../../utils/generate';
import { useChatPerson } from '../../context/ChatPersonContext';

const LOGO_LINK = import.meta.env.VITE_LOGO_LINK;
const LOGO = import.meta.env.VITE_LOGO;

export const MessageInput = () => {
   const { addMessage } = useMessages();
   const { user } = useUser();
   const { chatPerson } = useChatPerson();

   const [message, setMessage] = useState('');

   const sendHandler = async () => {
      if (message === '') return;
      try {
         const meta: BaseMessageMeta = {
            timestamp: Date.now(),
            id: uuid(),
         };

         const payload = {
            meta,
            sender: user!,
            content: message,
            receiver: chatPerson!,
         };

         const parts = splitMessage(payload);

         const LOGO_URL = `${LOGO_LINK}/${LOGO}`;

         const stegoIndex = generateRandomNumber(0, parts.length);

         const encoded = await encode(parts[stegoIndex].content, LOGO_URL);

         const uploaded = await upload(encoded);

         parts[stegoIndex] = { ...parts[stegoIndex], content: uploaded, meta: { ...parts[stegoIndex].meta, logo: true } };
         await Promise.all(parts.map((part) => sendMessage(part)));
         addMessage({ content: message, meta, sender: user!, receiver: chatPerson! });
         setMessage('');
      } catch (err) {
         console.error(err);
      }
   };

   const changeHandler = ({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) => {
      setMessage(value);
   };

   const keyDownHandler = (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === 'Enter') {
         event.preventDefault();
         sendHandler();
      }
   };
   return (
      <div className="flex items-center p-3 absolute left-10 right-10 bottom-10 rounded-xl">
         <textarea
            id="chat"
            rows={1}
            className="w-full resize-none rounded-xl bg-white appearance-none focus:outline-none focus:ring-0 px-4 py-2 break-all overflow-y-hidden"
            placeholder="Type your message..."
            value={message}
            onChange={changeHandler}
            onKeyDown={keyDownHandler}
         ></textarea>
         <button
            type="submit"
            className="inline-flex justify-center p-2 -ml-12 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100"
            onClick={sendHandler}
         >
            <SendMessageIcon />
         </button>
      </div>
   );
};
