interface Props {
	label: string;
	icon?: JSX.Element;
	className?: string;
}
export const DashboardItem = ({ label = '', icon, className = '' }: Props) => (
	<div
		className={`flex flex-col items-center justify-center space-y-4 h-60 w-60 p-4  rounded-xl bg-blue-200 hover:bg-blue-300 border-blue-300 hover:border hover:scale-105 transition-transform duration-300 cursor-pointer ${className}`}
	>
		<span className="font-medium text-lg text-primary">{label}</span>
		{icon}
	</div>
);
