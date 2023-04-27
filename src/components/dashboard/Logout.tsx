import { useNavigate } from 'react-router';

import { logout } from '../../api/auth';
import { useUser } from '../../context/UserContext';
import { LogoutIcon } from '../icons/Logout';

export const Logout = () => {
	const navigate = useNavigate();
	const { setUser } = useUser();

	const handleClick = async () => {
		await logout();
		setUser(null);
		navigate('/login');
	};

	return (
		<div
			onClick={handleClick}
			className="absolute flex items-center rounded-xl bottom-20 right-20 p-4 bg-blue-200 text-primary border border-white hover:border-blue-300 hover:bg-blue-300 cursor-pointer transition-all duration-300"
		>
			Logout
			<LogoutIcon />
		</div>
	);
};
