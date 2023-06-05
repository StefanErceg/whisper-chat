import { useEffect } from 'react';
import { useSocket } from './context/SocketContext';
import { useUser } from './context/UserContext';
import { AuthRouter } from './router/AuthRouter';
import { DashboardRouter } from './router/DashboardRouter';

export const App = () => {
	const { user } = useUser();
	const { connect } = useSocket();

	useEffect(() => {
		if (user) connect(user);
	}, [user]);

	return user ? <DashboardRouter /> : <AuthRouter />;
};
