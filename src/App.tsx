import { useUser } from './context/UserContext';
import { AuthRouter } from './router/AuthRouter';
import { DashboardRouter } from './router/DashboardRouter';

export const App = () => {
	const { user } = useUser();

	return user ? <DashboardRouter /> : <AuthRouter />;
};
