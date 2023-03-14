import { Link } from 'react-router-dom';

interface Props {
	to: string;
	label: string;
	icon?: JSX.Element;
	className?: string;
}
export const DashboardItem = ({ to, label = '', icon, className = '' }: Props) => (
	<Link
		to={to}
		className={`flex flex-col items-center justify-center space-y-4 h-60 w-60 p-4  rounded-xl bg-blue-200 hover:bg-blue-300 border-blue-300 hover:border hover:scale-105 transition-transform duration-300 cursor-pointer ${className}`}
	>
		<span className="font-medium text-lg text-primary">{label}</span>
		{icon}
	</Link>
);
