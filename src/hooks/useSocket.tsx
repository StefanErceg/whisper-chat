import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

import { User } from '../context/UserContext';
import { notify } from '../components/general/Notifications';
import { useChatPerson } from '../context/ChatPersonContext';

const SOCKET_LINK: string = import.meta.env.VITE_SOCKET_LINK || '';

enum MessageEvent {
	MESSAGE = 'message',
	JOINED = 'user_joined',
	LEFT = 'user_left',
	USERS = 'connected_users',
}

const useSocket = (user: User): Socket | null => {
	const { setConnectedUsers } = useChatPerson();
	let socket: Socket | null = null;

	useEffect(() => {
		socket = io(SOCKET_LINK, {
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

		return () => {
			if (socket) {
				socket.disconnect();
				socket = null;
			}
		};
	}, [user.id]);

	return socket;
};

export default useSocket;
