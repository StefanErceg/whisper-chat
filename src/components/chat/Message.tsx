import { formatTime } from '../../utils';

interface Props {
	content: string;
	received: boolean;
	timestamp: number;
}

export const Message = ({ content, timestamp, received }: Props) => (
	<div className={`w-full p-4 flex ${received ? 'justify-start' : 'justify-end'}`}>
		<div
			className={`max-w-3xl p-4 flex justify-between items-center ${received ? 'bg-blue-200' : 'bg-white'} rounded-xl w-fit break-all`}
		>
			{content}
			<span className="text-sm text-slate-800/50 ml-4 break-keep">{formatTime(timestamp)}</span>
		</div>
	</div>
);
