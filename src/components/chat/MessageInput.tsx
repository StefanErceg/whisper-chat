import { SendMessageIcon } from '../icons/SendMessage';

export const MessageInput = () => (
	<div className="flex items-center p-3 absolute left-10 right-10 bottom-10 rounded-xl">
		<textarea
			id="chat"
			rows={1}
			className="w-full resize-none rounded-xl bg-white appearance-none focus:outline-none focus:ring-0 px-4 py-2"
			placeholder="Type your message..."
		></textarea>
		<button type="submit" className="inline-flex justify-center p-2 -ml-12 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 ">
			<SendMessageIcon />
		</button>
	</div>
);
