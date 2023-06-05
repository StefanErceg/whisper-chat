import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useUser } from '../context/UserContext';
import { Message } from '../components/chat/Message';
import { useMessages } from '../context/MessagesContext';
import { useChatPerson } from '../context/ChatPersonContext';
import { MessageInput } from '../components/chat/MessageInput';

export const Chat = () => {
	const { chatPerson } = useChatPerson();
	const { user } = useUser();

	const navigate = useNavigate();

	const { messages } = useMessages();

	useEffect(() => {
		if (!chatPerson) navigate('/select');
	}, [chatPerson]);

	return (
		<div className="flex h-screen lg:p-6">
			<div className="bg-slate-100 flex flex-col w-full h-full items-center justify-start space-y-10 rounded-xl overflow-auto">
				<div className="w-full h-[calc(100%-120px)] overflow-y-auto">
					{messages.map(({ content, sender, meta: { timestamp, id } }) => (
						<Message key={id} content={content} received={sender.id !== user!.id} timestamp={timestamp} /> //TODO sender
					))}
				</div>
			</div>
			<MessageInput />
		</div>
	);
};
