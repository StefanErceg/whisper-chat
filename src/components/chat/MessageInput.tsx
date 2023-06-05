import { v4 as uuid } from 'uuid';
import { ChangeEvent, KeyboardEvent, useState } from 'react';

import { sendMessage } from '../../api/send';
import { MessageMeta } from '../../types/message';
import { useUser } from '../../context/UserContext';
import { SendMessageIcon } from '../icons/SendMessage';
import { useMessages } from '../../context/MessagesContext';
import { useChatPerson } from '../../context/ChatPersonContext';

export const MessageInput = () => {
	const { addMessage } = useMessages();
	const { user } = useUser();
	const { chatPerson } = useChatPerson();

	const [message, setMessage] = useState('');

	const sendHandler = async () => {
		if (message === '') return;
		try {
			const meta: MessageMeta = {
				timestamp: Date.now(),
				id: uuid(),
				part: 1,
				total: 1,
			};

			const payload = {
				meta,
				sender: user!,
				content: message,
				receiver: chatPerson!,
			};

			await sendMessage(payload);
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
