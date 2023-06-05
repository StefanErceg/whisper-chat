import { User } from '../context/UserContext';

export interface Message {
	content: string;
	sender: User;
	receiver: User;
	meta: MessageMeta;
}

export interface MessageMeta {
	id: string;
	timestamp: number;
	part: number;
	total: number;
}
