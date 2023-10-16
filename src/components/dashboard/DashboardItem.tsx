import { Link } from 'react-router-dom';

interface Props {
   to: string;
   label: string;
   icon?: JSX.Element;
   className?: string;
   disabled?: boolean;
}
export const DashboardItem = ({ to, label = '', icon, className = '', disabled = false }: Props) => (
   <Link
      to={to}
      className={`flex flex-col items-center justify-center space-y-4 h-60 w-60 p-4  rounded-xl 
		hover:border hover:scale-105 transition-transform duration-300 
			${!disabled ? 'cursor-pointer' : ''}
			${disabled ? 'hover:bg-gray-300' : 'hover:bg-blue-300'} 
			${disabled ? 'border-gray-300' : 'border-blue-300'}
			${disabled ? 'bg-gray-200' : 'bg-blue-200'}
			${disabled ? 'disabled' : ''}
			${className} 
			`}
   >
      <span className="font-medium text-lg text-primary">{label}</span>
      {icon}
   </Link>
);
