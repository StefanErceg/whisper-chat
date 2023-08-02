import { v4 as uuid } from 'uuid';
import { generateRandomNumber } from './generate';
import { BaseMessage, Message } from '../types/message';

export const splitMessage = (message: BaseMessage): Message[] => {
	const {
		content,
		receiver,
		sender,
		meta: { id, timestamp },
	} = message;
	const random = generateRandomNumber(3, 5);

	const partLength = Math.floor(content.length / random);
	const parts = [];

	for (let i = 0; i < content.length; i += partLength) {
		const part = content.substring(i, i + partLength);

		parts.push(part);
	}

	return parts.map((part, index) => ({
		content: part,
		receiver,
		sender,
		meta: {
			id,
			partId: uuid(),
			timestamp,
			part: index + 1,
			total: parts.length,
		},
	}));
};

export const joinMessages = (messages: Message[]): BaseMessage | null => {
	if (!messages || !messages.length) return null;
	const content = messages.sort(({ meta: { part: A } }, { meta: { part: B } }) => A - B).reduce((accu, { content }) => accu + content, '');
	const {
		sender,
		receiver,
		meta: { id, timestamp },
	} = messages[0];

	return {
		content,
		sender,
		receiver,
		meta: {
			id,
			timestamp,
		},
	};
};
