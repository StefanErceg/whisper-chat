import { io, Socket } from 'socket.io-client';

const SOCKET_LINK: string = import.meta.env.VITE_SOCKET_LINK || '';

const enum MESSAGE_TYPES {
	GREETINGS = 'GREETINGS',
}

type SendMessage = ({ type, content }: { type: MESSAGE_TYPES; content: any }) => void;

interface ConnectionProperties {
	socket: Socket;
	send: SendMessage;
}

let send:SendMessage = () => {}

function connect(): ConnectionProperties {
	const socket = io(SOCKET_LINK);

	socket.on('connect', () => {
		console.log('Connected to socket server');
	});

	socket.on('disconnect', () => {
		console.log('Disconnected from socket server');
	});

	send = ({ type, content }) => {
		if (socket.connected) socket.send(type, content);
	};

	return { socket, send };
}

const server = {
	status: 'online',
};

export { connect, server };
