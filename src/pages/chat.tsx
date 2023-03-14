import { Message } from '../components/chat/Message';
import { MessageInput } from '../components/chat/MessageInput';

export const Chat = () => (
	<div className="flex h-screen lg:p-6">
		<div className="bg-slate-100 flex flex-col w-full h-full items-center justify-start space-y-10 rounded-xl overflow-auto">
			<div className="w-full h-[calc(100%-120px)] overflow-y-auto">
				<Message received={true} />
				<Message received={false} />
				<Message received={true} />
				<Message received={false} />
				<Message received={false} />
				<Message received={false} />
				<Message received={true} />
				<Message received={true} />
				<Message received={true} />
				<Message received={false} />
			</div>
		</div>
		<MessageInput />
	</div>
);
