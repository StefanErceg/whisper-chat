import { Socket, io } from 'socket.io-client';
import { createContext, useContext, useState } from 'react';

import { User } from './UserContext';
import { useChatPerson } from './ChatPersonContext';
import { notify } from '../components/general/Notifications';
import { Message } from '../types/message';
import { useMessages } from './MessagesContext';

const SOCKET_LINK: string = import.meta.env.VITE_SOCKET_LINK || '';

type ContextType = {
	socket: Socket | null;
	connect: (user: User) => void;
};

enum MessageEvent {
	MESSAGE = 'message',
	JOINED = 'user_joined',
	LEFT = 'user_left',
	USERS = 'connected_users',
}

export const SocketContext = createContext<ContextType>({
	socket: null,
	connect: () => {},
});

interface SocketContextProviderProps {
	children: React.ReactNode;
}

export const SocketContextProvider = ({ children }: SocketContextProviderProps) => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const { setConnectedUsers } = useChatPerson();
	const { addMessage } = useMessages();

	const connect = (user: User) => {
		if (user) {
			const socket = io(SOCKET_LINK, {
				query: {
					userId: user.id,
					userName: user.name,
				},
			});

			socket.on('connect', () => {
				console.log('Connected to socket server');
			});

			socket.on('disconnect', () => {
				console.log('Disconnected from socket server');
			});

			socket.on(MessageEvent.USERS, (users) => {
				setConnectedUsers(users);
			});

			socket.on(MessageEvent.JOINED, ({ id, name }) => {
				notify.success(`${name} joined!`);
				setConnectedUsers((users) => [...users, { id, name }]);
			});

			socket.on(MessageEvent.LEFT, (userId) => {
				setConnectedUsers((users) => users.filter(({ id }) => id !== userId));
			});

			socket.on(MessageEvent.MESSAGE, (message: Message) => {
				addMessage(message);
			});

			setSocket(socket);
		}
	};

	return <SocketContext.Provider value={{ socket, connect }}>{children}</SocketContext.Provider>;
};

export const useSocket = () => useContext(SocketContext);
