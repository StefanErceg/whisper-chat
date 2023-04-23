import { createContext, useContext, useState } from 'react';
import { Message } from '../types/message';

type ContextType = {
	messages: Message[];
	addMessage: (message: Message) => void;
};

export const MessagesContext = createContext<ContextType>({
	messages: [],
	addMessage: () => {},
});

interface MessageContextProviderProps {
	children: React.ReactNode;
}

export const MessagesContextProvider = ({ children }: MessageContextProviderProps) => {
	const [messages, setMessages] = useState<Message[]>([]);

	const addMessage = (message: Message) => {
		setMessages((prevMessages) => [...prevMessages, message]);
	};

	return <MessagesContext.Provider value={{ messages, addMessage }}>{children}</MessagesContext.Provider>;
};

export const useMessages = () => useContext(MessagesContext);
