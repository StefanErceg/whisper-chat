import { Message } from '../components/chat/Message';
import { MessageInput } from '../components/chat/MessageInput';
import { useMessages } from '../context/MessagesContext';

export const Chat = () => {
	const { messages } = useMessages();

	return (
		<div className="flex h-screen lg:p-6">
			<div className="bg-slate-100 flex flex-col w-full h-full items-center justify-start space-y-10 rounded-xl overflow-auto">
				<div className="w-full h-[calc(100%-120px)] overflow-y-auto">
					{messages.map(({ content, sender, meta: { timestamp, id } }, index) => (
						<Message key={id} content={content} received={sender !== 'Stefan'} timestamp={timestamp} /> //TODO sender
					))}
				</div>
			</div>
			<MessageInput />
		</div>
	);
};
