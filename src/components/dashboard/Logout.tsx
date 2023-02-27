import { LogoutIcon } from '../icons/Logout';

export const Logout = () => (
	<div className="absolute flex items-center rounded-xl bottom-20 right-20 p-4 bg-blue-200 text-primary border border-white hover:border-blue-300 hover:bg-blue-300 cursor-pointer transition-all duration-300">
		Logout
		<LogoutIcon />
	</div>
);
