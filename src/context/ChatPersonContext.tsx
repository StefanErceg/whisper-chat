import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { User } from './UserContext';

type ContextType = {
	connectedUsers: User[];
	chatPerson: User | null;
	setConnectedUsers: Dispatch<SetStateAction<User[]>>;
	setChatPerson: (person: User | null) => void;
};

export const ChatPersonContext = createContext<ContextType>({
	chatPerson: null,
	connectedUsers: [],
	setChatPerson: () => {},
	setConnectedUsers: () => {},
});

interface ContextProviderProps {
	children: React.ReactNode;
}

export const ChatPersonContextProvider = ({ children }: ContextProviderProps) => {
	const initial = JSON.parse(localStorage.getItem('chatPerson') || 'null') || null;
	const [chatPerson, setChatPerson] = useState<User | null>(initial);
	const [connectedUsers, setConnectedUsers] = useState<User[]>([]);

	useEffect(() => {
		localStorage.setItem('chatPerson', JSON.stringify(chatPerson));
	}, [chatPerson]);

	return (
		<ChatPersonContext.Provider value={{ chatPerson, setChatPerson, connectedUsers, setConnectedUsers }}>
			{children}
		</ChatPersonContext.Provider>
	);
};

export const useChatPerson = () => useContext(ChatPersonContext);
